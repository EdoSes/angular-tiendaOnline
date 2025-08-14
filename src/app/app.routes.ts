// src/app/routes/app.routes.ts

import { Route } from '@angular/router';

import { coreRoutes } from './routes/core.routes';
import { pedidosRoutes } from './routes/pedidos.routes';
import { productosRoutes } from './routes/productos.routes';

export const appRoutes: Route[] = [
  ...coreRoutes,
  ...productosRoutes,
  ...pedidosRoutes,
  { path: '', redirectTo: 'productos/galeria', pathMatch: 'full' },
  { path: '**', redirectTo: 'productos/galeria' }
];
