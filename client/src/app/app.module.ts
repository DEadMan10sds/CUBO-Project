import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Customs
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ClassDetailComponent } from './components/class-detail/class-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { LaboratoriesComponent } from './components/laboratories/laboratories.component';
import { LaboratoriesSelectorComponent } from './components/laboratories-selector/laboratories-selector.component';
import { ClassesListComponent } from './components/classes-list/classes-list.component';
import { ClassesComponent } from './components/classes/classes.component';
import { ClassEditComponent } from './components/class-edit/class-edit.component';
import { LaboratoriesService } from './services/laboratories.service';
import { ClassesService } from './services/classes.service';
import { ClassSelectorDetailComponent } from './components/class-selector-detail/class-selector-detail.component';
import { ClassPlaceholderComponent } from './components/class-placeholder/class-placeholder.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditLaboComponent } from './components/edit-labo/edit-labo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    ClassDetailComponent,
    HomeComponent,
    LaboratoriesComponent,
    LaboratoriesSelectorComponent,
    ClassesListComponent,
    ClassesComponent,
    ClassEditComponent,
    ClassSelectorDetailComponent,
    ClassPlaceholderComponent,
    ProfileComponent,
    EditLaboComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LaboratoriesService, ClassesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
