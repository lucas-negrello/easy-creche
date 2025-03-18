import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InOutMonitoringComponent } from './in-out-monitoring.component';

describe('InOutMonitoringComponent', () => {
  let component: InOutMonitoringComponent;
  let fixture: ComponentFixture<InOutMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InOutMonitoringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InOutMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
