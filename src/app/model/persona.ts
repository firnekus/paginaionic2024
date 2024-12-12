import { NivelEducacional } from './nivel-educacional';


export class Persona {

  public nombre;
  public apellido;
  public nivelEducacional: NivelEducacional;
  public fechaNacimiento: Date | undefined | number;

  constructor() {
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacional = NivelEducacional.buscarNivelEducacional(1)!;
    this.fechaNacimiento = new Date();
  }

  // Formatear la fecha de nacimiento en dd/mm/yyyy
  public getFechaNacimiento(): string {
    if (!this.fechaNacimiento) return 'No asignada';

    if (this.fechaNacimiento instanceof Date) {
      const day = this.fechaNacimiento.getDate().toString().padStart(2, '0');
      // Obtener el mes (agregando 1) y agregar un cero inicial si es necesario
      const month = (this.fechaNacimiento.getMonth() + 1).toString().padStart(2, '0');
      // Obtener el año
      const year = this.fechaNacimiento.getFullYear();
      console.log(this.fechaNacimiento, " ", "WAAAAAAAAAAAAAAa")
      return `${day}/${month}/${year}`;
    }
    // Obtener el día y agregar un cero inicial si es necesario
    return "WECO"
  }

}