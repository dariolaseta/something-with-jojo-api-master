import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = 'https://stand-by-me.herokuapp.com/api/v1/characters';
  newApiUrl: string = 'http://localhost:3000/posts/';

  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) { }

  getCharactersData(){
    return this.http.get<any>(this.newApiUrl);
  }

  testMockServer() {
    return this.http.get<any>(this.newApiUrl);
  }

  createCharacter(body: any) :void {
    this.http.post(this.newApiUrl, body, {headers: this.headers}).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  editCharacter(body: any, id: number) : void {
    this.http.patch(this.newApiUrl + id, body, {headers: this.headers}).subscribe(
      response => {
        console.log(response)
      }
    )
  }

  deleteCharacter(id: number) :void {
    this.http.delete(this.newApiUrl + id, {headers: this.headers}).subscribe(
      response => {
        console.log(response);
      }
    )
  }
}
