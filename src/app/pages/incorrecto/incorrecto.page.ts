import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, 
  IonCard,IonCardContent,IonCardHeader,IonLabel,IonRouterLink,IonButton} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, 
    IonCard,IonCardContent,IonCardHeader,IonLabel,IonRouterLink,IonButton,TranslateModule]
})
export class IncorrectoPage {
  public usuario: Usuario | undefined;

  constructor( 
    private activatedRoute: ActivatedRoute
  , private router: Router) 
{
  this.usuario = new Usuario();
}


  
  public redirigir() {
    this.router.navigate(['/ingreso'])
  }
}

