import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerMenuComponent } from './lecturer-menu.component';

describe('LecturerMenuComponent', () => {
  let component: LecturerMenuComponent;
  let fixture: ComponentFixture<LecturerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LecturerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
