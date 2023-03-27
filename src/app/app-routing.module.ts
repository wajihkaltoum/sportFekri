import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { AdminComponent } from './components/admin/admin.component';
import { AllmatchesComponent } from './components/allmatches/allmatches.component';
import { EditMatchComponent } from './components/edit-match/edit-match.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';

import { PlayersComponent } from './components/players/players.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';

import { TeamInfoComponent } from './components/team-info/team-info.component';
import { WeatherComponent } from './components/weather/weather.component';


const routes: Routes = [
//http://localhost:4200 ==> home compenant will be displayed
{path: "", component: HomeComponent},
//http://localhost:4200/signin ==> login compenant will be displayed
{path: "signin", component: LoginComponent},
//http://localhost:/signup ==> signup compenant will be displayed
{path: "subscription", component: SignupComponent},
{path: "signupAdmin", component: SignupComponent},
{path: "allMatches", component: AllmatchesComponent},
{path: "players", component: PlayersComponent},
{path: "addmatch", component: AddMatchComponent},
{path: "addplayer", component: AddPlayerComponent},
{path:"addteam", component: AddTeamComponent},
{path: "admin", component: AdminComponent},
{path: "profile", component: ProfileComponent},
{path: "weather", component: WeatherComponent},

// :id cad c un parametre variable
{path: "matchInfo/:id", component:MatchInfoComponent},
{path: "editMatch/:id", component:EditMatchComponent},
{path: "playerInfo/:id", component: PlayerInfoComponent},
{path: "teamInfo/:id", component: TeamInfoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
