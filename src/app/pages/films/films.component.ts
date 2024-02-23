import { Component, OnInit } from '@angular/core';
import { Film } from './model';
import { FilmsService } from '../../services/films.service';
import {MatTableModule} from '@angular/material/table'
import { HeaderComponent } from '../../components/header/header.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [
    MatTableModule,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinner
  ],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css'
})
export class FilmsComponent implements OnInit{
  isLoading: boolean = false;
  searchForm: FormGroup; 
  displayedColumns: string[] = ['title', 'episode_id', 'director', 'producer' , 'release_date'];
  dataSource: Film[] = [];


  constructor(private filmService: FilmsService, private fb: FormBuilder){
    this.searchForm = this.fb.group({
      search:['']
    })
  }
  
  ngOnInit(): void {
    this.isLoading = true;
    this.filmService.getFilms().subscribe({
      next: (data) => {
        this.dataSource = data.results;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }
  
  onSearch(): void {
    const query = this.searchForm.get('search')?.value;
    if (query) {
      this.isLoading = true;
      this.filmService.searchFilms(query).subscribe({
        next: (data) => {
          this.dataSource = data.results;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        },
      });
    }
  }

  clearSearch(): void {
    // Limpa o campo de busca
    this.searchForm.reset();
    
    // Define isLoading como true para ativar o spinner
    this.isLoading = true;
    
    // Recarrega os dados originais da tabela
    this.filmService.getFilms().subscribe({
      next: (data) => {
        this.dataSource = data.results;
        // Desativa o spinner após receber os dados
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        // Desativa o spinner em caso de erro
        this.isLoading = false;
      },
    });
  }

}