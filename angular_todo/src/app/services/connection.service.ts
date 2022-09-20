import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  public server = 'http://localhost:3000';
  constructor() { }
}
