import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CorrectoPage } from './correcto.page';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';  // Importar RouterTestingModule
import { Routes } from '@angular/router';
import { Router } from '@angular/router';

// Definir rutas ficticias para las pruebas
const routes: Routes = [
  { path: 'correo', loadComponent: () => import('../correo/correo.page').then(m => m.CorreoPage) },
  { path: 'incorrecto', loadComponent: () => import('../incorrecto/incorrecto.page').then(m => m.IncorrectoPage) },
  // Otras rutas que necesites
];

describe('CorrectoPage', () => {
  let component: CorrectoPage;
  let fixture: ComponentFixture<CorrectoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),  // Usar withRoutes para definir rutas en el entorno de pruebas
        TranslateModule.forRoot(),  // Proveer TranslateModule
        CorrectoPage  // Asegúrate de que CorrectoPage esté en el arreglo 'imports'
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CorrectoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the CorrectoPage', () => {
    expect(component).toBeTruthy();
  });
});
