import { RootState } from "../store";

// созданный мной экспортируемый селектор
export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;
