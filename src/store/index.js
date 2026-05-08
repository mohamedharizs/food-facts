import { configureStore } from '@reduxjs/toolkit'
import savedReducer from './savedSlice'

const store = configureStore({
  reducer: {
    saved: savedReducer,
  },
})

store.subscribe(() => {
  try {
    const state = store.getState()
    localStorage.setItem('foodfacts-saved', JSON.stringify(state.saved.items))
  } catch (err) {
    console.error('Failed to save to localStorage:', err)
  }
})

export default store
