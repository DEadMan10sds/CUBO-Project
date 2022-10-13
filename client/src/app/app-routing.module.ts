import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassDetailComponent } from './components/class-detail/class-detail.component';
import { ClassEditComponent } from './components/class-edit/class-edit.component';
import { ClassSelectorDetailComponent } from './components/class-selector-detail/class-selector-detail.component';
import { EditLaboComponent } from './components/edit-labo/edit-labo.component';

//Customs
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
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
    path: 'labDashboard',
    resolve: [LaboratoryResolverService],
    children: [
      {
        path: 'edit/:idLab',
        component: EditLaboComponent
      }
    ]
  },
  {
    path: ':labName',
    component: ClassSelectorDetailComponent,
    resolve: [ClassResolverService],
    //pathMatch: 'full',
    children: [
      {
        path: ':classID',
        pathMatch: 'full',
        //resolve: [ClassResolverService],
        component: ClassDetailComponent

      }
    ]
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
