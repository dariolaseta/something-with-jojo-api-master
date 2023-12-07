import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = 'https://stand-by-me.herokuapp.com/api/v1/characters';
  newApiUrl: string = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getCharactersData(){
    return this.http.get<any>(this.newApiUrl);
  }

  testMockServer() {
    return this.http.get<any>(this.newApiUrl);
  }
}
