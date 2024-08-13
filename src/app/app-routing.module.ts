import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'description',
    loadChildren: () => import('./description/description.module').then( m => m.DescriptionPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'publicar',
    loadChildren: () => import('./publicar/publicar.module').then( m => m.PublicarPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'description/:id',
    loadChildren: () => import('./description/description.module').then(m => m.DescriptionPageModule)
  },
  {
    path: 'public-properties',
    loadChildren: () => import('./public-properties/public-properties.module').then( m => m.PublicPropertiesPageModule)
  },
  
  {
    path: 'publicar',
    loadChildren: () => import('./publicar/publicar.module').then(m => m.PublicarPageModule)
  },
  {
    path: 'publicar/:id',
    loadChildren: () => import('./publicar/publicar.module').then(m => m.PublicarPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
