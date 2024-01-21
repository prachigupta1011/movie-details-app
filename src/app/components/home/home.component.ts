import { Component, OnInit } from '@angular/core';
import { HomeApiService } from '../../services/home-api.service';
import { Home } from '../../models/home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  titleData: Home[] = [];
  selectedGenre: string = '';
  selectedTitle: Home | null = null; 
  filteredMovies: any[] = []; 

  constructor(public homeApiService: HomeApiService) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies() {
    this.homeApiService.getMovies().subscribe(
      (data: any) => {
        this.titleData = data;
        this.filteredMovies = data;
        this.selectedTitle = data[0].title;
        this.filterMoviesByTitle(this.selectedTitle);
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  filterMoviesByTitle(data:any) {
    if(data){
      this.filteredMovies = data.movies;
    }
  }

  // Function to select a title from the side navigation
  selectTitle(title: Home) {
    this.selectedTitle = title;
    this.filterMoviesByTitle(this.selectedTitle);
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
