import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonButton, IonCard, IonCardTitle, IonCardContent, 
  IonItem, IonLabel, IonRouterLink, IonInput, IonGrid } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { DataBaseService } from 'src/app/services/data-base.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { gridLayer } from 'leaflet';
import { grid } from 'ionicons/icons';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonGrid, IonGrid, TranslateModule, IonRouterLink, IonInput, IonLabel, IonItem, IonCardContent, IonCardTitle, IonButton, 
    IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard,IonGrid]
})
export class PreguntaPage  {

  public correo: string = '';
  public usuario!: Usuario;
  public respuesta: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateService) 
   {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.usuario = this.router.getCurrentNavigation()!.extras.state!['usuario'];
      } else {
      }
    })
  }

  public validarRespuesta(): void {
    console.log(this.respuesta)
    if (this.usuario?.respuestaSecreta == this.respuesta) {
      this.router.navigate(['/correcto'], {state : {
        password: this.usuario.password
      }})
    } else {
      this.router.navigate(['/incorrecto'])
    }
  }

  mandarAInicio() {
    this.router.navigate(['/ingreso']);
  }
  
  
}


