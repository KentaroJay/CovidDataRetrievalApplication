export interface ReduxState {
  currentPage: string;
}

export interface ReduxAction {
  type: "SET_CURRENT_PAGE";
  payload: string;
}
