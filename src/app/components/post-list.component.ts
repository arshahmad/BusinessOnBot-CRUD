import {Component, Input} from "@angular/core";
import {PostModel} from "../models/post.model";

@Component({
  selector: "app-posts-list",
  template: `
    <div class="list" *ngFor="let post of posts">
      <app-post-card [post]="post" ></app-post-card>
    </div>`,
  styles: [`
    .list {
      display: flex;
      flex-direction: row;
    }`]
})

export class PostListComponent {
  @Input() posts: PostModel[] =[];

  constructor() {
  }
}
