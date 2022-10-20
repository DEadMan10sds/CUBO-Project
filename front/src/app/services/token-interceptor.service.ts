import { HttpInterceptor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserBackConnectionService } from "./userBackConnection.service";

@Injectable({
  providedIn: 'root'
})
export class tokenInterceptor implements HttpInterceptor
{
  constructor(
    private logInService: UserBackConnectionService
  ){}

    intercept(req, next)
    {
      //console.log(req)
      if(((req.url.includes('auth')) || (req.url.includes('users/'))) && req.method === "POST" )
        return next.handle(req)

      const tokenizedRequest = req.clone({
        setHeaders: {
          xToken: this.logInService.getToken()
        }
      });
      return next.handle(tokenizedRequest);
    }

}
