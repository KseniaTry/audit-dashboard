import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { DEPARTMENTS, Issue } from "../const"
import { RootState } from "../store"

const issuesAdapter = createEntityAdapter<Issue>()

const issuesSlice = createSlice({
    name: 'issues',
    initialState: issuesAdapter.getInitialState({
        error: null,
        loadingStatus: false,
        departments: DEPARTMENTS
    }),
    reducers: {
        setAllIssues: (state, action) => {
            issuesAdapter.setAll(state, action.payload)
        },
        deleteIssue: (state, action) => {
            console.log(action.payload)
            issuesAdapter.removeOne(state, action.payload)
        },
        addIssue: (state, action) => {
            issuesAdapter.addOne(state, action.payload)
        },
        // renameIssue: (state, action) => {
        // }
    }
})

export const { deleteIssue, addIssue, setAllIssues } = issuesSlice.actions
export default issuesSlice.reducer

const baseSelectors = issuesAdapter.getSelectors((state: RootState) => state.issues);

export const {
    selectAll: selectAllIssues      // Возвращает МАССИВ всех рекомендаций (уже готовый для .map)
} = baseSelectors;

// export const selectInspections = () => createSelector(
//   [selectAllMessages],
//   (messages) => messages.filter((message) => message.channelId === activeChannelId)
// )