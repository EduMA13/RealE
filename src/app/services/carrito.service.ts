import { Injectable } from '@angular/core';
import { Property } from '../../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_KEY = 'cart';

  constructor() { }

  addToCart(property: Property) {
    const cart = this.getCartItems();
    cart.push(property);
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  getCartItems(): Property[] {
    const cartJson = localStorage.getItem(this.CART_KEY);
    return cartJson ? JSON.parse(cartJson) : [];
  }

  removeFromCart(propertyId: number) {
    const cart = this.getCartItems().filter(item => item.id !== propertyId);
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  clearCart() {
    localStorage.removeItem(this.CART_KEY);
  }
}