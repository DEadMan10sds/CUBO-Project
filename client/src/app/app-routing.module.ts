import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassDetailComponent } from './components/class-detail/class-detail.component';
import { ClassEditComponent } from './components/class-edit/class-edit.component';
import { ClassSelectorDetailComponent } from './components/class-selector-detail/class-selector-detail.component';
import { EditLaboComponent } from './components/edit-labo/edit-labo.component';

//Customs
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { ClassResolverService } from './services/resolvers/class-resolver.service';
import { LaboratoryResolverService } from './services/resolvers/laboratories-resolver.service';
import { UserResolver } from './services/resolvers/user-resolver.service';
//import { userResolver } from './services/resolvers/user-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full'
  },
  {
    path: 'User',
    children: [
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: ':idUser',
        canActivate: [AuthGuard],
        component: ProfileComponent
      },
    ]
  },
  {
    path: 'Home',
    component: HomeComponent,
    resolve: [LaboratoryResolverService, UserResolver],
    canActivate: [AuthGuard]
  },

  {
    path: ':idLab',
    component: ClassSelectorDetailComponent,
    canActivate: [AuthGuard],
    resolve: [UserResolver],
    pathMatch: 'full',
    children: [
      {
        path: ':classID',
        //pathMatch: 'full',
        resolve: [ClassResolverService],
        component: ClassDetailComponent
      },
    ]
  },
  {
    path: 'Dashboard',
    resolve: [LaboratoryResolverService, UserResolver],
    canActivate: [AuthGuard],
    children: [
      {
        path: ':idLab',
        //resolve: [LaboratoryResolverService],
        component: EditLaboComponent
      },
      {
        path: ':idLab/:classID',
        resolve: [ClassResolverService],
        component: ClassEditComponent
      },
      {
        path: '**',
        redirectTo: '/404'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
