import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostModel } from '../models/post.model';
import { CommonRepository } from '../services/common.repository';
import { takeWhile } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdatePostComponent } from '../components/add-update-post.component';

@Component({
  selector: 'app-post',
  template: `
    <div class="container">
      <div *ngIf="!isLoading && !error">
        <button color="primary" mat-raised-button (click)="addPost()">
          Add Post
        </button>
        <app-posts-list [posts]="posts"></app-posts-list>
      </div>
      <div class="spinner" *ngIf="isLoading">
        <mat-spinner></mat-spinner>
      </div>
      <div
        *ngIf="error && !isLoading"
        class="flex column justify-start items-center"
      >
        <app-error (reload)="tryAgain()"></app-error>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 70px;
      }
      .w-full {
        width: 100%;
      }
      app-posts-list {
        display: flex;
        flex-wrap: wrap;
      }
      .spinner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
      }
      button {
        margin-bottom: 50px;
        left: 50%;
      }
    `,
  ],
})
export class PostComponent implements OnInit, OnDestroy {
  posts: PostModel[] = [];
  isLoading: boolean = false;
  error: boolean = false;
  isAlive = true;
  userId: string = '';

  constructor(
    private commonRepository: CommonRepository,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    if (!!this.userId) {
      this.fetchPosts(this.userId);
    }
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  fetchPosts(userId: string) {
    const observer$ = this.commonRepository.getPostsListByUserId(userId, true);
    const loading$ = observer$[0];
    const postData$ = observer$[1];
    const error$ = observer$[2];
    loading$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.isLoading = data;
    });
    error$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.error = data;
    });
    postData$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.posts = data;
    });
  }

  tryAgain() {
    this.commonRepository.getPostsListByUserId(this.userId, true);
  }

  addPost() {
    this.dialog.open(AddUpdatePostComponent, {
      width: '500px',
      height: '500px',
      data: { userId: this.userId },
    });
  }
}
