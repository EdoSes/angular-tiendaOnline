import { Route } from '@angular/router';

import { coreRoutes } from './core.routes';
import { pedidosRoutes } from './pedidos.routes';
import { productosRoutes } from './productos.routes';

export const appRoutes: Route[] = [
  ...coreRoutes,
  ...productosRoutes,
  ...pedidosRoutes,
  { path: '', redirectTo: 'productos/galeria', pathMatch: 'full' },
  { path: '**', redirectTo: 'productos/galeria' }
];