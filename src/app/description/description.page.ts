import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { FavoritesService } from '../services/favorites.service';
import { Property } from '../../models/property.model';
import { CartService } from '../services/carrito.service';
import { NotificationComponent } from '../notification/notification.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {
  property: Property | undefined;
  prediction: any;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private favoritesService: FavoritesService,
    private cartService: CartService,
    private modalController: ModalController
  ) {}
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const propertyId = parseInt(id, 10);
        this.loadPropertyDetails(propertyId);
        this.loadPropertyPrediction(propertyId);
      } else {
        console.error('No se encontró el ID de la propiedad en la URL.');
      }
    });
  }

  loadPropertyDetails(id: number) {
    this.propertyService.getPropertyById(id).subscribe(
      (propertyData: Property | undefined) => {
        if (propertyData) {
          console.log('Datos de la propiedad:', propertyData);
          this.property = propertyData;
        } else {
          console.error('Propiedad no encontrada');
        }
      },
      (error) => {
        console.error('Error al obtener la propiedad:', error);
      }
    );
  }

  loadPropertyPrediction(id: number) {
    this.propertyService.getPropertyPrediction(id).subscribe(
      (predictionData) => {
        console.log('Datos de la predicción:', predictionData);
        this.prediction = predictionData;
      },
      (error) => {
        console.error('Error al obtener la predicción:', error);
      }
    );
  }

  async addToCart(property: Property) {
    if (!property) {
      console.error('Property is undefined');
      return;
    }
    
    this.cartService.addToCart(property);
  
    const modal = await this.modalController.create({
      component: NotificationComponent,
      componentProps: { message: 'Agregado al carrito' },
      cssClass: 'notification-modal'
    });
  
    await modal.present();
  }

  toggleFavorite() {
    if (this.property) {
      if (this.isFavorite()) {
        this.favoritesService.removeFavorite(this.property);
      } else {
        this.favoritesService.addFavorite(this.property);
      }
    }
  }

  isFavorite(): boolean {
    return this.property ? this.favoritesService.isFavorite(this.property) : false;
  }
}