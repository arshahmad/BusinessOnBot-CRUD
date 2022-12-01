import {Component} from "@angular/core";

@Component({
  selector: "app-common",
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styles: [``]
})

export class CommonLayoutComponent {

}
