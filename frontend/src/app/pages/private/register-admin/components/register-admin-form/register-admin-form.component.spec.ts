import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAdminFormComponent } from './register-admin-form.component';

describe('RegisterAdminFormComponent', () => {
  let component: RegisterAdminFormComponent;
  let fixture: ComponentFixture<RegisterAdminFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAdminFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
