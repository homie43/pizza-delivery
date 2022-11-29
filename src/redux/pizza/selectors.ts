import { RootState } from "../store";

// созданный мной экспортируемый селектор
export const selectPizzaData = (state: RootState) => state.pizza;
