import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Laboratories } from '../interfaces/laboratories.interface';

@Injectable({
  providedIn: 'root',
})
export class LaboratoriesService {
  laboratoriesChanges = new Subject<Laboratories[]>();
  private LaboratoriesArray: Laboratories[] = [];

  setLabsArray(fetchedLabs: Laboratories[]) {
    this.LaboratoriesArray = fetchedLabs;
    this.laboratoriesChanges.next(this.LaboratoriesArray.slice());
  }

  getLabsArray(): Laboratories[] {
    return this.LaboratoriesArray.slice();
  }

  getLabosArrayLenght() {
    return this.LaboratoriesArray.length;
  }

  getSpecificLabo(labID: string) {
    if (+labID == 0) return new Laboratories();
    return this.LaboratoriesArray.find((lab) => lab.id === labID);
  }

  getSpecificLaboName(labID: string) {
    return this.LaboratoriesArray.find((lab) => lab.id === labID).name;
  }

  deleteAllLabs() {
    this.LaboratoriesArray = [];
  }
}
