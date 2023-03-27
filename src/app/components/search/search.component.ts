import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  searchForm : FormGroup;
  // objet
  matches: any = [];
  constructor(private matchService : MatchService) { }

  ngOnInit() {
  }

  searchMatchesByScore(){
    console.log("here match object", this.matches);
    this.matchService.searchMatchesByScore(this.matches).subscribe(
      (response)=>{
        console.log("HERE RESPONSE FROM DB", response);
        
      }
    );

  }

  
}
