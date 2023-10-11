import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVehicleTableComponent } from './all-vehicle-table.component';

describe('AllVehicleTableComponent', () => {
  let component: AllVehicleTableComponent;
  let fixture: ComponentFixture<AllVehicleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllVehicleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllVehicleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
