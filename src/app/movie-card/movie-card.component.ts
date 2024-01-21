import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../models/movie.model';
import { HomeApiService } from '../services/home-api.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie: any;
  @Input() isFavourite: any;
  @Output() favoriteToggle = new EventEmitter<Movie>();

  constructor(public homeApiService: HomeApiService) {}

  onFavoriteToggle() {
    this.favoriteToggle.emit(this.movie);
  }

  // Function to check if a movie is in favorites
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
    const index = this.homeApiService.favoriteMovies.findIndex(favMovie => favMovie.title === movie.title);
    if (index !== -1) {
      this.homeApiService.removeFavorite(index);
    }
  }
}
