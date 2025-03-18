import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgressComponent } from './student-progress.component';

describe('StudantProgressComponent', () => {
  let component: StudentProgressComponent;
  let fixture: ComponentFixture<StudentProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
