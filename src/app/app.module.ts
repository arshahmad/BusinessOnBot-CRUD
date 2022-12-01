import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/layout/dashboard.component';
import { HeaderComponent } from './components/layout/header.component';
import { CommonLayoutComponent } from './components/layout/common-layout.component';
import { UsersComponent } from './containers/users.component';
import { PostComponent } from './containers/post.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { ApiService } from './services/api.service';
import { UserCardComponent } from './components/user-card.component';
import { userListComponent } from './components/user-list.component';
import { PostListComponent } from './components/post-list.component';
import { PostCardComponent } from './components/post-card.component';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './reducers';
import { CommonRepository } from './services/common.repository';
import { ErrorComponent } from './components/layout/error.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { UpdateUserComponent } from './components/update-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUpdatePostComponent } from './components/add-update-post.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    CommonLayoutComponent,
    UsersComponent,
    PostComponent,
    UserCardComponent,
    userListComponent,
    PostListComponent,
    PostCardComponent,
    ErrorComponent,
    UpdateUserComponent,
    AddUpdatePostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [HttpService, ApiService, CommonRepository],
  bootstrap: [AppComponent],
})
export class AppModule {}
