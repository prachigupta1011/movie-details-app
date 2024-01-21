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

  //Function to fetch movies
  fetchMovies() {
    this.homeApiService.getMovies().subscribe(
      (data: Home[]) => {
        this.titleData = data;
        if (data && data.length > 0) {
          this.selectTitle(data[0]); // Select the first title by default
        }
      },
      error => console.error('Error fetching movies:', error)
    );
  }

  // Function to filter movies by title
  filterMoviesByTitle(data:any) {
    if(data){
      this.filteredMovies = data.movies;
    }
  }

  // Function to select a title from the side navigation
  selectTitle(title: Home) {
    this.selectedTitle = title;
    this.filteredMovies = title ? title.movies : [];
  }

}
