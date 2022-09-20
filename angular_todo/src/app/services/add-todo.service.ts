import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class AddTodoService {
  public con = this.connection.server;
  headers = new HttpHeaders();
  constructor(
        private connection: ConnectionService,
        private _http:HttpClient
  ) {
  }

  addTodo() {
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(`${this.con}/todo/addTask`, { });
  }

}
