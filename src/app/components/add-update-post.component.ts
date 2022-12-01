import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostModel } from '../models/post.model';
import { CommonRepository } from '../services/common.repository';

@Component({
  selector: 'app-update-post',
  template: `
    <div>
      <mat-toolbar color="primary">
        <span>{{ !!this.data.Title ? 'Edit' : 'Add' }} Post</span>
        <span class="header">
          <mat-icon color="white" (click)="onNoClick()">close</mat-icon>
        </span>
      </mat-toolbar>

      <form
        [formGroup]="form"
        class="input-form"
        (ngSubmit)="form.valid && updateOrAddUser()"
      >
        <mat-form-field>
          <input [formControl]="controls.Title" matInput placeholder="Title" />
          <mat-error>Title is required</mat-error>
        </mat-form-field>
        <mat-form-field>
          <input
            [formControl]="controls.content"
            matInput
            placeholder="Content"
          />
          <mat-error>Content is required</mat-error>
        </mat-form-field>
        <button
          class="submit-button"
          mat-raised-button
          color="accent"
          type="submit"
        >
          {{ this.data.Title ? 'Update' : 'Add' }}
        </button>
      </form>
    </div>
  `,
  styles: [
    `
      .header {
        display: flex;
        justify-content: flex-end;
        width: 100%;
      }
      .input-form {
        display: flex;
        flex-direction: column;
        width: 95%;
        align-items: center;
        padding: 10px;
      }
      mat-form-field {
        margin-bottom: 5px;
        width: 100%;
      }
      .submit-button {
        width: 150px;
      }
    `,
  ],
})
export class AddUpdatePostComponent implements OnInit {
  controls = {
    Title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  };
  form = new FormGroup(this.controls);

  constructor(
    public dialogRef: MatDialogRef<AddUpdatePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostModel,
    private commonRepository: CommonRepository
  ) {}

  ngOnInit() {
    this.controls.Title.setValue(this.data ? this.data.Title : '');
    this.controls.content.setValue(this.data ? this.data.content : '');
  }

  updateOrAddUser() {
    if (this.data.Title) {
      this.updatePost();
    } else {
      this.addPost();
    }
  }

  updatePost() {
    const updatedPost = { ...this.data, ...this.form.value };
    this.commonRepository.updatePost(this.data.userId, updatedPost);
    this.dialogRef.close();
  }

  addPost() {
    const post = this.form.value;
    this.commonRepository.addPost(this.data.userId, {
      ...post,
      createdAt: new Date(),
    });
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
