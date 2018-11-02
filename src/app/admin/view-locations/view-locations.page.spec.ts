import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLocationsPage } from './view-locations.page';

describe('ViewLocationsPage', () => {
  let component: ViewLocationsPage;
  let fixture: ComponentFixture<ViewLocationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLocationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLocationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
