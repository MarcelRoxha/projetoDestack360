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
    return this.http.post<UserModel>('http://3672-104-198-233-245.ngrok.io/acumulado-janeiro', userModel)  
}



informacoesFevereiro(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('http://3672-104-198-233-245.ngrok.io/acumulado-fevereiro', userModel)  
}

informacoesMarco(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('http://3672-104-198-233-245.ngrok.io/acumulado-marco', userModel)  
}

informacoesAbril(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('http://3672-104-198-233-245.ngrok.io/acumulado-abril', userModel)  
}

informacoesMaio(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('http://3672-104-198-233-245.ngrok.io/acumulado-maio', userModel)  
}

informacoesJunho(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('http://3672-104-198-233-245.ngrok.io/acumulado-junho', userModel)  
}

informacoesJulho(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('http://3672-104-198-233-245.ngrok.io/acumulado-julho', userModel)  
}

informacoesAgosto(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('http://3672-104-198-233-245.ngrok.io/acumulado-agosto', userModel)  
}

informacoesSetembro(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('http://3672-104-198-233-245.ngrok.io/acumulado-setembro', userModel)  
}

informacoesOutubro(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('http://3672-104-198-233-245.ngrok.io/acumulado-outubro', userModel)  
}

informacoesNovembro(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('http://3672-104-198-233-245.ngrok.io/acumulado-novembro', userModel)  
}

informacoesDezembro(userModel: UserModel) : Observable<UserModel>{
  return this.http.post<UserModel>('http://3672-104-198-233-245.ngrok.io/acumulado-dezembro', userModel)  
}
 
}
