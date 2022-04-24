import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioStepperComponent } from './usuario-stepper.component';

describe('UsuarioStepperComponent', () => {
  let component: UsuarioStepperComponent;
  let fixture: ComponentFixture<UsuarioStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
