import { Route } from '@angular/router';

import { authGuard } from '../auth.guard';
import {
  NavUserComponent,
} from '../components/navegation/nav-user/nav-user.component';
import {
  TarjetasComponent,
} from '../components/plataformas/tarjetas/tarjetas.component';
import {
  ProtectedComponent,
} from '../components/protected/protected.component';
import { StepperComponent } from '../components/stepper/stepper.component';
import { UsuariosComponent } from '../components/usuarios/usuarios.component';
import { VentasComponent } from '../components/ventas/ventas.component';

export const coreRoutes: Route[] = [
  { path: 'protected', component: ProtectedComponent, canActivate: [authGuard] },
  { path: 'navegacion/barra', component: NavUserComponent },
  { path: 'stepper', component: StepperComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'plataformas/tarjetas', component: TarjetasComponent },
  { path: 'ventas', component: VentasComponent }
];