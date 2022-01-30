import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikesService } from '../../services/likes.service';

import { PostItemComponent } from './post-item.component';

describe('PostComponent', () => {
  let component: PostItemComponent;
  let fixture: ComponentFixture<PostItemComponent>;

  const fakeLikesService = jasmine.createSpyObj("LikesService", ["toggleLike"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostItemComponent ],
      providers: [
        { provide: LikesService, useValue: fakeLikesService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
