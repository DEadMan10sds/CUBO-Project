import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Laboratories } from '../interfaces/laboratories.interface';
import { LaboratoriesService } from './labos.service';

@Injectable({
  providedIn: 'root',
})
export class BackLaboratories {
  constructor(
    private httpSolicitudes: HttpClient,
    private labService: LaboratoriesService
  ) {}

  fetchLabs() {
    console.log('Fetching labs');
    return this.httpSolicitudes
      .get<Laboratories[]>(environment.backURL + '/labs/')
      .pipe(
        tap((lab) => {
          this.labService.setLabsArray(lab);
        })
      );
  }

  createLab(labData: Laboratories) {
    this.httpSolicitudes
      .post<{ Message: string; result?: Laboratories }>(
        environment.backURL + '/labs/',
        labData
      )
      .subscribe();
  }

  editLab(editedLab: Laboratories) {
    console.log('Editing lab');
    this.httpSolicitudes
      .put<{ Message: string; existsLab?: Laboratories }>(
        environment.backURL + '/labs/' + editedLab.id,
        editedLab
      )
      .subscribe();
  }

  deleteLab(IDlabToDelete: string) {
    console.log('Eliminando labo');
    this.httpSolicitudes
      .delete<{
        Message: string;
        edeletedLab?: Laboratories;
      }>(environment.backURL + '/labs/delete/' + IDlabToDelete)
      .subscribe();
    this.fetchLabs();
  }
}
