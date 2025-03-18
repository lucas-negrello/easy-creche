import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkmodeSelectorComponent } from './darkmode-selector.component';

describe('DarkmodeSelectorComponent', () => {
  let component: DarkmodeSelectorComponent;
  let fixture: ComponentFixture<DarkmodeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkmodeSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarkmodeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
