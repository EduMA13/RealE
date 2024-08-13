import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favorites: any[] = [];

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.favorites = this.favoritesService.getFavorites();
  }

  removeFavorite(property: Property) {
    this.favoritesService.removeFavorite(property);
    this.favorites = this.favoritesService.getFavorites();
  }
}
