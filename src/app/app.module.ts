import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
git addimport { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { AppComponent } from './app.component';
import { BucketListComponent } from './bucket-list/bucket-list.component';

import { BucketlistsService } from './bucketlists.service';
import { BucketListDetailsComponent } from './bucket-list-details/bucket-list-details.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { appRouterModule } from './app.routes';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';
import { AuthGuard } from './auth.guard';
import { AlertService } from './alert.service';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { HomeComponent } from './home/home.component';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    BucketListComponent,
    BucketListDetailsComponent,
    LoginComponent,
    NavComponent,
    FooterComponent,
    AlertComponent,
    HomeComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    appRouterModule,
    FormsModule,
    HttpModule,
    BootstrapModalModule
  ],
  providers: [
    BucketlistsService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
  ],
  entryComponents: [ConfirmComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
