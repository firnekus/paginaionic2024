import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { APIClientService } from 'src/app/services/apiclient.service';
import { MisdatosComponent } from '../misdatos/misdatos.component';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
      CommonModule    // CGV-Permite usar directivas comunes de Angular
    , FormsModule     // CGV-Permite usar formularios
    , IonicModule     // CGV-Permite usar componentes de Ionic como IonContent, IonItem, etc.
    , TranslateModule // CGV-Permite usar pipe 'translate'
    , MisdatosComponent
  ]
})
export class FooterComponent  {
  usuario: Usuario
  componente_actual = 'qr';
  @Output() footerClick = new EventEmitter<string>();

  constructor(private authService : AuthService,
    private router: Router
,    private api: APIClientService) 
  {
    this.usuario = new Usuario();
    this.authService.leerUsuarioAutenticado().then(usuario => {
      if (usuario) {
        this.usuario = usuario;
      }
      
    })
  
  }

  navegar(pagina: string) {
    this.router.navigate([pagina]);
  }

  convertirAFecha(cuestion: number) {
    
  }

  cambiarComponente($event: any) {
    this.componente_actual = $event.detail.value;
    this.authService.componente_actual.next(this.componente_actual)
  }


}
