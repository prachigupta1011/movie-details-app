import { Component } from '@angular/core';
import { HomeApiService } from '../services/home-api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  // Define an array to store favorite movies
  favoriteMovies: any[] = [];

  constructor(public homeApiService: HomeApiService) {}

  ngOnInit(): void {
    this.favoriteMovies = this.homeApiService.favoriteMovies;
  }

  // Function to remove a movie from favorites
  removeFavorite(movie: any): void {
    const index = this.homeApiService.favoriteMovies.findIndex(favMovie => favMovie.title === movie.title);
    if (index !== -1) {
      this.homeApiService.removeFavorite(index);
    }
  }
}
