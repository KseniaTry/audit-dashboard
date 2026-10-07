import { configureStore } from '@reduxjs/toolkit'
import issuesReducer from './slices/issuesSlice'

export const store = configureStore({
    reducer: {
        issues: issuesReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>; // для того, чтобы задавать тип для state на typescript
export type AppDispatch = typeof store.dispatch;