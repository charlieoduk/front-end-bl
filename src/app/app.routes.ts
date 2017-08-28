import { Routes, RouterModule } from '@angular/router';
import { BucketListComponent } from './bucket-list/bucket-list.component';
import { BucketListDetailsComponent } from './bucket-list-details/bucket-list-details.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';

// Route config let's you map routes to components
const routes: Routes = [
    // map '/persons' to the people list component
    {
      path: 'bucketlists',
      component: BucketListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'home',
      component: HomeComponent,
    },
    {
        path: 'bucketlists/:id',
        component: BucketListDetailsComponent
    },
    {
      path: 'bucketlists/:id/delete',
      component: BucketListDetailsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    // map '/' to '/persons' as our default route
    {
      path: '',
      redirectTo: '/bucketlists',
      canActivate: [AuthGuard],
      pathMatch: 'full'
    },
  ];

export const appRouterModule = RouterModule.forRoot(routes);
