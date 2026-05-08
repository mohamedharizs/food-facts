import { createSlice } from '@reduxjs/toolkit'

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem('foodfacts-saved')
    return stored ? JSON.parse(stored) : []
  } catch (err) {
    console.error('Failed to load from localStorage:', err)
    return []
  }
}

const initialState = {
  items: loadFromStorage(),
}

const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const product = action.payload
      if (!product || state.items.some((item) => item.code === product.code)) {
        return
      }
      state.items.push(product)
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.code !== action.payload)
    },
  },
})

export const { addItem, removeItem } = savedSlice.actions
export default savedSlice.reducer
