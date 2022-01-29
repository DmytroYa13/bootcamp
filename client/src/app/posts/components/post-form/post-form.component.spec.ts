import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { LoaderService } from 'src/app/loader/services/loader.service';
import { TagsService } from 'src/app/tags/services/tags.service';
import { PostsService } from '../../services/posts.service';

import { PostFormComponent } from './post-form.component';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;

  const fakeTagsService = jasmine.createSpyObj("TagsService", ["getAll"]);
  const fakePostsService = jasmine.createSpyObj("PostsService", ["create"]);
  const fakeLoaderService = jasmine.createSpyObj("LoaderService", ["getLoader"]);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        PostFormComponent,
      ],
      providers: [
        { provide: TagsService, useValue: fakeTagsService },
        { provide: PostsService, useValue: fakePostsService },
        { provide: Router, useValue:  {} },
        { provide: LoaderService, useValue:  fakeLoaderService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
