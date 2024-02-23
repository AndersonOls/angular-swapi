import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FilmsComponent } from './pages/films/films.component';
import { StarshipsComponent } from './pages/starships/starships.component';


export const routes: Routes = [
    {'path': '', component:HomeComponent},
    {'path': 'films', component:FilmsComponent},
    {'path': 'starships', component:StarshipsComponent}
    
];
