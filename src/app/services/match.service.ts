import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  // adress server backend 
  matchUrl: string = "http://localhost:3000/matches";
  constructor(private httpClient: HttpClient) { }
  // les methodes
  //request to add match
  //response  :message
  addMatch(obj) {
    return this.httpClient.post<{message:string, isAdded :Boolean}>(this.matchUrl, obj);
  }
  //request to get all matches
  //response  : [{},{},{}...]
  getAllMatches() {
    return this.httpClient.get<{matches:any, message:string}>(this.matchUrl);
  }


  //request to get one match by Id
  //response  : [{}]
  getMatchById(id) {
    return this.httpClient.get<{findedMatch:any}>(`${this.matchUrl}/${id}`);
  }

  //request to delete one match by Id
  //response  : message
  deleteMatchById(id) {
    return this.httpClient.delete<{message:string}>(`${this.matchUrl}/${id}`);
  }

  //request to update one match by Id
  //response  : message
  editMatch(newobj) {
    return this.httpClient.put<{message:string}>(this.matchUrl, newobj);
  }


  searchMatchesByScore(obj){
    
    return this.httpClient.post<{matches:any}>(this.matchUrl+"/search", obj);
  }


 
}
