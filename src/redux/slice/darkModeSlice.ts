import { createSlice } from '@reduxjs/toolkit';

export const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: () => {
        const localDarkMode: string | null = localStorage.getItem('darkMode');
        return localDarkMode === 'true' ? true : false || false;
    },
    reducers: {
        toggleDarkMode: (state: boolean): boolean => {
            const newState: string = String(!state);
            localStorage.setItem('darkMode', newState);
            return !state;
        }
    }
})

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;