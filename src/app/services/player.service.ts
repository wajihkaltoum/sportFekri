import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playerUrl : string = "http://localhost:3000/players";
  constructor(private httpClient : HttpClient) { }

  addPlayer(player){
    return this.httpClient.post<{message:string, isAdded :Boolean}>(this.playerUrl, player);
    }
    
    getAllPlayers(){
     return this.httpClient.get<{players:any}>(this.playerUrl);
    }
  
    
    getPlayerById(id){
      return this.httpClient.get<{findedPlayer:any}>(`${this.playerUrl}/${id}`);
     }
    
    deletePlayerById(id){
      return this.httpClient.delete(`${this.playerUrl}/${id}`);
     }
    
    editPlayer(player){
      return this.httpClient.put(this.playerUrl, player);
     }
}
