import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  BehaviorSubject,
  Observable,
  throwError,
} from 'rxjs';
import {
  catchError,
  tap,
} from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private myAppUrl: string;
  private myApiUrl: string;
  private apiUrl: string;
  private tokenKey = 'authToken';
  private loggedIn = new BehaviorSubject<boolean>(false);
 
  
  constructor(private http      : HttpClient, 
              public jwtHelper  : JwtHelperService,
              private router    : Router,) {
    this.myAppUrl = environment.endPoint;
    this.myApiUrl = "/api/users"
    this.apiUrl = 'http://localhost:3000';
    

  }
   /** Entrar a  Usuario  */
  login(data: FormData, token:string): Observable<any> {
    return this.http.post<{ token: string }>(`http://localhost:3000/api/users`,data).pipe(
      tap(response => { 
          catchError(this.handleError)
          if (response.token) {
              localStorage.setItem('token', response.token);
              this.loggedIn.next(true);
          }})   
      );
  }

  /** Nuevo Usuario  */
  signIn(data: FormData): Observable<string> {
   return this.http.post<string>(`http://localhost:3000/api/users/registro`, data)
  }

   /** Cuando tiene link */
  resetPass(token: string, newPassword: string): Observable<string> {
    return this.http.put<string>(`http://localhost:3000/api/users`, { token, newPassword })
  }

  linkPassword(data: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.myAppUrl}${this.myApiUrl}/linkPass`, data).pipe(
      tap(response => {
          catchError(this.handleError)
          if (response.token) {
              localStorage.setItem('token', response.token);
              this.loggedIn.next(true);
          }})   
      );
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }


  setToken(token: string): void { 
    localStorage.setItem(this.tokenKey, token); 
  }

  
  isLoggedIn(): boolean {
    return this.getToken() !== null; 
  }
 
  logout(): void {
    this.http.post('/api/logout', {}).subscribe(response => { 
      // Clear user authentication token and other local storage 
      localStorage.removeItem('authToken'); 
      sessionStorage.removeItem('authToken'); 
      // Redirect to login page or another appropriate page 
      this.router.navigate(["/productos/galeria"]); 
    });
  }

  removeToken(): void {
     localStorage.removeItem(this.tokenKey); 
    }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!'; 
    if (error.error instanceof ErrorEvent) { 
      /* Client-side errors*/
        errorMessage = `Error: ${error.error.message}`; 
    } else {  
      /* Server-side  errors */
     if (error.status === 401) { 
      errorMessage = 'Contraseña Incorrecta'; 
      } else { 
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`; 
      } 
    } return throwError(() => errorMessage);
  }
  
/****** loginProtected y getProtectedData, prueba de funcionamiento de Token con rutas */
  async loginProtected (username: string): Promise<any>{
    console.log("llegue aprotected",username)
    return this.http.post<any>(`${this.apiUrl}/login`, { username });
  }
 

  async getProtectedData():Promise<any> { 
    const token = this.getToken(); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
    return this.http.get<any>(`${this.apiUrl}/protected`, { headers });
  }


}

