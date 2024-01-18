import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiService } from '../../services/movie-api.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie?: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieApiService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieDetails(+id).subscribe(data => {
        this.movie = data;
      }, error => {
        console.error('Error fetching movie details:', error);
      });
    } else {
      console.error('Movie ID is not available');
    }
  }
}
