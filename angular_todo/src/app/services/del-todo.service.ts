import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class DelTodoService {
  public con = this.connection.server;
  headers = new HttpHeaders();
  constructor(
    private connection: ConnectionService,
    private _http:HttpClient
  ) { }

  delTodo(_id:any) {
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
    return this._http.delete(`${this.con}/todo`, { params: {_id} });
  }

}
