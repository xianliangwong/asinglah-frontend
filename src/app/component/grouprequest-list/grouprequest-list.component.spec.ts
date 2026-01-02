import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouprequestListComponent } from './grouprequest-list.component';

describe('GrouprequestListComponent', () => {
  let component: GrouprequestListComponent;
  let fixture: ComponentFixture<GrouprequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrouprequestListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrouprequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
