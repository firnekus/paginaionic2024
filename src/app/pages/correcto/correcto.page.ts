import { Usuario } from './../../../../src/app/model/usuario';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, 
  IonCard,IonCardContent,IonCardHeader,IonLabel,IonRouterLink,IonButton} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonToolbar, 
    IonCard,IonCardContent,IonCardHeader,IonLabel,IonRouterLink,IonButton, TranslateModule]
})
export class CorrectoPage  {

    public usuario: Usuario;
    public password: string | undefined;
    
    constructor( 
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private translate: TranslateService) {
      this.usuario = new Usuario();

      this.activatedRoute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation()?.extras.state) {
          this.password = this.router.getCurrentNavigation()!.extras.state!['password'];
        } else {
          
        }
      })

    } 
  

  public redirigir() {
    this.router.navigate(['/ingreso'])
  }
}
