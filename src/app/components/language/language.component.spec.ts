import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LanguageComponent } from './language.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('LanguageComponent', () => {
  let component: LanguageComponent;
  let fixture: ComponentFixture<LanguageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot() // Configura el módulo de traducción aquí
      ],
      providers: [
        TranslateService // Asegúrate de proveer TranslateService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the LanguageComponent', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));
});
