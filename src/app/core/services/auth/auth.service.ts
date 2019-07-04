import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { APIResponse } from '../../models/api-response';
import { ApiService } from '../api.service';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router,
    private api: ApiService
  ) { }

  /**
   * @return        boolean
   * @author        Babie Entoma
   */
  public isLoggedIn() {
    let ret = false;
    const token = localStorage.getItem('id_token');

    console.log(token);

    if (token != null && token !== undefined) {
      ret = moment().isBefore(this.jwtHelper.getTokenExpirationDate(token));

      console.log('ret: ' + ret);
    }

    return ret;
  }

  /**
   * @return        boolean
   * @author        Babie Entoma
   */
  public getToken() {
    return localStorage.getItem('id_token');
  }

  /**
   * Authenticates user input. Save token to local storage if valid
   * @param         userid: string, password: string
   * @return        none
   * @author        Babie Entoma
   */
  authenticate(user: User): Observable<APIResponse> {
    return this.api.post(`/auth/users/authenticate`, {credentials: user})
    .pipe(tap((res: APIResponse) => {
      if (res.success) {
        localStorage.setItem('id_token', res.data.token);
        localStorage.setItem('username', res.data.user.username);
        localStorage.setItem('user_id', res.data.user._id);
      }
    }));
  }

  /**
   * @return        boolean
   * @author        Babie Entoma
   */
  isLoggedOut() {
    return !this.isLoggedIn();
  }

  /**
   * @returns       moment
   * @author        Babie Entoma
   */
  getTokenExpirationDate() {
    const token = localStorage.getItem('id_token');
    const expiresOn = this.jwtHelper.getTokenExpirationDate(token);
    return moment(expiresOn);
  }

  /**
   * @returns       boolean
   * @author        Babie Entoma
   */
  isTokenExpired() {
    const token = localStorage.getItem('id_token');
    return this.jwtHelper.isTokenExpired(token);
  }

  /**
   * @returns       decoded token
   * @author        Babie Entoma
   */
  decodeToken() {
    const token = localStorage.getItem('id_token');
    return this.jwtHelper.decodeToken(token);
  }

  /**
   * @return        boolean
   * @author        Babie Entoma
   */
  public logout() {
    // localStorage.removeItem('id_token');

    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public getUserID() {
    const token = this.decodeToken();
    return token._id;
  }
}
