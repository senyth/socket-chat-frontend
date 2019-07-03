import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/api-response';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private api: ApiService
  ) { }

  /**
   * Requests to get all chats from API
   * @return        Observable
   * @author        Babie Entoma
   */
  getAllChats(): Observable<APIResponse> {
    return this.api.get(`/chats`);
  }
}
