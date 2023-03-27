import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent implements OnInit {
  matchForm: FormGroup;
  match: any = {};
  matches: any = [];
  id: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matchService: MatchService) { }

  ngOnInit() {
   
    //get ID from path
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    //search object by Id
    this.matchService.getMatchById(this.id).subscribe(
      (response)=>{
       this.match = response.findedMatch
      }
    )

  }
  editMatch() {
    console.log("HERE NEW MATCH OBJECT", this.match);
    this.matchService.editMatch(this.match).subscribe(
      (response)=>{
        console.log("here msg", response.message);
        this.router.navigate(["admin"]);
      }
    )
    
  }
}
