import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostModel } from '../models/post.model';
import { CommonRepository } from '../services/common.repository';
import { AddUpdatePostComponent } from './add-update-post.component';

@Component({
  selector: 'app-post-card',
  template: ` <mat-card>
    <mat-card-title>Post Id: {{ post.id }}</mat-card-title>
    <h4>Title: {{ post.Title }}</h4>
    <h4>Body: {{ post.content }}</h4>
    <button mat-raised-button color="warn" (click)="deletePost(post.id)">
      Delete
    </button>
    <button mat-raised-button (click)="editPost(post.id)" color="primary">
      Edit
    </button>
  </mat-card>`,
  styles: [
    `
      mat-card {
        display: flex;
        flex-direction: column;
        width: 400px;
        margin: 15px;
        height: 300px;
        padding: 20px;
        justify-content: space-between;

        border: 1px solid rgba(0, 0, 0, 0.8);
        padding: 20px;
        font-size: 30px;
      }
      button {
        margin: 5px;
      }
    `,
  ],
})
export class PostCardComponent {
  // @ts-ignore
  @Input() post: PostModel;

  constructor(
    private commonRepository: CommonRepository,
    private dialog: MatDialog
  ) {}

  deletePost(id: string) {
    this.commonRepository.deletePost(this.post.userId, this.post.id);
  }

  editPost(postId: string) {
    const dialogRef = this.dialog.open(AddUpdatePostComponent, {
      width: '500px',
      height: '500px',
      data: this.post,
    });
  }
}
