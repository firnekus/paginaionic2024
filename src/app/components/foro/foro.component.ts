import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Publicacion } from 'src/app/model/publicacion';
import { Usuario } from 'src/app/model/usuario';
import { APIClientService } from 'src/app/services/apiclient.service';
import { AuthService } from 'src/app/services/auth.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TranslateModule,FormsModule,],
})
export class ForoComponent  implements OnInit {

  @ViewChild("topOfPage") topOfPage!: ElementRef;

  usuario = new Usuario();
  publicacion: Publicacion = new Publicacion();
  publicaciones: any;

  constructor(private authService: AuthService, private api: APIClientService) { }

  ngOnInit() {
    this.api.listaPublicaciones.subscribe((publicaciones: any[]) => {
      publicaciones.reverse(); // Ordenar de más nueva a mán antigua
      console.log(publicaciones)
      this.publicaciones = publicaciones;
    });
    this.authService.usuarioAutenticado.subscribe(usuario => {
      this.usuario = usuario? usuario : new Usuario();
    });
    this.limpiarPublicacion();
  }

  setPublicacion(id: string, autor: string, titulo: string, contenido: string) {
    this.publicacion.id = id;
    this.publicacion.author = autor
    this.publicacion.title = titulo;
    this.publicacion.body = contenido;
  }

  limpiarPublicacion() {
    this.setPublicacion('', '', '', '');
    this.api.cargarPublicaciones();
  }

  guardarPublicacion() {
    if (this.publicacion.title.trim() === '') {
      showAlertDUOC('Antes de hacer una publicación debe llenar el título.');
      return;
    }
    if (this.publicacion.body.trim() === '') {
      showAlertDUOC('Antes de hacer una publicación debe llenar el contenido.');
      return;
    }
    if (this.publicacion.id === '') {
      this.crearPublicacion();
    }
    else {
      this.actualizarPublicacion();
    }
  }

  editarPublicacion(pub: any) {
    if (pub.author != this.usuario.nombre + ' ' + this.usuario.apellido) {
      showAlertDUOC('Sólo puede editar las publicaciones a su nombre');
      console.log(pub.author)
      console.log(this.usuario.nombre + ' ' + this.usuario.apellido)
      return;
    }
    this.setPublicacion(pub.id, pub.author, pub.title, pub.body);
    this.topOfPage.nativeElement.scrollIntoView({block: 'end', behavior: 'smooth'});
  }

  mensajePublicacion(accion: string, id: Publicacion) {
    showAlertDUOC(`La publicación ${id} fue ${accion} correctamente`);
    this.limpiarPublicacion();
  }

  crearPublicacion() {
    this.publicacion.id = this.api.getPubNumber().toString()
    this.publicacion.author = this.usuario.nombre + ' ' + this.usuario.apellido;

    this.api.crearPublicacion(this.publicacion).subscribe({
      next: (publicacion: { id: Publicacion; }) => this.mensajePublicacion('creada', publicacion.id),
      error: (error: any) => showToast('El servicio API Rest de Publicaciones no está disponible')
    });
    showAlertDUOC("Publicación creada!");
    console.log(this.publicacion.id)
  }

  actualizarPublicacion() {
    this.api.actualizarPublicacion(this.publicacion).subscribe({
      next: (publicacion: { id: Publicacion; }) => this.mensajePublicacion('actualizada', publicacion.id),
      error: (error: any) => showToast('El servicio API Rest de Publicaciones no está disponible')
    });
  }

  eliminarPublicacion(pub: any) {
    console.log(pub)
    if (pub.author !== this.usuario.nombre + ' ' + this.usuario.apellido) {
      showAlertDUOC('Sólo puede eliminar las publicaciones a su nombre');
      return;
    }
    this.api.eliminarPublicacion(pub.id).subscribe({
      next: (publicacion: any) => this.mensajePublicacion('eliminada', pub.id),
      error: (error: any) => showToast('El servicio API Rest de Publicaciones no está disponible'),     
    });
  }

}
