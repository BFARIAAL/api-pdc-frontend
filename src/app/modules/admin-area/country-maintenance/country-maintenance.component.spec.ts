import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryMaintenanceComponent } from './country-maintenance.component';

describe('CountryMaintenanceComponent', () => {
  let component: CountryMaintenanceComponent;
  let fixture: ComponentFixture<CountryMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
