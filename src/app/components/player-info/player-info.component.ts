import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {
  player: any;
  players: any ;
  id: any ;

  constructor(
    private activatedRoute:ActivatedRoute,
    private PlayerService : PlayerService
    ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id"); //id ds routing.module.ts
    //search object by id
    this.PlayerService.getPlayerById(this.id).subscribe(
    (data)=>{
      this.player=data.findedPlayer;

  }
  )
  }
}
