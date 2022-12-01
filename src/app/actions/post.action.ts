import { PostModel } from '../models/post.model';

export const POST_LIST_REQUEST = 'post list request';
export const POST_LIST_SUCCESS = 'post list success';
export const POST_LIST_FAILED = 'post list failed';
export const POST_DELETE = 'post delete';
export const POST_ADD = 'post add';
export const POST_UPDATE = 'post update';

export class PostListRequestAction {
  readonly type = POST_LIST_REQUEST;
}

export class PostListFailedAction {
  readonly type = POST_LIST_FAILED;
}

export class PostDeleteAction {
  readonly type = POST_DELETE;
  constructor(public payload?: { id: string }) {}
}

export class PostUpdateAction {
  readonly type = POST_UPDATE;
  constructor(public payload?: { post: PostModel }) {}
}

export class PostAddAction {
  readonly type = POST_ADD;
  constructor(public payload?: { data: PostModel }) {}
}

export class PostListSuccessAction {
  readonly type = POST_LIST_SUCCESS;
  constructor(public payload?: { posts: PostModel[] }) {}
}
