import {Injectable} from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { LaboratoriesModel } from "../../models/laboratories.model";
import { BackConnectionService } from "../backConnection.service";
import { LaboratoriesService } from "../laboratories.service";

@Injectable({
  providedIn: 'root'
})
export class LaboratoryResolverService implements Resolve<LaboratoriesModel[]>
{
  constructor(private backConnection: BackConnectionService, private labService: LaboratoriesService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): LaboratoriesModel[] | Observable<LaboratoriesModel[]> | Promise<LaboratoriesModel[]> {
    //console.log('resolver')
    const laboratories = this.labService.getLaboratories();
    if(laboratories.length === 0) return this.backConnection.fetchLabs();
    return laboratories;
  }
}
