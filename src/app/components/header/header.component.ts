import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule, AnimationController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { logOutOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LanguageComponent } from '../language/language.component';
import { Subscription } from 'rxjs'; // Importamos para manejar la suscripción
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    LanguageComponent
  ]
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  colorTheme: string = ''; // Variable para el tema
  titleFontSize: string = '1.5rem'; // Tamaño de fuente por defecto
  isLoggedIn: boolean = false; // Variable para saber si el usuario está logueado
  private authSubscription!: Subscription; // Suscripción para manejar el estado de autenticación
  private themeSubscription!: Subscription; // Suscripción para manejar el color del tema

  @ViewChild('animatedTitle', { static: false }) animatedTitle!: ElementRef; // Referencia al título del header
  @ViewChild('selectLanguage') selectLanguage!: LanguageComponent;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private router: Router,
    private animationController: AnimationController
  ) {
    addIcons({ logOutOutline });

    // Suscripción al estado de autenticación
    this.authService.leerUsuarioAutenticado().then((usuario: Usuario | null) => {
      if (usuario) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    });

    // Suscripción al cambio de color de tema
    this.themeSubscription = this.authService.colorTheme.subscribe((colorTheme => {
      this.colorTheme = colorTheme;
      document.body.setAttribute('color-theme', this.colorTheme); // Actualiza el tema en el body
    }));
  }

  ngAfterViewInit() {
    this.animateTitle(); // Llama al método de animación después de que la vista se haya inicializado
  }

  ngOnDestroy() {
    // Aseguramos que las suscripciones se desuscriban cuando el componente se destruya
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustTitleFontSize();
  }


  private adjustTitleFontSize() {
    const width = window.innerWidth;
    if (width < 768) { // Si es vista móvil
      this.titleFontSize = '1.0rem'; // Tamaño de fuente más pequeño
    } else {
      this.titleFontSize = '1.5rem'; // Tamaño de fuente por defecto
    }
  }

  private animateTitle() {
    const animation = this.animationController
      .create()
      .addElement(this.animatedTitle.nativeElement)
      .iterations(Infinity) // La animación se repetirá infinitamente
      .duration(6000) // La animación dura 6 segundos por ciclo
      .fromTo('transform', 'translateX(%)', 'translateX(95%)') // Movimiento de izquierda a derecha
      .fromTo('opacity', 0.2, 1); // Transición de opacidad (de 0.2 a 1)

    animation.play(); // Inicia la animación
  }

  // Navegar a la página de tema
  navigateTheme() {
    this.router.navigate(['/theme']);
  }

  // Método para hacer logout
  logout() {
    this.authService.logout()
  
  }}