import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassDetailComponent } from './components/class-detail/class-detail.component';
import { ClassEditComponent } from './components/class-edit/class-edit.component';
import { ClassSelectorDetailComponent } from './components/class-selector-detail/class-selector-detail.component';
import { EditLaboComponent } from './components/edit-labo/edit-labo.component';

//Customs
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { ClassResolverService } from './services/resolvers/class-resolver.service';
import { LaboratoryResolverService } from './services/resolvers/laboratories-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full'
  },
  {
    path: 'Home',
    component: HomeComponent,
    resolve: [LaboratoryResolverService],
  },
  {
    path: 'User',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: ':idUser',
        component: ProfileComponent
      },
    ]
  },
  {
    path: 'Dashboard',
    resolve: [LaboratoryResolverService],
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
    path: ':idLab',
    component: ClassSelectorDetailComponent,
    //pathMatch: 'full',
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
    path: '**',
    redirectTo: '/404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
