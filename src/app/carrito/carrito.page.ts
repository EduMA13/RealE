import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/carrito.service'
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  cartProperties: Property[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartProperties = this.cartService.getCartItems();
  }

  removeFromCart(propertyId: number) {
    this.cartService.removeFromCart(propertyId);
    this.loadCartItems();
  }
}