import { PostModel } from '../models/post.model';
import { Action } from '../actions';
import {
  POST_ADD,
  POST_DELETE,
  POST_LIST_FAILED,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_UPDATE,
} from '../actions/post.action';
import { StoreUtility } from '../utils/store-utility';

export interface PostReducerState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  posts: PostModel[];
}

const initialState: PostReducerState = {
  loading: false,
  loaded: false,
  error: false,
  posts: [],
};

export function postReducer(
  state = initialState,
  action: Action
): PostReducerState {
  switch (action.type) {
    case POST_LIST_REQUEST: {
      return { ...state, loading: true };
    }
    case POST_LIST_FAILED: {
      return { ...state, error: true, loading: false };
    }
    case POST_UPDATE: {
      const posts = state.posts.filter(
        (post) => post.id !== action.payload.post.id
      );
      const updatedPosts = posts.concat(action.payload.post);
      return { ...state, ...{ posts: updatedPosts } };
    }
    case POST_ADD: {
      const post = action.payload.data;
      const entity = { [post.id]: post };
      const newPosts = state.posts.concat(post);
      return { ...state, ...{ posts: newPosts } };
    }
    case POST_DELETE: {
      const posts = state.posts.filter((post) => post.id !== action.payload.id);
      return { ...state, ...{ posts } };
    }
    case POST_LIST_SUCCESS: {
      const updatedPosts = action.payload.posts;
      return {
        ...state,
        loading: false,
        loaded: true,
        posts: updatedPosts,
        error: false,
      };
    }
    default: {
      return state;
    }
  }
}

export const getPostsLoading = (state: PostReducerState) => state.loading;
export const getPostsLoaded = (state: PostReducerState) => state.loaded;
export const getPosts = (state: PostReducerState) => state.posts;
export const getPostsError = (state: PostReducerState) => state.error;
