import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class GetAllTodoService {
  public con = this.connection.server;
  headers = new HttpHeaders();
  constructor(
    private connection: ConnectionService,
    private _http:HttpClient

  ) {

  }

  getTodoList() {
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(`${this.con}/api/todo/getTodoList`, { });
  }

}
