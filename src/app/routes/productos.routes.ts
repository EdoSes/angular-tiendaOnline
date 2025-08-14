import { Route } from '@angular/router';

import {
  ProdGaleriaComponent,
} from '../components/producto/prod-galeria/prod-galeria.component';
import {
  ProdImagenesComponent,
} from '../components/producto/prod-imagenes/prod-imagenes.component';
import {
  ProdListaComponent,
} from '../components/producto/prod-lista/prod-lista.component';
import {
  ProdVistaComponent,
} from '../components/producto/prod-vista/prod-vista.component';

export const productosRoutes: Route[] = [
  { path: 'productos/lista', component: ProdListaComponent },
  { path: 'productos/edit', component: ProdVistaComponent },
  { path: 'productos/imagen', component: ProdImagenesComponent },
  { path: 'productos/galeria', component: ProdGaleriaComponent }
];