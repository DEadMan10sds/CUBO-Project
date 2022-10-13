import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassDetailComponent } from './components/class-detail/class-detail.component';
import { ClassEditComponent } from './components/class-edit/class-edit.component';
import { ClassPlaceholderComponent } from './components/class-placeholder/class-placeholder.component';
import { ClassSelectorDetailComponent } from './components/class-selector-detail/class-selector-detail.component';
import { ClassesListComponent } from './components/classes-list/classes-list.component';
import { ClassesComponent } from './components/classes/classes.component';

//Customs
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full'
  },
  {
    path: 'Home',
    component: HomeComponent,
  },
  {
    path: 'Classes',
    component: ClassSelectorDetailComponent,
    children: [
      {
        path: ':labName',
        component: ClassPlaceholderComponent,
        //pathMatch: 'full'
      },
      {
        path: ':labName/:classID',
        pathMatch: 'full',
        component: ClassDetailComponent
      }
    ],
  },
  {
    path: 'Dashboard/:classID',
    component: ClassEditComponent
  },
  {
    path: 'Profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
