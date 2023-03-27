import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {
  playersTab: any = [];

  constructor(
    private router : Router,
    private playerService : PlayerService
    ) { }

  ngOnInit() {
    this.playerService.getAllPlayers().subscribe(
      (response)=>{
        this.playersTab= response.players;
      }
    )
  }
  goToPlayer(id){
    this.router.navigate([`playerInfo/${id}`]);
  }

  editPlayers(x:number){
    alert("EDIT" + x);
  }

  deletePlayers(x:number){
    alert("DELETE" + x);
  }

  

}
