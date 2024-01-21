import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Home } from '../models/home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeApiService {
  private apiUrl = 'https://movies-api14.p.rapidapi.com/home';
  favoriteMovies: any[] = [];
  favoriteMoviesCount: number = 0;

  constructor(private http: HttpClient) {}

  // Fetch movies from the API
  getMovies(): Observable<any> {
    return this.http.get<any>(this.apiUrl, {
      headers: {
        'x-rapidapi-key': '61dad71be5msh57ec8350eb71e53p134a11jsn687b7978fe70',
        'x-rapidapi-host': 'movies-api14.p.rapidapi.com'
      }
    });
  }

  addToFavourite(movie:any){
    this.favoriteMovies.push(movie);
    this.favoriteMoviesCount = this.favoriteMovies.length;
  }

  removeFavorite(index:any){
    this.favoriteMovies.splice(index, 1);
    this.favoriteMoviesCount = this.favoriteMovies.length;
  }

}
