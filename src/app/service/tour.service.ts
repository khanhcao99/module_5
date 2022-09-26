import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tour} from "../model/tour";

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private httpClient: HttpClient) {
  }

  findAllTour(): Observable<Tour[]>{
    return this.httpClient.get<Tour[]>("http://localhost:3000/tuors")
  }

  getTourById(id?: number): Observable<Tour>{
    return this.httpClient.get<Tour>("http://localhost:3000/tuors/" + id)
  }

  createTour(tour?: Tour): Observable<Tour>{
    return this.httpClient.post<Tour>("http://localhost:3000/tuors", tour)
  }

  updateTour(id?:number, tour?: Tour): Observable<Tour>{
    return this.httpClient.put<Tour>("http://localhost:3000/tuors/" + id, tour)
  }

  deleteTour(id?: number): Observable<Tour>{
    return this.httpClient.delete("http://localhost:3000/tuors/" + id)
  }

}
