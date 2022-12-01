import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { PostModel } from '../models/post.model';

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {}

  getAllUsers(): Observable<UserModel[]> {
    return this.httpService
      .get('/users')
      .pipe(map((data) => data as UserModel[]));
  }

  getUserById(id: number): Observable<UserModel> {
    return this.httpService.get('/users/' + id);
  }

  getAllPostsByUserId(userId: string): Observable<PostModel[]> {
    return this.httpService
      .get(`/users/${userId}/posts`)
      .pipe(map((data) => data as PostModel[]));
  }

  updateUser(user: UserModel): Observable<UserModel> {
    return this.httpService.put('/users/' + user.id, user);
  }

  addUser(user: UserModel): Observable<UserModel> {
    return this.httpService.post('/users/', user);
  }

  deleteUser(id: string): Observable<UserModel> {
    return this.httpService.delete('/users/' + id);
  }

  updatePost(userId: string, post: PostModel): Observable<PostModel> {
    return this.httpService.put(`/users/${userId}/posts/${post.id}`, post);
  }

  addPost(userId: string, post: PostModel): Observable<PostModel> {
    return this.httpService.post(`/users/${userId}/posts`, post);
  }

  deletePost(userId: string, postId: string): Observable<UserModel> {
    return this.httpService.delete(`/users/${userId}/posts/${postId}`);
  }
}
