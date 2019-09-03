import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:sign';
  private apikey = 'AIzaSyCWlHdV82_WCKddZSAVMaO0mTth4TkgpI8';
  private crearUsuario = 'Up?key=';
  private loguear = 'InWithPassword?key=';
  userToken: string;

  // Crear nuevos usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logout() {

  }

  login(usuario: UsuarioModel) {

    const authData = {
      // operador spread
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}${this.loguear}${this.apikey}`, authData
    ).pipe(
      map( res => {
        // tslint:disable-next-line:no-string-literal
        this.guardarToken( res['idToken']);
        return res;
      })
    );
  }

  nuevoUsuario(usuario: UsuarioModel) {

    const authData = {
      // operador spread
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}${this.crearUsuario}${this.apikey}`, authData
    ).pipe(
      map( res => {
        // tslint:disable-next-line:no-string-literal
        this.guardarToken( res['idToken']);
        return res;
      })
    );
  }

  private guardarToken( idToken: string) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

}
