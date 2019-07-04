import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportedSitesComponent } from './supported-sites.component';

describe('SupportedSitesComponent', () => {
  let component: SupportedSitesComponent;
  let fixture: ComponentFixture<SupportedSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportedSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportedSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
