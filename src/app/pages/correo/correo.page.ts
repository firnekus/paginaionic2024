
import { Usuario } from './../../../../src/app/model/usuario';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { IonContent, IonHeader, IonTitle,
   IonToolbar,IonCard,IonCardContent,IonCardHeader,IonItem,
  IonLabel,IonGrid,IonButton,IonInput} from '@ionic/angular/standalone';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle,
    IonToolbar,IonCard,IonCardContent,IonCardHeader,IonItem,
   IonLabel,IonGrid,IonButton,IonInput,FormsModule, TranslateModule]
})
export class CorreoPage  {

  public correo: string = '';
  private usuario: Usuario | undefined;
  constructor(
    private router: Router, 
    private dbService: DataBaseService,
    private translate: TranslateService) {
  }

  redirigir() 
  {
    this.dbService.buscarUsuarioPorCorreo(this.correo).then(usuario => {
      console.log(this.correo)
      console.log(usuario)
      if (usuario) 
      {
        const navigationExtras = {
          state: {
            usuario: usuario
          }
        }
        this.router.navigate(['/pregunta'], navigationExtras)
      } else {
        this.router.navigate(['/incorrecto'])
      }
    })

    }
    mandarAInicio() {
      this.router.navigate(['/ingreso']);
    }
  } 


