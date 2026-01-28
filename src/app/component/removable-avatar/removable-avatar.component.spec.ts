import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovableAvatarComponent } from './removable-avatar.component';

describe('RemovableAvatarComponent', () => {
  let component: RemovableAvatarComponent;
  let fixture: ComponentFixture<RemovableAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemovableAvatarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemovableAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
