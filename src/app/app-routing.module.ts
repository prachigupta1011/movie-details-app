import { NgModule } from '@angular/core';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'movies', component: MovieListComponent },
    { path: 'movie/:id', component: MovieDetailComponent },
    { path: '', redirectTo: '/movies', pathMatch: 'full' }, 
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
