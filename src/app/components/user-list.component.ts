import { Component, Input } from '@angular/core';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="list">
      <div *ngFor="let user of Users">
        <app-user-card [user]="user"></app-user-card>
      </div>
    </div>
  `,
  styles: [
    `
      .list {
        width: 100%;
        display: grid;
        grid-template-columns: auto auto auto;
        background-color: lightgrey;
        padding: 10px;
        column-gap: 10px;
        border-radius: 10px
      }
    `,
  ],
})
export class userListComponent {
  @Input() Users: UserModel[] = [];
  constructor() {}
}
