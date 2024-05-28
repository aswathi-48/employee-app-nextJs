

import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import employeeSlice from "./employee/employeeSlice";


export const store = configureStore({
    reducer: {
        employee : employeeSlice
    }
})

export const useAppDispatch:() =>typeof store.dispatch = useDispatch;

export const useAppSelector:TypedUseSelectorHook<
ReturnType<typeof store.getState>
> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

