import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderService } from 'src/app/loader/services/loader.service';
import { PostsService } from '../../services/posts.service';

import { PostListComponent } from './post-list.component';

describe('PostsComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  const fakePostsService = jasmine.createSpyObj("PostsService", ["getAll"]);
  const fakeLoaderService = jasmine.createSpyObj("LoaderService", ["getLoader"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostListComponent ],
      providers: [
        { provide: PostsService, useValue: fakePostsService },
        { provide: LoaderService, useValue:  fakeLoaderService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
