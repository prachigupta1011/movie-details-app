import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieApiService } from '../../services/movie-api.service';
import { HomeApiService } from '../../services/home-api.service';

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
  selectedSortBy: string = ''; 

  constructor(
    private movieService: MovieApiService,
    private homeApiService: HomeApiService
  ) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data.movies;
      this.filteredMovies = this.movies;
      this.extractGenres();
    });
  }

  searchMovies() {
    this.filteredMovies = this.searchTerm
      ? this.movies.filter(m => m.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
      : this.movies;
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
        movie.genres.includes(this.selectedGenre)
      );
    } else {
      this.filteredMovies = this.movies;
    }
  }

  sortMovies() {
    if (this.selectedSortBy === 'title') {
      this.filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.selectedSortBy === 'release_date') {
      this.filteredMovies.sort((a, b) => a.release_date.localeCompare(b.release_date));
    }
  }

  isFavorite(movie: any): boolean {
    return this.homeApiService.favoriteMovies.some(favMovie => favMovie.title === movie.title);
  }

  // Function to toggle favorite status
  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie)) {
      this.removeFavorite(movie);
    } else {
      this.homeApiService.addToFavourite(movie);
    }
  }

  // Function to remove a movie from favorites
  removeFavorite(movie: any): void {
    const index = this.homeApiService.favoriteMovies.findIndex(
      favMovie => favMovie.title === movie.title
    );
    if (index !== -1) {
      this.homeApiService.removeFavorite(index);
    }
  }
}
