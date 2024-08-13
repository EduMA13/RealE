import { Injectable } from '@angular/core';
import { Property } from '../../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: Property[] = [];

  constructor() {}

  addFavorite(property: Property) {
    this.favorites.push(property);
  }

  removeFavorite(property: Property) {
    this.favorites = this.favorites.filter(fav => fav.id !== property.id);
  }

  isFavorite(property: Property): boolean {
    return this.favorites.some(fav => fav.id === property.id);
  }

  getFavorites(): Property[] {
    return this.favorites;
  }
}
