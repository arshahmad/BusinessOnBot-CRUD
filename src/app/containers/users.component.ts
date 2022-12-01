import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserModel } from '../models/user.model';
import { CommonRepository } from '../services/common.repository';
import { takeWhile } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../components/update-user.component';

@Component({
  selector: 'app-users',
  template: `
    <div class="container">
      <div *ngIf="!isLoading && !error" class="w-full">
        <button color="primary" mat-raised-button (click)="addUser()">
          Add User
        </button>

        <app-user-list [Users]="users"></app-user-list>
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
      app-user-list {
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
export class UsersComponent implements OnInit, OnDestroy {
  users: UserModel[] = [];
  isLoading: boolean = false;
  error: boolean = false;
  isAlive = true;

  constructor(
    private commonRepository: CommonRepository,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchUsersList();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  fetchUsersList() {
    const observer$ = this.commonRepository.getUsersList();
    const loading$ = observer$[0];
    const userData$ = observer$[1];
    const error$ = observer$[2];
    loading$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.isLoading = data;
    });
    error$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.error = data;
    });
    userData$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.users = data;
    });
  }

  tryAgain() {
    this.commonRepository.getUsersList(true);
  }

  addUser() {
    this.dialog.open(UpdateUserComponent, {
      width: '500px',
      height: '500px',
    });
  }
}
