import { createSlice } from '@reduxjs/toolkit'

export const apiData = createSlice({
  name: 'dataStore',
  initialState: {
    value: 0,
    tempData:[],
    data:[
      {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          price:55000,
      },
      {
          key: '2',
          name: 'Joe Black',
          age: 42,
          address: 'London No. 1 Lake Park',
          price:15000,
      },
      {
          key: '3',
          name: 'Jim Green',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          price:59000,
      },
      {
          key: '4',
          name: 'Jim Red',
          age: 32,
          address: 'London No. 2 Lake Park',
          price:35000,
      },
  ]
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    getData: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = apiData.actions

export default apiData.reducer