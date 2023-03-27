import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  // Form ID
  teamForm: FormGroup;
  // objet
  team: any= {};
  constructor(
    private router : Router,
    private teamService:TeamService,
    ) { }

  ngOnInit() {
  }


  addTeam(){
   
    console.log("here is team table", this.team);
    this.teamService.addTeam(this.team).subscribe(
      (responce)=>{
        console.log("Here responce after adding team", responce.message);
        this.router.navigate(["admin"]);
      }
    );
  }

}
