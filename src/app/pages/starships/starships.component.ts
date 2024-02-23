import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Starship } from './models';
import { StarshipsService } from '../../services/starships.service';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-starships',
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
    MatProgressSpinnerModule,
    MatPaginatorModule
    
  ],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.css'
})
export class StarshipsComponent implements OnInit {
  totalDeNaves!: number;
  isLoading: boolean = false;
  searchForm: FormGroup; 
  displayedColumns: string[] = ['name', 'model', 'manufacturer', 'class'];
  dataSource: Starship[] = [];

  constructor(private starshipService:StarshipsService, private fb: FormBuilder){
    this.searchForm = this.fb.group({
      search:['']
    })
  }

  ngOnInit(): void {
    this.isLoading = true; // Inicia o spinner
    this.starshipService.getStarships().subscribe({
      next: (data) => {
        this.dataSource = data.results;
        this.isLoading = false; // Finaliza o spinner após receber os dados
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false; // Finaliza o spinner em caso de erro
      },
    });
  }

  onSearch(): void {
    const query = this.searchForm.get('search')?.value;
    if (query) {
      this.isLoading = true; // Ativa o spinner antes da busca
      this.starshipService.searchStarships(query).subscribe({
        next: (data) => {
          this.dataSource = data.results;
          this.isLoading = false; // Desativa o spinner após receber os dados
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false; // Desativa o spinner em caso de erro
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
    this.starshipService.getStarships().subscribe({
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

  mudarPagina(event: PageEvent): void {
    this.isLoading = true;
    const pagina = event.pageIndex + 1; // O índice da página começa em 0
    this.starshipService.getStarships(pagina).subscribe({
      next: (data) => {
        this.dataSource = data.results;
        this.totalDeNaves = data.count; // Atualiza o total de naves com base na resposta
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }
}
