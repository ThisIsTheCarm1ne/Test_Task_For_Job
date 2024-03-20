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
      state.value = action.payload
    },
  },
})

export const { set } = postIdSlice.actions

export default postIdSlice.reducer
