import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboCardComponent } from './labo-card.component';

describe('LaboCardComponent', () => {
  let component: LaboCardComponent;
  let fixture: ComponentFixture<LaboCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
