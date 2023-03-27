import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent implements OnInit {
  match: any={};
  matches: any = [];
  id: any ;
  constructor(
    private activatedRoute: ActivatedRoute,
    private matchService : MatchService
    ) { }

  ngOnInit() {

    // get ID from acivated path
    this.id = this.activatedRoute.snapshot.paramMap.get("id"); //id ds routing.module.ts
    //search object by id
    this.matchService.getMatchById(this.id).subscribe(
    (data)=>{
      this.match=data.findedMatch;
    }
    )
  }

}
