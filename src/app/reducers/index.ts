import * as fromUser from "./user.reducer";
import {ActionReducerMap, createSelector} from "@ngrx/store";
import * as fromPosts from "./post.reducer";

export interface RootReducerState {
  users: fromUser.UserReducerState,
  posts: fromPosts.PostReducerState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  users: fromUser.UserReducer,
  posts: fromPosts.postReducer
}

export const getUserState = (state: RootReducerState) => state.users;
export const getPostsState = (state: RootReducerState) => state.posts;

export const getUsersLoading = createSelector(getUserState, fromUser.getUsersLoading);
export const getUsersLoaded = createSelector(getUserState, fromUser.getUsersLoaded);
export const getUsers = createSelector(getUserState, fromUser.getUsers);
export const getUserEntities = createSelector(getUserState, fromUser.getEntities);
export const getUsersError = createSelector(getUserState, fromUser.getUsersError);

export const getUserById = (state: RootReducerState, id: number) => {
  const entities = getUserEntities(state);
  return entities[id];
}



export const getPostsLoading = createSelector(getPostsState, fromPosts.getPostsLoading);
export const getPostsLoaded = createSelector(getPostsState, fromPosts.getPostsLoaded);
export const getPosts = createSelector(getPostsState, fromPosts.getPosts);
export const getPostsError = createSelector(getPostsState, fromPosts.getPostsError);




