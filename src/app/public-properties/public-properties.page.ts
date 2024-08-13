import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-public-properties',
  templateUrl: './public-properties.page.html',
  styleUrls: ['./public-properties.page.scss'],
})
export class PublicPropertiesPage implements OnInit {
  properties: any[] = [];

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.propertyService.properties$.subscribe(properties => {
      this.properties = properties;
    });
  }

  ionViewWillEnter() {
    this.propertyService.refreshProperties();
  }

  loadProperties() {
    this.propertyService.getAllProperties().subscribe(
      (data) => {
        this.properties = data;
      },
      (error) => {
        console.error('Error fetching properties', error);
      }
    );
  }

  editProperty(id: number) {
    this.router.navigate(['/publicar', id]);
  }

  async deleteProperty(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta propiedad?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.propertyService.deleteProperty(id).subscribe(
              () => {
                this.presentToast('Propiedad eliminada con éxito');
              },
              error => {
                console.error('Error deleting property', error);
                this.presentToast('Error al eliminar la propiedad');
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  addProperty() {
    this.router.navigate(['/publicar']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  refreshProperties() {
    // Este método se puede llamar manualmente para actualizar la lista
    this.loadProperties();
  }
  
}