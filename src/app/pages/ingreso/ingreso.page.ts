import { HomePage } from './../home/home.page';
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
import { HeaderComponent } from "../../components/header/header.component";
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [
    CommonModule // CGV-Permite usar directivas comunes de Angular
    ,
    FormsModule // CGV-Permite usar formularios
    ,
    IonicModule // CGV-Permite usar componentes de Ionic como IonContent, IonItem, etc.
    ,
    TranslateModule // CGV-Permite usar pipe 'translate'
    ,
    LanguageComponent // CGV-Lista de idiomas
    ,
    HeaderComponent
]
})
export class IngresoPage {

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
    , private authService: AuthService
    , private dbService: DataBaseService
  ) 
  { 
    this.correo = 'atorres';
    this.password = '1234';
    this.language = "en";
    // Los iconos deben ser agregados a uno (ver en https://ionic.io/ionicons)
    addIcons({ colorWandOutline }); 

    this.imagenActual = '../../../assets/img/pao.jpg'; 
    this.imagenNueva = '../../../assets/img/esencia.jpeg'; 
    this.otraimagen = '../../../assets/img/NOCHE.jpg';
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

  ingresar_ruta() {
   this.router.navigate(['/home'])
  }

  ir_a_registro() {
    this.router.navigate(['/registrarme'])
   }

  cambiarImagen() {
    this.imagenActual = this.imagenActual === this.otraimagen ? '../../../assets/img/pao.jpg' : this.otraimagen;
    this.dbService.leerUsuarios();
    
  }
}
