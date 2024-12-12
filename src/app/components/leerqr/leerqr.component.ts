import { IonButton, IonIcon, IonContent } from '@ionic/angular/standalone';   
import { AuthService } from 'src/app/services/auth.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import jsQR, { QRCode } from 'jsqr';
import { CommonModule } from '@angular/common';
import { LanguageComponent } from '../language/language.component';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';  // Importa el Router para redirigir

@Component({
  selector: 'app-leerqr',
  templateUrl: './leerqr.component.html',
  styleUrls: ['./leerqr.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, CommonModule, TranslateModule] 
})
export class LeerqrComponent implements OnInit {

  @ViewChild('selectLanguage') selectLanguage!: LanguageComponent;
  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;
  
  @Output() scanned = new EventEmitter<string>();
  @Output() stopped = new EventEmitter();

  public usuario: Usuario = new Usuario();
  public escaneando = false;
  public datosQR: string = '';
  public errorAccesoCamara: string = '';  // Usaremos esta clave para mostrar el error traducido
  public mensajeDirigirse: string = '';  // Nueva propiedad para manejar el mensaje

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.comenzarEscaneoQR();
  }

  public async comenzarEscaneoQR11() {
    try {
      const mediaProvider = navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });

      this.video.nativeElement.srcObject = mediaProvider;
      this.video.nativeElement.setAttribute('playsinline', 'true');
      this.video.nativeElement.play();
      this.escaneando = true;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } catch (error) {
      console.error('Error al acceder a la cámara', error);
      
      this.errorAccesoCamara = 'HomePage.console.error';  
    }
  }

  async comenzarEscaneoQR() {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    this.video.nativeElement.srcObject = mediaStream;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    this.mensajeDirigirse = '';  // Limpiar mensaje cuando comienza un nuevo escaneo
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this)); 
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this)); 
    }
  }

  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d', { willReadFrequently: true });
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    
    if (qrCode) {
      if (qrCode.data !== '') {
        this.escaneando = false;
        this.mostrarDatosQROrdenados(qrCode.data);
        return true;
      }
    }
    return false;
  }

  public mostrarDatosQROrdenados(datosQR: string): void {
    this.datosQR = datosQR;
    const asistencia = JSON.parse(datosQR);
    
    if (asistencia.nombre && asistencia.apellido) {
      this.usuario.nombre = asistencia.nombre;
      this.usuario.apellido = asistencia.apellido;
    }
    
    this.usuario.asistencia = asistencia;
    this.authService.guardarUsuarioAutenticado(this.usuario);
    this.scanned.emit(datosQR); 
    
    // Mostrar el mensaje "Dirígete a mi clase"
    this.mensajeDirigirse = '¡Dirígete a mi clase!';  // Establecer el mensaje
    
    // Redirigir al usuario automáticamente a la página de mi clase
    setTimeout(() => {
      this.authService.componente_actual.next('miclase')
    }, 2000);  // Retardo para que el mensaje sea visible por un momento
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
    this.stopped.emit();
  }

  async ionViewWillEnter() {
    this.selectLanguage.setCurrentLanguage();
  }
}
