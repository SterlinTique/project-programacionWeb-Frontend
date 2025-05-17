import { Route } from '@angular/router';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { AuthGuard } from '@core/guard/auth.guard';

export const APP_ROUTE: Route[] = [ //APP_ROUTE arreglo de tipo route
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard], // solo permite el accesso si el guardia lo permite
    children: [
      {
        path: 'dashboard', // el enrutamiento de nuestra pagina principal 
        loadChildren: () => // Importar la ruta de donde se encuentra nuestra pagina 
          import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTE), // se importa dinamicamente
      },
      {
        path: 'page', // Enrumtamiento para  la parte de pages, o sea paginas segundarias
        loadChildren: () =>
          import('./pages/pages.routes').then(
            (m) => m.PAGES_ROUTE
          ),
      }
    ],
  },
  {
    path: 'authentication', // Ruta para la autenticación
    loadChildren: () =>
      import('./authentication/auth.routes').then((m) => m.AUTH_ROUTE),
  },
];

// Aquí se encuentran las rutas globales 