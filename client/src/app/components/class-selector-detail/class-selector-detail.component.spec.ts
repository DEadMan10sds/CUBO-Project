import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSelectorDetailComponent } from './class-selector-detail.component';

describe('ClassSelectorDetailComponent', () => {
  let component: ClassSelectorDetailComponent;
  let fixture: ComponentFixture<ClassSelectorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassSelectorDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassSelectorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
