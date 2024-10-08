import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureListComponent } from './lecture-list.component';

describe('LectureListComponent', () => {
  let component: LectureListComponent;
  let fixture: ComponentFixture<LectureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LectureListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LectureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
