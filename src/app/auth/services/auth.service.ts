import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { environments } from 'src/environments/environments';

import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser(): User | undefined {
    return this.user ? structuredClone(this.user) : undefined
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', 'asdsdasdasgfgfasgfbwefv'))
      );
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(err => of(false)),
      );


  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }
}
