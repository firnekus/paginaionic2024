import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonButton, IonCard, IonItem, IonCardTitle, IonCardHeader } from '@ionic/angular/standalone';
import { Usuario } from 'src/app/model/usuario';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { AuthService } from 'src/app/services/auth.service';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';

@Component({
  selector: 'app-misdatospage',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, MisdatosComponent]
})
export class MisdatosPage implements OnInit {

  usuario: Usuario | null = null;
  
  cuenta: string = '';
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  preguntaSecreta: string = '';
  respuestaSecreta: string = '';
  password: string = '';
  direccion: string = '';

  constructor(private authService: AuthService
  ) { }

  async ngOnInit() {
    this.usuario = await this.authService.leerUsuarioAutenticado();
    if (this.usuario) {
      this.cuenta = this.usuario.cuenta;
      this.nombre = this.usuario.nombre;
      this.apellido = this.usuario.apellido;
      this.correo = this.usuario.correo;
      this.preguntaSecreta = this.usuario.preguntaSecreta;
      this.respuestaSecreta = this.usuario.respuestaSecreta;
      this.password = this.usuario.password; // Considera si es seguro mostrar la contraseña
      this.direccion = this.usuario.direccion;
    }
    
  }
}
