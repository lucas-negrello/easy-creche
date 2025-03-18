import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterResponsibleComponent } from './register-responsible.component';

describe('RegisterResponsibleComponent', () => {
  let component: RegisterResponsibleComponent;
  let fixture: ComponentFixture<RegisterResponsibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterResponsibleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
