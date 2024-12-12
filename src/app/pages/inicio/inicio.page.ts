import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Usuario } from 'src/app/model/usuario';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { APIClientService } from 'src/app/services/apiclient.service';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { LeerqrComponent } from 'src/app/components/leerqr/leerqr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { UsuariosComponent } from 'src/app/components/usuarios/usuarios.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonContent, UsuariosComponent, CommonModule, FormsModule, HeaderComponent, FooterComponent, TranslateModule, MisdatosComponent, ForoComponent, LeerqrComponent, MiclaseComponent
  ]
})
export class InicioPage implements OnInit {

  @ViewChild(FooterComponent) footer!: FooterComponent;
  usuario: Usuario | null = null;
  componente_actual = 'qr';

  constructor(private authService : AuthService,
     private translate: TranslateService,
     private api: APIClientService
  ) { 
    this.authService.componente_actual.subscribe((componente_actual => {
      this.componente_actual = componente_actual;
    }))
    this.authService.leerUsuarioAutenticado
  }

  async ngOnInit() {
    this.componente_actual = "";
    this.usuario = await this.authService.leerUsuarioAutenticado();
  }

  footerClick(button: string) {
    this.componente_actual = button;
    console.log(this.componente_actual)
  }

  changeComponent(name: string) {
    this.componente_actual = name;
    this.footer.componente_actual = name;
  }
}
