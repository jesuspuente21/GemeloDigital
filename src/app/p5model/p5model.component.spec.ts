import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P5modelComponent } from './p5model.component';

describe('P5modelComponent', () => {
  let component: P5modelComponent;
  let fixture: ComponentFixture<P5modelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P5modelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P5modelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
