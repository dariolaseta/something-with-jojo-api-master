import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = 'https://stand-by-me.herokuapp.com/api/v1/characters';

  constructor(private http: HttpClient) { }

  getCharactersData(){
    return this.http.get<any>(this.apiUrl);
  }
}
