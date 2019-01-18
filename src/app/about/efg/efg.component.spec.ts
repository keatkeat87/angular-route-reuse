import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfgComponent } from './efg.component';

describe('EfgComponent', () => {
  let component: EfgComponent;
  let fixture: ComponentFixture<EfgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
