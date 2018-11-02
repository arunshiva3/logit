import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVehiclesPage } from './view-vehicles.page';

describe('ViewVehiclesPage', () => {
  let component: ViewVehiclesPage;
  let fixture: ComponentFixture<ViewVehiclesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVehiclesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVehiclesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
