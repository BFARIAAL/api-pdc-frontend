import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSubmenuBarComponent } from './vehicle-submenu-bar.component';

describe('VehicleSubmenuBarComponent', () => {
  let component: VehicleSubmenuBarComponent;
  let fixture: ComponentFixture<VehicleSubmenuBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleSubmenuBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSubmenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
