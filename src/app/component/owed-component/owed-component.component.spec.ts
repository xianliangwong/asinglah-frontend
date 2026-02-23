import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwedComponentComponent } from './owed-component.component';

describe('OwedComponentComponent', () => {
  let component: OwedComponentComponent;
  let fixture: ComponentFixture<OwedComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwedComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
