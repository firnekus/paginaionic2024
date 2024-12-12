import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC } from 'src/app/tools/message-routines';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [      
    CommonModule    // CGV-Permite usar directivas comunes de Angular
    , FormsModule     // CGV-Permite usar formularios
    , IonicModule     // CGV-Permite usar componentes de Ionic como IonContent, IonItem, etc.
    , TranslateModule // CGV-Permite usar pipe 'translate'
    ]

    }
)
export class UsuariosComponent {
  public usuarios: any;
  constructor(
    private authService : AuthService,
    private router: Router,
    private dbService: DataBaseService
  ) 
  
  { 
    this.conseguirLista()
  }

  public conseguirLista() {
    this.dbService.getAllUsuarios().then(usuarios => {
      if (usuarios) {
        this.usuarios = usuarios
        console.log(this.usuarios)
      }
    })
  }
  async matarUsuario(usuario: Usuario) {
    await this.dbService.eliminarUsuarioUsandoCorreo(usuario.correo)
    await this.dbService.getAllUsuarios().then(usuarios => {
      if (usuarios) {
        this.usuarios = usuarios
        showAlertDUOC("Usuario ha sido destruido.")
        console.log(this.usuarios)
      }
    })
  }

}
