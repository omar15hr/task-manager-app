import { AppDispatch, RootState } from "..";
import { setBoards } from "./boardsSlice";

export const getBoards = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const boardUrl = 'https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/task-manager/list.json';

    const resp = await fetch(boardUrl);
    const data = await resp.json();

    dispatch(setBoards(data));
  }
};
