import { createEntityAdapter, createSlice, createSelector } from "@reduxjs/toolkit"
import { DEPARTMENTS, Issue } from "../const"
import { RootState } from "../store"
import { getStatus } from "../utils"

const issuesAdapter = createEntityAdapter<Issue>()

const issuesSlice = createSlice({
    name: 'issues',
    initialState: issuesAdapter.getInitialState({
        error: null,
        loadingStatus: false,
        departments: DEPARTMENTS,
        reportDate: '',
    }),
    reducers: {
        setAllIssues: (state, action) => {
            issuesAdapter.setAll(state, action.payload)
        },
        deleteIssue: (state, action) => {
            issuesAdapter.removeOne(state, action.payload)
        },
        addIssue: (state, action) => {
            issuesAdapter.addOne(state, action.payload)
        },
        setReportDate: (state, action) => {
            state.reportDate = action.payload
        },
        changeIssue: (state, action) => {
            console.log(action.payload)
            issuesAdapter.updateOne(state, action.payload)
        }
    }
})

export const { deleteIssue, addIssue, setAllIssues, setReportDate, changeIssue } = issuesSlice.actions
export default issuesSlice.reducer

const baseSelectors = issuesAdapter.getSelectors((state: RootState) => state.issues);

export const {
    selectAll: selectAllIssues,      // Возвращает МАССИВ всех рекомендаций (уже готовый для .map)
    selectById: selectIssueById,
    selectTotal: selectTotalIssues
} = baseSelectors;

// 1. Простые селекторы для получения "сырых" данных из стейта
const selectReportDate = (state: RootState) => state.issues.reportDate;

// 2. Умный мемоизированный селектор (компоненты будут вызывать его)
export const selectIssuesWithStatuses = createSelector(
    [selectAllIssues, selectReportDate],
    (allIssues, reportDate) => {
        // Этот код сработает ТОЛЬКО если изменился массив allIssues или изменилась reportDate.
        // В остальное время React Redux будет мгновенно отдавать готовый кэшированный результат.
        return allIssues.map(issue => ({
            ...issue,
            status: getStatus(issue.scheduledDate, issue.executionDate, reportDate, issue.isRemoved ?? false) // рассчитываем статус для каждой задачи
        }));
    }
);

// export const selectIssueStatusById = createSelector(
//     [
//         (state: RootState, id: number) => state.issues.entities[id], // Получаем саму задачу
//         selectReportDate // Получаем глобальную дату отчета
//     ],
//     (issue, reportDate) => {
//         // if (!issue) return 'scheduled'; // Дефолтное значение, если задача не найдена

//         // Вызываем твою функцию getStatus, передавая параметры из конкретной issue
//         return getStatus(
//             issue.scheduledDate,
//             issue.executionDate,
//             reportDate,
//             issue.isRemoved ?? false
//         );
//     }
// );