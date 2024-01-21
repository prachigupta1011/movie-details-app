import { Component, Input } from '@angular/core';
import { HomeApiService } from '../../services/home-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title: string | undefined;

  constructor(public homeApiService: HomeApiService) {}

}
