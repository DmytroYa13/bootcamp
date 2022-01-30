import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthorService } from 'src/app/cabinet/services/author.service';
import { CurrentAuthor } from 'src/app/shared/interfaces/current-author.type';
import { ArraySortPipe } from 'src/app/shared/pipes/sort.pipe';
import { CommentService } from '../../services/comment.service';

import { CommentsComponent } from './comments.component';

const fakeAuthor: CurrentAuthor = {
  firstName: 'Ivan',
  lastName: 'Ivanov',
  email: 'test@test.com'
};

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  const fakeAuthorService = jasmine.createSpyObj("AuthorService", ['getAuthor']);
  const fakeCommentService = jasmine.createSpyObj("CommentService", { 'create': of({ data: 'response' }) });


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentsComponent, ArraySortPipe],
      providers: [
        { provide: AuthorService, useValue: fakeAuthorService },
        { provide: CommentService, useValue: fakeCommentService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    fakeAuthorService.getAuthor.and.returnValue(of(fakeAuthor));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize inputs', () => {
    component.postId = 'testPostId';
    expect(component.postId).toBe('testPostId');
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create commentForm if author data exists', () => {
    expect(component.commentForm).toEqual({ author: fakeAuthor });
  });

  it('should return false if farm is invalid', () => {
    expect(component.submitForm()).toBeUndefined();
  });

});
