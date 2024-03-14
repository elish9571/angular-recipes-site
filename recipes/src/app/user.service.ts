import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7070/api/User';
  constructor(private http: HttpClient) { }

  getUser(name: string): Observable<User> {
    console.log(name);
    return this.http.get<User>(`${this.apiUrl}/${name}`)
  }
  addUser(user: User): Observable<User[]> {
    return this.http.post<User[]>(`${this.apiUrl}`, user)
  }

}
