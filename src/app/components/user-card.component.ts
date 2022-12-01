import { Component, Input } from '@angular/core';
import { UserModel } from '../models/user.model';
import { CommonRepository } from '../services/common.repository';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from './update-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  template: `
    <mat-card>
      <div class="image-container">
        <img [src]="user.avatar" alt="Avatar" />
      </div>
      <div>
        <mat-card-title>{{ user.name }}</mat-card-title>
        <h4>Posts: {{ user.recent_posts.length }}</h4>
        <h4 class="link" (click)="SeePosts(user.id)">See Posts</h4>
        <button mat-raised-button color="warn" (click)="deleteUser(user.id)">
          Delete
        </button>
        <button mat-raised-button color="primary" (click)="editUser()">
          Edit
        </button>
      </div>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        display: flex;
        flex-direction: row;
        width: 400px;
        margin: 15px;
        height: 200px;
        padding: 20px;
        justify-content: space-between;

        border: 1px solid rgba(0, 0, 0, 0.8);
        padding: 20px;
        font-size: 30px;
      }
      button {
        margin: 5px;
      }
      .image-container {
        width: 20%; /* or any custom size */
        height: 100%;
        object-fit: contain;
      }
      img {
        border-radius: 50%;
      }
      .link {
        color: blue;
        cursor: pointer;
      }
    `,
  ],
})
export class UserCardComponent {
  // @ts-ignore
  @Input() user: UserModel;
  constructor(
    private commonRepository: CommonRepository,
    private dialog: MatDialog,
    private router: Router
  ) {}

  deleteUser(id: string) {
    this.commonRepository.deleteUser(id);
  }

  editUser() {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '500px',
      height: '500px',
      data: this.user,
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.user = result;
    // });
  }

  viewUser(userId: string) {
    this.router.navigate(['user', userId]);
  }

  SeePosts(userId: string) {
    this.router.navigate(['user', userId, 'posts']);
  }
}
