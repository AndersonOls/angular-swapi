import { Component, Input, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatIconModule,
    MatButtonModule, 
    MatSidenavModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  constructor(){}

  @Input() 
  titulo:string = ""
  
  ngOnInit(): void {
    
  }

}
