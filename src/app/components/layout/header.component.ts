import {Component} from "@angular/core";

@Component({
  selector: "app-header",
  template: `
    <mat-toolbar color="primary" style="height: 85px; padding: 0 16px;">
      <div class="flex justify-center items-center">
        <button mat-button routerLink="" [routerLinkActiveOptions]="{exact : true}" routerLinkActive="selected">Users</button>
      </div>
    </mat-toolbar>
  `,
  styles: [`
  .selected {
    background-color: black;
  }
  `]
})

export class HeaderComponent {

}
