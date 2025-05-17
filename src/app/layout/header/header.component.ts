// Importa las bibliotecas y servicios necesarios 
import { DOCUMENT, NgClass } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConfigService } from '@config';
import { InConfiguration, AuthService } from '@core';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [ // Importa los componentes y módulos que son los mismo del inicio 
    RouterLink,
    NgClass,
    MatButtonModule,
    MatMenuModule,
    FeatherIconsComponent,
  ],
})
export class HeaderComponent implements OnInit {
  public config!: InConfiguration;  // Configuración de la aplicación
  isNavbarCollapsed = true;
  isOpenSidebar?: boolean; // Indica si la barra lateral está abierta
  docElement?: HTMLElement;
  isFullScreen = false;
  constructor( // Constructor donde se inyecta enrutador y servcios 
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly renderer: Renderer2,
    public readonly elementRef: ElementRef,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.userLogged = this.authService.getAuthFromSessionStorage().nombre; // Obtiene el nombre del usuario conectado
  }

  userLogged: string | undefined = ''; // Nombre del usuario conectado
  
  ngOnInit() { // Se ejecuta una sola vez cuando inicia el programa
    this.config = this.configService.configData; // Obtiene la configuración de la aplicación
    this.docElement = document.documentElement; // Permite el acceso al Doc para manipular todo el HTML
  }

  // Método para poner la pantalla en modo completa
  callFullscreen() {
    if (!this.isFullScreen) {
      if (this.docElement?.requestFullscreen != null) {
        this.docElement?.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;
  }
  // Método que abre o cierra la barra lateral
  mobileMenuSidebarOpen(event: Event, className: string) {
    const hasClass = (event.target as HTMLInputElement).classList.contains(
      className
    );
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains('side-closed');
    if (hasClass) {
      this.renderer.removeClass(this.document.body, 'side-closed');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
      localStorage.setItem('collapsed_menu', 'false');
    } else {
      this.renderer.addClass(this.document.body, 'side-closed');
      this.renderer.addClass(this.document.body, 'submenu-closed');
      localStorage.setItem('collapsed_menu', 'true');
    }
  }

   // Método que cierra la sesión del usuario conectado
  logout() {
    this.authService.logout(); // Va ha redirigir a lugar que queramoss
  }
}
