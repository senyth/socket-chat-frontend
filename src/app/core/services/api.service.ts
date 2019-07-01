/**
 * Name:          API Service
 * Description:   Holds all the request functions to the API
 * @author:       Babie Entoma
 * Date:          06/28/2019
 */

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

// Custom Classes
import { APIResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Get request to API
   * @param     path - url of the API
   * @param     params - parameters added
   * @returns   Observable that holds the response from the API
   * @author    Babie Entoma
   */
  get(path: string, params?: HttpParams): Observable<APIResponse> {
    if (!params) {
      params = new HttpParams();
    }
    return this.http.get<APIResponse>(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.handleError));
  }

  /**
   * Patch request to API
   * @param     path - url of the API
   * @param     body- contains the data
   * @returns   Observable that holds the response from the API
   * @author    Babie Entoma
   */
  patch(path: string, body: object = {}): Observable<APIResponse> {
    return this.http.patch<APIResponse>( `${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.handleError));
  }

  /**
   * Put request to API
   * @param     path - url of the API
   * @param     body - contains the data
   * @returns   Observable that holds the response from the API
   * @author    Babie Entoma
   */
  put(path: string, body: Object = {}, option: Object = {}): Observable<APIResponse> {
    return this.http.put<APIResponse>( `${environment.api_url}${path}`, JSON.stringify(body), option)
      .pipe(catchError(this.handleError));
  }

  /**
   * Post request to API
   * @param     path - url of the API
   * @param     body - contains the data
   * @returns   Observable that holds the response from the API
   * @author    Babie Entoma
   */
  post(path: string, body: object = {}, options?: Object): Observable<APIResponse> {
    if (options !== 'font') {
      return this.http.post<APIResponse>(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.handleError));
    } else {
      return this.http.post<APIResponse>(`${environment.api_url}${path}`, body)
      .pipe(catchError(this.handleError));
    }
  }

  /**
   * Delete request to API
   * @param     path - url of the API
   * @param     params - parameters added
   * @returns   Observable that holds the response from the API
   * @author    Babie Entoma
   */
  delete(path, params: HttpParams = new HttpParams()): Observable<APIResponse> {
    return this.http.delete<APIResponse>(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.handleError));
  }

  /**
   * Handle the error returned from the API
   * @param     error - contains the error response from the request
   * @returns   void
   * @author    Babie Entoma
   */
  private handleError(error: HttpErrorResponse) {
    // return an observable with a user-facing error message
    return throwError(error.error);
  }
}

