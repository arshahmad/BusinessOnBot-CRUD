import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserModel } from '../models/user.model';
import { CommonRepository } from '../services/common.repository';

@Component({
  selector: 'app-update-user',
  template: `
    <div>
      <mat-toolbar color="primary">
        <span>{{ !!this.data ? 'Edit' : 'Add' }} User</span>
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
          <input
            [formControl]="controls.name"
            matInput
            placeholder="User Name"
          />
          <mat-error>Name is required</mat-error>
        </mat-form-field>
        <button
          class="submit-button"
          mat-raised-button
          color="accent"
          type="submit"
        >
          {{ this.data ? 'Update' : 'Add' }}
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
        margin: 5px;
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
export class UpdateUserComponent implements OnInit {
  controls = {
    name: new FormControl('', Validators.required),
  };
  form = new FormGroup(this.controls);

  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    private commonRepository: CommonRepository
  ) {}

  ngOnInit() {
    this.controls.name.setValue(this.data ? this.data.name : '');
  }

  updateOrAddUser() {
    if (this.data) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  updateUser() {
    const updatedUser = { ...this.data, ...this.form.value };
    this.commonRepository.updateUser(updatedUser);
    this.dialogRef.close();
  }

  addUser() {
    const user = this.form.value;
    this.commonRepository.addUser({
      ...user,
      createdAt: new Date(),
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/443.jpg',
    });
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
