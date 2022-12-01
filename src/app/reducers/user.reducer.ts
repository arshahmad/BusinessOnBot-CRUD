import {UserModel} from "../models/user.model";
import {Action} from "../actions";
import {
  USER_ADD,
  USER_DELETE,
  USER_LIST_FAILED,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_UPDATE
} from "../actions/user.action";
import {StoreUtility} from "../utils/store-utility";
import {createSelector} from "@ngrx/store";

export interface UserReducerState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  // users: UserModel[];
  entities: {[id: number]: UserModel};
  ids: number[];
}

const initialState: UserReducerState = {
  loading: false,
  loaded: false,
  error: false,
  // users: []
  entities: {},
  ids: []
}

export function UserReducer(state = initialState, action: Action): UserReducerState {
  switch (action.type) {
    case USER_LIST_REQUEST: {
      return {...state, loading: true};
    }
    case USER_LIST_FAILED: {
      return {...state, error: true, loading: false};
    }
    case USER_UPDATE: {
      // const users = state.users.filter(user => user.id !== action.payload.user.id);
      // const updatedUser = users.concat(action.payload.user);
      // return {...state, ...{users: updatedUser}};
      const user = action.payload.user;
      const entity = {[user.id]: user};
      const updatedEntities = {...state.entities, ...entity}
      return {...state, ...{entities: updatedEntities}};
    }
    case USER_ADD: {
      // const updatedUser = state.users.concat(action.payload.data);
      // return {...state, ...{users: updatedUser}};
      const user = action.payload.data;
      const entity = {[user.id]: user};
      const newEntities = {...state.entities, ...entity};
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, user.id]);
      return {...state, ...{entities: newEntities, ids: newIds}}
    }
    case USER_DELETE: {
      // const users = state.users.filter(user => user.id !== action.payload.id)
      // return {...state, ...{users}};
      const id = action.payload.id;
      const newIds = state.ids.filter(elem => elem !== id);
      const newEntities = StoreUtility.removeKey(state.entities, id)
      return {...state, ...{entities: newEntities, ids: newIds }}
    }
    case USER_LIST_SUCCESS: {
      // const updatedUsers = state.users.concat(action.payload.users)
      // return {...state, loading: false, loaded: true, users: updatedUsers, error: false};
      const users = action.payload.users;
      const obj = StoreUtility.normalize(users);
      const newEntities = {...state.entities, ...obj};
      // @ts-ignore
      const ids = users.map(user => user.id);
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, ...ids])
      return {...state, ...{loaded: true, loading: false, error: false, entities: newEntities, ids: newIds}}
    }
    default: {
      return state;
    }
  }
}

export const getUsersLoading = (state: UserReducerState) => state.loading;
export const getUsersLoaded = (state: UserReducerState) => state.loaded;
export const getUsersError = (state: UserReducerState) => state.error;
export const getEntities = (state: UserReducerState) => state.entities;
export const getIds = (state: UserReducerState) => state.ids;
export const getUsers = createSelector(getEntities, (entities) => StoreUtility.unNormalize(entities));

