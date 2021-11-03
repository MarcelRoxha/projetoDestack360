import { UserModel } from './../models/UserModel';
import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators' 


@Injectable({
  providedIn: 'root'
})
export class UserModelService {

  private _refreshNeeded$ = new Subject<void>();
  constructor(
    private http : HttpClient
  ) { }

  get refreshNeede$(){
    return this._refreshNeeded$;
  }


  informacoesJaneiro(userModel: UserModel) : Observable<UserModel>{
    return this.http.post<UserModel>('https://destack360.herokuapp.com/acumulado-janeiro', userModel)  
}



informacoesFevereiro(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('https://destack360.herokuapp.com/acumulado-fevereiro', userModel)  
}

informacoesMarco(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('https://destack360.herokuapp.com/acumulado-marco', userModel)  
}

informacoesAbril(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('https://destack360.herokuapp.com/acumulado-abril', userModel)  
}

informacoesMaio(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('https://destack360.herokuapp.com/acumulado-maio', userModel)  
}

informacoesJunho(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('https://destack360.herokuapp.com/acumulado-junho', userModel)  
}

informacoesJulho(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('https://destack360.herokuapp.com/acumulado-julho', userModel)  
}

informacoesAgosto(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('https://destack360.herokuapp.com/acumulado-agosto', userModel)  
}

informacoesSetembro(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('https://destack360.herokuapp.com/acumulado-setembro', userModel)  
}

informacoesOutubro(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('https://destack360.herokuapp.com/acumulado-outubro', userModel)  
}

informacoesNovembro(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('https://destack360.herokuapp.com/acumulado-novembro', userModel)  
}

informacoesDezembro(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('https://destack360.herokuapp.com/acumulado-dezembro', userModel)  
}
 
}
