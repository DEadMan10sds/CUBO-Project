import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LaboratoriesModel } from '../models/laboratories.model';
import { environment } from 'src/environments/environment';
import { LaboratoriesService } from './laboratories.service';
import {tap} from 'rxjs/operators'
import { ClassesModel } from '../models/classes.model';
import { ClassesService } from './classes.service';

@Injectable({
  providedIn: 'root'
})
export class BackConnectionService
{

  constructor(private httpSolicitudes: HttpClient, private labService: LaboratoriesService, private classService: ClassesService){}

  postLab(newLab: LaboratoriesModel)
  {
    this.httpSolicitudes.post<{Message, result: LaboratoriesModel}>((environment.BACK_URL + 'labs/'), newLab)
    .subscribe(
      resultingLab =>
      {
        //console.log(resultingClass)
        this.labService.createLab(resultingLab.result);
      }
    );
  }

  updateLab(updateLabID: string, updatedLab: LaboratoriesModel)
  {
    this.httpSolicitudes.put<LaboratoriesModel>((environment.BACK_URL + 'labs/' + updateLabID), updatedLab).subscribe();
    this.labService.updateLab(updateLabID, updatedLab);
    //this.fetchLabsWithoutSub();
  }

  fetchLabs()
  {
    return this.httpSolicitudes.get<LaboratoriesModel[]>((environment.BACK_URL + 'labs/'))
    .pipe(
      tap(
        laboratories => {
          //console.log("Fetching: ", laboratories)
          this.labService.setLaboratories(laboratories);
        }
      )
    );
  }

  fetchLabsWithoutSub()
  {
    this.httpSolicitudes.get<LaboratoriesModel[]>((environment.BACK_URL + 'labs/'))
    .pipe(
      tap(
        laboratories => {
          //console.log("Fetching: ", laboratories)
          this.labService.setLaboratories(laboratories);
        }
      )
    ).subscribe();
  }

  fetchSingleClass(classID: string)
  {
    return this.httpSolicitudes.get<ClassesModel>((environment.BACK_URL + 'classes/' + classID));
  }

  deleteLab(labID: string)
  {
    //console.log(labID)
    this.httpSolicitudes.delete<LaboratoriesModel>((environment.BACK_URL + 'labs/delete/' + labID)).subscribe();
    this.labService.deleteLab(labID);
  }

}
