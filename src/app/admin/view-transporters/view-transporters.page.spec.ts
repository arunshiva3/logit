import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransportersPage } from './view-transporters.page';

describe('ViewTransportersPage', () => {
  let component: ViewTransportersPage;
  let fixture: ComponentFixture<ViewTransportersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTransportersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTransportersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
