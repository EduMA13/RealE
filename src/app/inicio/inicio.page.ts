import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FavoritesPage } from '../favorites/favorites.page';
import { FilterModalComponent } from '../filter-modal/filter-modal.component';
import { Property } from '../../models/property.model';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  filteredItems: string[] = [];
  searchQuery: string = '';
  currentFilters: any = {};
  isAccordionOpen = false;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.filteredItems = this.items;

    this.loadProperties();
  }

  ionViewWillEnter() {
    this.loadProperties();
  }

  loadProperties() {
    this.propertyService.getAllProperties().subscribe(
      (propertiesData: Property[]) => {
        console.log('Propiedades recibidas:', propertiesData);
        this.properties = propertiesData;
        this.filteredProperties = this.properties;
      },
      (error) => {
        console.error('Error al cargar las propiedades:', error);
      }
    );
  }

  toggleAccordion() {
    this.isAccordionOpen = !this.isAccordionOpen;
  }

  navigateTo(page: string, id?: number) {
    this.isAccordionOpen = false;
    if (id !== undefined) {
      this.router.navigate([`/${page}`, id]); 
    } else {
      this.router.navigate([`/${page}`]);
    }
  }

  filterItems(event: any) {
    this.searchQuery = event.target.value.toLowerCase();
    this.applyFiltersAndSearch();
  }

  async openFilterModal() {
    const modal = await this.modalController.create({
      component: FilterModalComponent,
    });

    modal.onDidDismiss().then((data) => {
      if (data.data && data.data.applied) {
        this.currentFilters = data.data.filters;
        this.applyFiltersAndSearch();
      }
    });

    return await modal.present();
  }

  applyFiltersAndSearch() {
    this.filteredProperties = this.properties.filter(property => {
      let matchesFilter = true;
      let matchesSearch = true;

      // Aplicar filtros
      if (this.currentFilters.location && !property.address.toLowerCase().includes(this.currentFilters.location.toLowerCase())) {
        matchesFilter = false;
      }

      if (this.currentFilters.propertyType && property.propertytype !== this.currentFilters.propertyType) {
        matchesFilter = false;
      }

      const propertyPrice = parseFloat(property.price.replace(/[^0-9.-]+/g,""));
      if (this.currentFilters.minPrice && propertyPrice < this.currentFilters.minPrice) {
        matchesFilter = false;
      }
      if (this.currentFilters.maxPrice && propertyPrice > this.currentFilters.maxPrice) {
        matchesFilter = false;
      }

      // Aplicar búsqueda
      if (this.searchQuery.trim() !== '') {
        matchesSearch = 
          property.title.toLowerCase().includes(this.searchQuery) ||
          property.address.toLowerCase().includes(this.searchQuery) ||
          property.status.toLowerCase().includes(this.searchQuery) ||
          property.price.toLowerCase().includes(this.searchQuery);
      }

      if (Object.values(this.currentFilters).every(v => v === '' || v === null)) {
        this.filteredProperties = this.properties;
        return;
      }

      return matchesFilter && matchesSearch;
    });
  }


}
