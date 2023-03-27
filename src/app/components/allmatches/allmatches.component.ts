import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-allmatches',
  templateUrl: './allmatches.component.html',
  styleUrls: ['./allmatches.component.css']
})
export class AllmatchesComponent implements OnInit {
  matchesTab: any = [];
  constructor(private matchservice : MatchService) { }

  ngOnInit() {
    // this.matchesTab=JSON.parse(localStorage.getItem("matches")||"[]");
    this.matchservice.getAllMatches().subscribe(
      (response)=>{
        this.matchesTab= response.matches;
        
      }
    );
  }
  updateMatches(objs:any){
    this.matchesTab=objs;
  }
}
