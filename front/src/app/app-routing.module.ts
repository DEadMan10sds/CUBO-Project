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
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { AuthGuard } from './guards/auth.guard';
import { TeacherGuardGuard } from './guards/teacher-guard.guard';
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
        resolve:[UserResolver],
        canActivate: [AuthGuard],
        component: ProfileComponent
      },
    ]
  },
  {
    path: 'Home',
    component: HomeComponent,
    resolve: [UserResolver, LaboratoryResolverService],
    canActivate: [AuthGuard]
  },
  {
    path: ':idLab',
    component: ClassSelectorDetailComponent,
    resolve: [UserResolver, ClassResolverService],
    canActivate: [AuthGuard],
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
    resolve: [UserResolver, LaboratoryResolverService],
    canActivate: [AuthGuard, AdminGuardGuard],
    //canActivateChild: [AdminGuardGuard],
    children: [
      {
        path: ':idLab',
        //canActivate: [AdminGuardGuard],
        component: EditLaboComponent
      },
      {
        path: ':idLab/:classID',
        resolve: [ClassResolverService],
        canActivate: [AdminGuardGuard, TeacherGuardGuard],
        component: ClassEditComponent
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
