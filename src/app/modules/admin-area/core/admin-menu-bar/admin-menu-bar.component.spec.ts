import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuBarComponent } from './admin-menu-bar.component';

describe('AdminMenuBarComponent', () => {
  let component: AdminMenuBarComponent;
  let fixture: ComponentFixture<AdminMenuBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMenuBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
