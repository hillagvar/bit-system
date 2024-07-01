import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLectureComponent } from './delete-lecture.component';

describe('DeleteLectureComponent', () => {
  let component: DeleteLectureComponent;
  let fixture: ComponentFixture<DeleteLectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteLectureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
