import { TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;