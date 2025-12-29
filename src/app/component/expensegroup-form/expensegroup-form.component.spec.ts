import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensegroupFormComponent } from './expensegroup-form.component';

describe('ExpensegroupFormComponent', () => {
  let component: ExpensegroupFormComponent;
  let fixture: ComponentFixture<ExpensegroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensegroupFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensegroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
