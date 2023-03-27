import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  articlesTab: any = [
    {id: 1 , img:"assets/images/img_1.jpg", date:"08-10-89",article:"RONALDO",parag:"PLAYER1",read:"MORE"},
    {id: 2 ,img:"assets/images/img_2.jpg", date:"08-10-89",article:"MBAPPE",parag:"PLAYER2",read:"MORE"},
    {id: 3 ,img:"assets/images/img_3.jpg", date:"08-10-89",article:"MESSI",parag:"PLAYER3",read:"MORE"},
    {id: 4 ,img:"assets/images/img_1.jpg", date:"08-10-89",article:"KROOS",parag:"PLAYER4",read:"MORE"},
  ];
  constructor() { }

  ngOnInit() {
  }

}
