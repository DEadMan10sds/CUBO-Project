import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabosListComponent } from './components/labos-list/labos-list.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { UserResolver } from './resolvers/auth.resolver';
import { ResolverLabo } from './resolvers/labos.resolver';
import { LaboDetailComponent } from './components/labo-detail/labo-detail.component';
import { ClassDetailsComponent } from './components/class-details/class-details.component';
import { ResolverClass } from './resolvers/classes.resolver';
import { EditLaboComponent } from './components/edit-labo/edit-labo.component';
import { EditClassesComponent } from './components/edit-classes/edit-classes.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    resolve: [UserResolver],
    children: [
      {
        path: 'profile',
        pathMatch: 'full',
        component: ProfileComponent,
      },
      {
        path: 'labs',
        pathMatch: 'full',
        component: LabosListComponent,
        resolve: [ResolverLabo],
      },
      {
        path: 'details/:labID',
        component: LaboDetailComponent,
        resolve: [ResolverLabo, ResolverClass],
        children: [
          {
            path: ':classID',
            component: ClassDetailsComponent,
          },
        ],
      },

      {
        path: 'addLab',
        pathMatch: 'full',
        canActivate: [AdminGuard],
        component: EditLaboComponent,
        resolve: [ResolverLabo],
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
