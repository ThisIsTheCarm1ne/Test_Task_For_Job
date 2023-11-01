import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PostIdState {
  value: number
}

const initialState: PostIdState = {
  value: 0,
}

export const postIdSlice = createSlice({
  name: 'postId',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<number>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set } = postIdSlice.actions

export default postIdSlice.reducer
