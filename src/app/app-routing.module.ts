import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CharactersComponent } from './components/characters/characters.component';
import { SingleCharacterComponent } from './components/single-character/single-character.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'characters', component: CharactersComponent},
  {path: 'characters/details/:id', component: SingleCharacterComponent},
  {path: 'error', component: ErrorComponent},
  {path: '**', pathMatch: 'full', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
