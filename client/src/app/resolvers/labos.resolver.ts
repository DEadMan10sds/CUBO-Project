import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Laboratories } from '../interfaces/laboratories.interface';
import { LaboratoriesService } from '../services/labos.service';
import { BackLaboratories } from '../services/labosBack.service';

@Injectable({
  providedIn: 'root',
})
export class ResolverLabo implements Resolve<Laboratories[]> {
  constructor(
    private labService: LaboratoriesService,
    private backLabs: BackLaboratories
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Laboratories[] | Observable<Laboratories[]> | Promise<Laboratories[]> {
    const laboratoriesInstance = this.labService.getLabsArray();
    if (!laboratoriesInstance.length) return this.backLabs.fetchLabs();
    return laboratoriesInstance;
  }
}
