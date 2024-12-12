import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CorreoPage } from './correo.page';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage-angular'; // Importa Storage
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('CorreoPage', () => {
  let component: CorreoPage;
  let fixture: ComponentFixture<CorreoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        RouterTestingModule,  // Si el componente usa el enrutador
      ],
      providers: [
        AuthService,
        Storage,  // Proveemos el servicio Storage en el TestBed
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CorreoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the CorreoPage', () => {
    expect(component).toBeTruthy();
  });
});

