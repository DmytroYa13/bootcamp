import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsForPostComponent } from './tags-for-post.component';

describe('TagsForPostComponent', () => {
  let component: TagsForPostComponent;
  let fixture: ComponentFixture<TagsForPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsForPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsForPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
