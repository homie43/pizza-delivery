export type Pizza = {
  id: string;
  title: string;
  types: number[];
  price: number;
  imageUrl: string;
  sizes: number[];
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type SearchPizzaParams = {
  category: string;
  sortBy: string;
  order: string;
  search: string;
  currentPage: string;
};

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
