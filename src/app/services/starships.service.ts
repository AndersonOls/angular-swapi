import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StarshipApiResponse } from '../pages/starships/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarshipsService {
  private apiUrl = 'https://swapi.dev/api/starships/'

  constructor(private http:HttpClient) { }

  getStarships(page: number = 1): Observable<StarshipApiResponse> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<StarshipApiResponse>(this.apiUrl, { params });
  }


  searchStarships(query: string): Observable<StarshipApiResponse> {
    const params = new HttpParams().set('search', query);
    return this.http.get<StarshipApiResponse>(this.apiUrl, { params });
  }
}
