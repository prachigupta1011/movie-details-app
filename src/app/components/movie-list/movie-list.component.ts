import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieApiService } from '../../services/movie-api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchTerm: string = '';
  genres: Set<string> = new Set();
  selectedGenre: string = '';

  constructor(private movieService: MovieApiService) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data.movies;
      this.filteredMovies = this.movies;
      this.extractGenres();
    });
  }

  searchMovies() {
    this.filteredMovies = this.searchTerm ? 
      this.movies.filter(m => m.title.toLowerCase().includes(this.searchTerm.toLowerCase())) : 
      this.movies;
  }

  get genresArray(): string[] {
    return Array.from(this.genres);
  }
  
  extractGenres() {
    this.movies.forEach(movie => {
      movie.genres.forEach(genre => {
        this.genres.add(genre);
      });
    });
  }

  filterMoviesByGenre() {
    if (this.selectedGenre) {
      this.filteredMovies = this.movies.filter(movie => 
        movie.genres.includes(this.selectedGenre));
    } else {
      this.filteredMovies = this.movies;
    }
  }
}
