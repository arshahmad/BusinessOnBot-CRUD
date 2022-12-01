import {UserModel} from "../models/user.model";

export const USER_LIST_REQUEST = "user list request";
export const USER_LIST_SUCCESS = "user list success";
export const USER_DELETE = "user delete";
export const USER_UPDATE = "user update";
export const USER_ADD = "user add";
export const USER_LIST_FAILED = "user list failed";


export class UserListRequestAction {
  readonly type = USER_LIST_REQUEST;
}

export class UserDeleteAction {
  readonly type = USER_DELETE;
  constructor(public payload?: {id: string}) {
  }
}

export class UserUpdateAction {
  readonly type = USER_UPDATE;
  constructor(public payload?: {user: UserModel}) {
  }
}

export class UserAddAction {
  readonly type = USER_ADD;
  constructor(public payload?: {data: UserModel}) {
  }
}

export class UserListSuccessAction {
  readonly type = USER_LIST_SUCCESS;
  constructor(public payload?: {users:UserModel[]}) {
  }
}

export class UserListFailedAction {
  readonly type = USER_LIST_FAILED;
}


