import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { DEPARTMENTS } from "../const"
// import { RootState } from "../store"

const issuesAdapter = createEntityAdapter()

const issuesSlice = createSlice({
    name: 'issues',
    initialState: issuesAdapter.getInitialState({
        error: null,
        loadingStatus: false,
        issuesEntites: [],
        departments: DEPARTMENTS
    }),
    reducers: {
        setAllIssues: (state, action) => {
            issuesAdapter.setAll(state, action.payload)
            state.issuesEntites = action.payload
        },
        deleteIssues: (state, action) => {
            issuesAdapter.removeOne(state, action.payload)
        },
        addIssues: (state, action) => {
            issuesAdapter.addOne(state, action.payload)
        },
        // renameIssue: (state, action) => {
        // }
    }
})

export const { deleteIssues, addIssues, setAllIssues } = issuesSlice.actions
export default issuesSlice.reducer

// const baseSelectors = issuesAdapter.getSelectors((state: RootState) => state.issues);

// export const {
//     selectAll: selectAllIssues      // Возвращает МАССИВ всех рекомендаций (уже готовый для .map)
// } = baseSelectors;

// export const selectInspections = () => createSelector(
//   [selectAllMessages],
//   (messages) => messages.filter((message) => message.channelId === activeChannelId)
// )