import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Store } from '@ngrx/store';
import {
  getPosts,
  getPostsError,
  getPostsLoaded,
  getPostsLoading,
  getUserById,
  getUsers,
  getUsersError,
  getUsersLoaded,
  getUsersLoading,
  RootReducerState,
} from '../reducers';
import { combineLatest, Observable } from 'rxjs';
import {
  UserAddAction,
  UserDeleteAction,
  UserListFailedAction,
  UserListRequestAction,
  UserListSuccessAction,
  UserUpdateAction,
} from '../actions/user.action';
import { UserModel } from '../models/user.model';
import { PostModel } from '../models/post.model';
import {
  PostAddAction,
  PostDeleteAction,
  PostListFailedAction,
  PostListRequestAction,
  PostListSuccessAction,
  PostUpdateAction,
} from '../actions/post.action';
import { take } from 'rxjs/operators';

@Injectable()
export class CommonRepository {
  constructor(
    private apiServie: ApiService,
    private store: Store<RootReducerState>
  ) {}

  getUsersList(
    force = false
  ): [Observable<boolean>, Observable<UserModel[]>, Observable<boolean>] {
    const loading$ = this.store.select(getUsersLoading);
    const loaded$ = this.store.select(getUsersLoaded);
    const usersList$ = this.store.select(getUsers);
    const error$ = this.store.select(getUsersError);

    combineLatest([loading$, loaded$])
      .pipe(take(1))
      .subscribe((data) => {
        if ((!data[0] && !data[1]) || force) {
          this.store.dispatch(new UserListRequestAction());
          this.apiServie.getAllUsers().subscribe(
            (users) => {
              this.store.dispatch(new UserListSuccessAction({ users: users }));
            },
            (error) => {
              this.store.dispatch(new UserListFailedAction());
            }
          );
        }
      });

    return [loading$, usersList$, error$];
  }

  deleteUser(id: string) {
    this.apiServie.deleteUser(id).subscribe((res) => {
      this.store.dispatch(new UserDeleteAction({ id: id }));
    });
  }

  updateUser(user: UserModel) {
    this.apiServie.updateUser(user).subscribe((res) => {
      this.store.dispatch(new UserUpdateAction({ user: user }));
    });
  }

  addUser(user: any) {
    this.apiServie.addUser(user).subscribe((res) => {
      this.store.dispatch(new UserAddAction({ data: user }));
    });
  }

  getUserById(id: number, force = false) {
    console.log(
      'store',
      this.store.select((state) => console.log('state', state))
    );
    const user$ = this.store.select((state) => getUserById(state, id));
    user$.pipe(take(1)).subscribe((data) => {
      if (!data || force) {
        return this.apiServie.getUserById(id).subscribe((res) => {
          this.store.dispatch(new UserAddAction({ data: res }));
        });
      }
      return data;
    });

    return user$;
  }

  getPostsListByUserId(
    userId: string,
    force = false
  ): [Observable<boolean>, Observable<PostModel[]>, Observable<boolean>] {
    const loading$ = this.store.select(getPostsLoading);
    const loaded$ = this.store.select(getPostsLoaded);
    const postList$ = this.store.select(getPosts);
    const error$ = this.store.select(getPostsError);

    combineLatest([loading$, loaded$])
      .pipe(take(1))
      .subscribe((data) => {
        if ((!data[0] && !data[1]) || force) {
          this.store.dispatch(new PostListRequestAction());
          this.apiServie.getAllPostsByUserId(userId).subscribe(
            (posts) => {
              this.store.dispatch(new PostListSuccessAction({ posts: posts }));
            },
            (error) => {
              this.store.dispatch(new PostListFailedAction());
            }
          );
        }
      });

    return [loading$, postList$, error$];
  }
  updatePost(userId: string, post: PostModel) {
    this.apiServie.updatePost(userId, post).subscribe((res) => {
      this.store.dispatch(new PostUpdateAction({ post: post }));
    });
  }

  addPost(userId: string, post: any) {
    this.apiServie.addPost(userId, post).subscribe((res) => {
      this.store.dispatch(new PostAddAction({ data: res }));
    });
  }

  deletePost(userId: string, postId: string) {
    this.apiServie.deletePost(userId, postId).subscribe((res) => {
      this.store.dispatch(new PostDeleteAction({ id: postId }));
    });
  }
}
