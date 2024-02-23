import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FilmsComponent } from './pages/films/films.component';
import { HeaderComponent } from './components/header/header.component';
import { StarshipsComponent } from './pages/starships/starships.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HomeComponent,
    FilmsComponent,
    StarshipsComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-star-wars';
}
