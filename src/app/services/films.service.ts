import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmsApiResponse } from '../pages/films/model';


@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  private apiUrl: string = 'https://swapi.dev/api/films/';

  constructor(private http: HttpClient) {}

  getFilms(): Observable<FilmsApiResponse>{
    return this.http.get<FilmsApiResponse>(this.apiUrl);
  }

  searchFilms(query: string): Observable<FilmsApiResponse> {
    const params = new HttpParams().set('search', query);
    return this.http.get<FilmsApiResponse>(this.apiUrl, { params });
  }
}
