import { Component, forwardRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonButton, IonCard, IonItem, IonCardTitle, IonCardHeader, IonSelectOption, IonCardContent } from '@ionic/angular/standalone';
import { Usuario } from 'src/app/model/usuario';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-registro',
    templateUrl: './registrarme.page.html',
    styleUrls: ['./registrarme.page.scss'],
    standalone: true,
    imports: [IonContent, IonToolbar, IonFooter, HeaderComponent, TranslateModule, IonLabel, CommonModule, FormsModule, IonCardContent, IonSelectOption, IonCardHeader, IonCardTitle, IonItem, IonCard, IonButton]
})
export class RegistrarmePage {

  usuario: Usuario = new Usuario();
  listaNivelesEducacionales: NivelEducacional[] = NivelEducacional.getNivelesEducacionales();
  cuenta: string = ""
  correo: string = ""
  password: string = ""
  preguntaSecreta: string = ""
  respuestaSecreta: string = ""
  nombre: string = ""
  apellido: string = ""
  direccion: string = ""
  fechaNacimiento: string | undefined
  nivelEducacional: NivelEducacional | undefined = NivelEducacional.buscarNivelEducacional(1);

  constructor(private authService: AuthService, private dbService: DataBaseService, translate: TranslateService, private router: Router
  ) {
    this.authService.leerUsuarioAutenticado().then((usuario) => {
      if (usuario) {
        console.log(this.fechaNacimiento)
        this.usuario = usuario;
        this.cuenta = usuario.cuenta;
        this.correo = usuario.correo;
        this.password = usuario.password;
        this.preguntaSecreta = usuario.preguntaSecreta;
        this.respuestaSecreta = usuario.respuestaSecreta;
        this.nombre = usuario.nombre;
        this.apellido = usuario.apellido;
        this.direccion = usuario.direccion;
        this.fechaNacimiento = new Date(usuario.fechaNacimiento!).toISOString()
        console.log(this.fechaNacimiento)
        this.nivelEducacional = usuario.nivelEducacional
      }
    });
  }

  guardarUsuario() {
    this.usuario.correo = this.correo;
    this.usuario.cuenta = this.cuenta;
    this.usuario.password = this.password;
    this.usuario.preguntaSecreta = this.preguntaSecreta;
    this.usuario.respuestaSecreta = this.respuestaSecreta;
    this.usuario.nombre = this.nombre;
    this.usuario.direccion = this.direccion;
    this.usuario.nombre = this.nombre;
    this.usuario.fechaNacimiento = new Date(this.fechaNacimiento!)
    console.log(this.usuario.fechaNacimiento)
    this.usuario.apellido = this.apellido;
    showAlertDUOC("Datos actualizados con exito!")

    this.dbService.guardarUsuario(this.usuario).then( resultado => 
      console.log(resultado)
    );
  
    
  }

  onFechaNacimientoChange(event: any) {
    console.log(event.detail.value)
    this.fechaNacimiento = new Date(event.detail.value).toISOString()
    console.log(this.fechaNacimiento)
  }

  
  public actualizarNivelEducacional(event: any) {
    const nivel = NivelEducacional.buscarNivelEducacional(event.detail.value);
    if (nivel) {
      this.usuario.nivelEducacional = nivel;
    }
  }

  public mandarALaChucha() {
    showAlertDUOC("Usuario creado con exito!")
    this.router.navigate(['/ingreso'])
  }

  public mandarALaChucha2() {
    this.router.navigate(['/ingreso'])
  }
}
