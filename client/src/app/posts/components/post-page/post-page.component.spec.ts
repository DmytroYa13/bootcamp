import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { LoaderService } from 'src/app/loader/services/loader.service';
import { PostsService } from '../../services/posts.service';

import { PostPageComponent } from './post-page.component';

describe('PostPageComponent', () => {
  let component: PostPageComponent;
  let fixture: ComponentFixture<PostPageComponent>;

  const fakePostsService = jasmine.createSpyObj("PostsService", ["getAll"]);
  const fakeLoaderService = jasmine.createSpyObj("LoaderService", ["getLoader"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostPageComponent],
      providers: [
        { provide: PostsService, useValue: fakePostsService },
        { provide: LoaderService, useValue: fakeLoaderService },
        { provide: ActivatedRoute, useValue: { params: of({ id: 10 }) } },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
