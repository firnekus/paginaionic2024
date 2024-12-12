import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router'; 
import { IonicStorageModule } from '@ionic/storage-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('Probar el comienzo de la aplicación', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicStorageModule.forRoot(),  // Inicializar IonicStorageModule
        AppComponent,  // El componente AppComponent
      ],
      providers: [
        {
          provide: ActivatedRoute, // Proveer un valor simulado de ActivatedRoute
          useValue: {} // Valor simulado para evitar errores durante las pruebas
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Permitir elementos personalizados
    }).compileComponents();
  });

  it('Se debería crear la aplicación', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


});
