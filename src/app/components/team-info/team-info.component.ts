import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {
  team: any = {};
  teams: any = [];
  id: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    // get ID from acivated path
    this.id = this.activatedRoute.snapshot.paramMap.get("id"); //id ds routing.module.ts
    //search object by id
    this.teamService.getTeamById(this.id).subscribe(
      (responce) => {
        this.team = responce.findedTeam;
      }
    )
  }

}
