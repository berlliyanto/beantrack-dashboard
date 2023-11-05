import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice';
import darkModeReducer from './slice/darkModeSlice'


const store = configureStore({
    reducer: {
        token: authReducer,
        darkMode: darkModeReducer,
    },
})

// const state = store.getState()
// console.log('On Store' , state)

// store.subscribe(() => {
//     console.log('On Subscribe',store.getState())
// })

export default store