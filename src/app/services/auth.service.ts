import { Asistencia } from './../interfaces/asistencia';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { showToast } from 'src/app/tools/message-routines';
import { Usuario } from '../model/usuario';
import { Storage } from '@ionic/storage-angular';
import { DataBaseService } from './data-base.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;

  keyUsuario = 'USUARIO_AUTENTICADO';
  usuarioAutenticado = new BehaviorSubject<Usuario | undefined>(undefined);

  // La variable primerInicioSesion vale true cuando el usuario digita correctamente sus
  // credenciales y logra entrar al sistema por primera vez. Pero vale falso, si el 
  // usuario ya ha iniciado sesión, luego cierra la aplicación sin cerrar la sesión
  // y vuelve a entrar nuevamente. Si el usuario ingresa por primera vez, se limpian todas
  // las componentes, pero se dejan tal como están y no se limpian, si el suario
  // cierra al aplicación y la vuelve a abrir sin haber previamente cerrado la sesión.
  primerInicioSesion =  new BehaviorSubject<boolean>(false);
  componente_actual = new BehaviorSubject<string>('qr');
  asistencia = new BehaviorSubject<Asistencia | undefined>(undefined);
  colorTheme = new BehaviorSubject<string>('');
  constructor(private router: Router, private bd: DataBaseService, private storage: Storage) { }

  async inicializarAutenticacion() {
    await this.storage.create();
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.leerUsuarioAutenticado().then(usuario => {
      return usuario !== null;
    });
  }

  async leerUsuarioAutenticado(): Promise<Usuario | null> {
    const usuario = await this.storage.get(this.keyUsuario) as Usuario;
    this.usuarioAutenticado.next(usuario);
    return usuario;
  }

  codigoQR = new BehaviorSubject<string>(''); 


  guardarUsuarioAutenticado(usuario: Usuario) {
    this.storage.set(this.keyUsuario, usuario);
    this.usuarioAutenticado.next(usuario);
  }

  eliminarUsuarioAutenticado(usuario: Usuario) {
    this.storage.remove(this.keyUsuario);
    this.usuarioAutenticado.next(undefined);
  }

  async login(cuenta: string, password: string) {
    await this.storage.get(this.keyUsuario).then(async (usuarioAutenticado) => {
      if (usuarioAutenticado) {
        this.usuarioAutenticado.next(usuarioAutenticado);
        this.primerInicioSesion.next(false); // Avisar que no es el primer inicio de sesión
        this.router.navigate(['/inicio']);
      } else {
        await this.bd.buscarUsuarioValido(cuenta, password).then(async (usuario: Usuario | undefined) => {
          if (usuario) {
            showToast(`¡Bienvenido(a) ${usuario.nombre} ${usuario.apellido}!`);
            this.guardarUsuarioAutenticado(usuario);
            this.primerInicioSesion.next(true); // Avisar que es el primer inicio de sesión
            this.router.navigate(['/inicio']);
          } else {
            showToast(`El correo o la password son incorrectos`);
            this.router.navigate(['/ingreso']);
          }
        });
      }
    });
  }

  async logout() {
    this.leerUsuarioAutenticado().then((usuario) => {
      if (usuario) {
        showToast(`¡Hasta pronto ${usuario.nombre} ${usuario.apellido}!`);
        this.eliminarUsuarioAutenticado(usuario);
        this.usuarioAutenticado.next(undefined)
      }
      this.router.navigate(['/ingreso']);
    })
  }

}
