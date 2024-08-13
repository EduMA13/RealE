// src/app/services/property.service.ts

import { Injectable } from '@angular/core';
import { Property } from '../../models/property.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://127.0.0.1:5000/properties';
  private propertiesSubject = new BehaviorSubject<Property[]>([]);
  public properties$ = this.propertiesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAllProperties();
   }

   private loadAllProperties() {
    this.http.get<Property[]>(this.apiUrl).subscribe(
      properties => this.propertiesSubject.next(properties),
      error => console.error('Error loading properties', error)
    );
  }

  getAllProperties(): Observable<Property[]> {
    return this.properties$;
  }
  
  getPropertyById(id: number): Observable<Property | undefined> {
    return this.properties$.pipe(
      map(properties => properties.find(p => p.id === id))
    );
  }

  getPropertyPrediction(id: number): Observable<any> {
    // Usa la URL base y agrega '/predict' al final
    return this.http.get<any>(`${this.apiUrl}/predict`, { params: { id: id.toString() } });
  }

  addProperty(property: Property): Observable<Property> {
    return this.http.post<Property>(this.apiUrl, property).pipe(
      tap(newProperty => {
        const currentProperties = this.propertiesSubject.value;
        this.propertiesSubject.next([...currentProperties, newProperty]);
      })
    );
  }

  updateProperty(id: number, updatedProperty: Partial<Property>): Observable<Property> {
    return this.http.put<Property>(`${this.apiUrl}/${id}`, updatedProperty).pipe(
      tap(updatedProp => {
        const currentProperties = this.propertiesSubject.value;
        const updatedProperties = currentProperties.map(prop => 
          prop.id === id ? {...prop, ...updatedProp} : prop
        );
        this.propertiesSubject.next(updatedProperties);
      })
    );
  }

  deleteProperty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentProperties = this.propertiesSubject.value;
        this.propertiesSubject.next(currentProperties.filter(p => p.id !== id));
      })
    );
  }


  getCart(): any[] {
    return JSON.parse(localStorage.getItem('cart')!) || [];
  }
  
  refreshProperties() {
    this.loadAllProperties();
  }

}
