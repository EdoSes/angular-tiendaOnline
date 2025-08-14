import { Route } from '@angular/router';

import {
  ConfirmComponent,
} from '../components/pedido/confirm/confirm.component';
import {
  PedVistaComponent,
} from '../components/pedido/ped-vista/ped-vista.component';
import {
  PedidoClienteComponent,
} from '../components/pedido/pedido-cliente/pedido-cliente.component';
import {
  ShippingComponent,
} from '../components/pedido/shipping/shipping.component';

export const pedidosRoutes: Route[] = [
  { path: 'pedidos/cliente', component: PedidoClienteComponent },
  { path: 'pedidos/vista', component: PedVistaComponent },
  { path: 'pedidos/confirm', component: ConfirmComponent },
  { path: 'pedidos/shipping', component: ShippingComponent }
];

