import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { JWTInterceptor } from './services/JWTTokenInterceptor.service';
import { HomeComponent } from './pages/home/home.component';
import { UserService } from './services/user.service';
import { LabosListComponent } from './components/labos-list/labos-list.component';
import { LaboCardComponent } from './components/labo-card/labo-card.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { LaboDetailComponent } from './components/labo-detail/labo-detail.component';
import { ClassDetailsComponent } from './components/class-details/class-details.component';
import { LaboratoriesService } from './services/labos.service';
import { ClassesService } from './services/classes.service';
import { EditLaboComponent } from './components/edit-labo/edit-labo.component';
import { EditClassesComponent } from './components/edit-classes/edit-classes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LabosListComponent,
    LaboCardComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
    LaboDetailComponent,
    ClassDetailsComponent,
    EditLaboComponent,
    EditClassesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    UserService,
    ClassesService,
    LaboratoriesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
