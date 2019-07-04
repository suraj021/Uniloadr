import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyMotionComponent } from './daily-motion.component';

describe('DailyMotionComponent', () => {
  let component: DailyMotionComponent;
  let fixture: ComponentFixture<DailyMotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyMotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyMotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
