import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent {
  location: string = 'Durango';
  propertyType: string = '';
  minPrice: number = 0;
  maxPrice: number = 0;

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  applyFilters() {
    this.modalController.dismiss({
      applied: true,
      filters: {
        location: this.location,
        propertyType: this.propertyType,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice
      }
    });
  }

  clearFilters() {
    this.location = '';
    this.propertyType = '';
    this.minPrice = 0;
    this.maxPrice = 0;
    
    // Opcionalmente, puedes aplicar los filtros borrados inmediatamente
    this.applyFilters();
  }

  selectPropertyType(type: string) {
    this.propertyType = this.propertyType === type ? '' : type;
  }

  hasActiveFilters(): boolean {
    return this.location !== '' || 
           this.propertyType !== '' || 
           this.minPrice !== null || 
           this.maxPrice !== null;
  }

  
}
