import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {
  teamsTab: any = [];
  constructor(private teamService:TeamService,
    private router : Router) { }

  ngOnInit() {
    this.teamService.getAllTeams().subscribe(
      (response)=>{
        this.teamsTab= response.teams;
      }
    )
  }

  deleteTeamById(x){
   this.teamService.deleteById(x).subscribe(
    (response)=>{
      console.log("Here resp after delete", response.message);

      // pour rafraichir le tableau
      this.teamService.getAllTeams().subscribe(
        (response)=>{
          this.teamsTab= response.teams;
        }
      )
    }
   );
  }


  displayTeam(id){
    this.router.navigate([`teamInfo/${id}`]);
  }


  editTeams(x:number){
    alert("EDIT" + x);
  }

  

}
