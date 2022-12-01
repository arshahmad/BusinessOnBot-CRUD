import { EventEmitter } from "@angular/core";
import {Component, Output} from "@angular/core";

@Component({
  selector: "app-error",
  template: `
    <div class="flex column justify-center items-center">
    <mat-icon>error_outline</mat-icon>
    <span>Error Occured!</span>
    <button (click)="reload.next(0)" mat-raised-button color="warn">Try Again</button>
    </div>
  `,
  styles: [`
  `]
})

export class ErrorComponent {

  @Output() reload = new EventEmitter();

}
