import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';
import { generateId } from 'src/app/shared/genericFunctions';


@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {
  // Form ID
  matchForm: FormGroup;
  // objet
  match: any = {};
  constructor(
    private router: Router,
    private matchService: MatchService) { }

  ngOnInit() {
  }

  //fct enregistrement matchTab dans local storage.
  addMatch() {

    console.log("here match object", this.match);
    this.matchService.addMatch(this.match).subscribe(
      (response)=>{
        console.log("HERE RESPONSE FROM DB", response);
        this.router.navigate(["allMatches"]);
      }
    );

  }
  //fct retourne un ID max dans un tableau

}
