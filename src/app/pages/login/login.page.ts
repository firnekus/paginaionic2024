import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewWillEnter } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { Router } from '@angular/router';
import { colorWandOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
      CommonModule            // CGV-Permite usar directivas comunes de Angular
    , FormsModule             // CGV-Permite usar formularios
    , IonicModule             // CGV-Permite usar componentes de Ionic como IonContent, IonItem, etc.
    , TranslateModule         // CGV-Permite usar pipe 'translate'
    , LanguageComponent       // CGV-Lista de idiomas
  ]
})
export class LoginPage implements ViewWillEnter {

  @ViewChild('selectLanguage') selectLanguage!: LanguageComponent;

  language: string;
  correo: string;
  password: string;

  imagenActual: string;
  imagenNueva: string;
  otraimagen: string;

  constructor(
      private router: Router
    , private translate: TranslateService
    , private authService: AuthService) 
  { 
    this.correo = 'atorres';
    this.password = '1234';
    this.language = "en";
    // Los iconos deben ser agregados a uno (ver en https://ionic.io/ionicons)
    addIcons({ colorWandOutline }); 
    
    this.imagenActual = '../../../assets/images/pao.jpg'; 
    this.imagenNueva = '../../../assets/images/esencia.jpeg'; 
    this.otraimagen = '../../../assets/images/NOCHE.jpg';
  }

  async ionViewWillEnter() {
    this.selectLanguage.setCurrentLanguage();
  }

  navigateTheme() {
    this.router.navigate(['/theme']);
  }

  login() {
    this.authService.login(this.correo, this.password);
  }

  recuperacion() {
    this.router.navigate(['/correo']);
  }
  
  changeTheme(event: any) {
    this.language = event.detail.value;
    document.body.setAttribute('lang', this.language);
  }

  ingresar() {
    this.authService.login(this.correo, this.password);
  }

  cambiarImagen() {
    this.imagenActual = this.imagenActual === this.otraimagen ? '../../../assets/images/pao.jpg' : this.otraimagen;
  }
}
