import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from '../services/property.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})
export class PublicarPage implements OnInit {
  propertyForm!: FormGroup;
  isEditMode = false;
  propertyId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private propertyService: PropertyService,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.propertyForm = this.formBuilder.group({
      title: ['', Validators.required],
      address: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      exterior: [''],
      general: [''],
      recreation: [''],
      houseid: ['', Validators.required],
      internalkey: [''],
      typehouse: [''],
      sale: ['', Validators.required],
      bedroom: [null, [Validators.required, Validators.min(0)]],
      bathroom: [null, [Validators.required, Validators.min(0)]],
      length: [''],
      vendor: [''],
      propertytype: [''],
      status: [''],
      descripcion: [''],
      precio_en_anios: [null, [Validators.min(0)]],
      areas_verdes: [null, [Validators.min(0)]],
      detalles: [''],
      tamano: [''],
      colonia: [''],
      precio: [null, [Validators.required, Validators.min(0)]]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.propertyId = +id;
        this.loadPropertyData(this.propertyId);
      }
    });
  }

  loadPropertyData(id: number) {
    this.propertyService.getPropertyById(id).subscribe(
      (property: Property | undefined) => {
        if (property) {
          this.propertyForm.patchValue(property);
        } else {
          console.error('Property not found');
        }
      },
      (error: any) => {
        console.error('Error loading property', error);
      }
    );
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      if (this.isEditMode && this.propertyId) {
        // Actualizar propiedad existente
        this.propertyService.updateProperty(this.propertyId, this.propertyForm.value).subscribe(
          updatedProperty => {
            console.log('Propiedad actualizada:', updatedProperty);
            this.presentToast('Propiedad actualizada con éxito');
            this.router.navigate(['/public-properties']);
          },
          error => {
            console.error('Error al actualizar la propiedad:', error);
            this.presentToast('Error al actualizar la propiedad');
          }
        );
      } 
      else {
        this.propertyService.addProperty(this.propertyForm.value).subscribe(
          response => {
            console.log('Propiedad agregada', response);
            this.presentToast('Propiedad publicada con éxito');
            this.router.navigate(['/public-properties']);
          },
          error => {
            console.error('Error adding property', error);
            this.presentToast('Error al publicar la propiedad');
          }
        );
      }
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}