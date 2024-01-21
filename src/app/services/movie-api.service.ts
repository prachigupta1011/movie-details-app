import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  private apiUrl = 'https://movies-api14.p.rapidapi.com';
  private headers = new HttpHeaders({
    'x-rapidapi-key': '61dad71be5msh57ec8350eb71e53p134a11jsn687b7978fe70',
    'x-rapidapi-host': 'movies-api14.p.rapidapi.com'
  });

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/movies', { headers: this.headers });
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get<Movie>(`${this.apiUrl}/movie/${id}`, { headers: this.headers });
  }
}
