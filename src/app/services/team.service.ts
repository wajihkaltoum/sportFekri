import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
teamUrl : string="http://localhost:3000/teams";
  constructor(
     private httpClient: HttpClient,
     ) { }

     addTeam(teamObj){
      return this.httpClient.post<{message:string}>(this.teamUrl,teamObj);

     }

     getAllTeams(){
      return this.httpClient.get<{teams:any}>(this.teamUrl);

     }
     getTeamById(id) {
      return this.httpClient.get<{findedTeam:any}>(`${this.teamUrl}/${id}`);
    }

     deleteById(id){
      return this.httpClient.delete<{message:string}>(`${this.teamUrl}/${id}`);
     }
}
