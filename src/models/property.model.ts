export interface Property {
  id: number;
  title: string;
  address: string;
  price: string;
  description: string;
  image: string;
  exterior: string;
  general: string;
  recreation: string;
  houseid: string;
  internalkey: string;
  typehouse: string;
  sale: string;
  bedroom: number;
  bathroom: number;
  length: string;
  vendor: string;
  propertytype: string;
  status: string;
  descripcion: string;
  precio_en_anios: number;
  areas_verdes: number;
  detalles: string;
  tamano: 'grande' | 'pequeña';
  colonia: string;
  precio: number;
}