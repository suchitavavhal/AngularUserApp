import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { WinnersComponent } from './winners/winners.component';
import { ToppersComponent } from './toppers/toppers.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:"", redirectTo:"/welcome",pathMatch:'full'},
  {path:"welcome", component:WelcomeComponent, pathMatch: 'full',},
  {path:"users", component:UsersComponent},
  {path:"winners", component:WinnersComponent},
  {path: "toppers", component: ToppersComponent},
  {path:"**", component:PageNotFoundComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
