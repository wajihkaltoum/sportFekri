import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.css']
})
export class MatchesTableComponent implements OnInit {

  matches: any = [];
  id: any;
  constructor(
    private router:Router,
    private matchService: MatchService
    ) { }

  ngOnInit() {
   this.matchService.getAllMatches().subscribe(
    (response)=>{
      this.matches= response.matches;
    }
   )
  }

  displayMatch(x:number){
    this.router.navigate([`matchInfo/${x}`]);
  }

  editMatch(x:number){
    alert("EDIT" + x);
  }
  
  goToEdit(id:number){
   this.router.navigate([`editMatch/${id}`]);
  }

  deleteMatch(x : number){
    this.matchService.deleteMatchById(x).subscribe(
      (response)=>{
        console.log("here response after delete", response.message);
        this.matchService.getAllMatches().subscribe(
          (response)=>{
            this.matches= response.matches;
          }
         )
      }
     )
  }

  
  
}
