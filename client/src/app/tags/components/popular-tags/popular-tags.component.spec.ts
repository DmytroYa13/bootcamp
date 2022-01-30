import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderService } from 'src/app/loader/services/loader.service';
import { TagsService } from '../../services/tags.service';

import { PopularTagsComponent } from './popular-tags.component';

describe('TagsListComponent', () => {
  let component: PopularTagsComponent;
  let fixture: ComponentFixture<PopularTagsComponent>;

  const fakeLoaderService = jasmine.createSpyObj("LoaderService", ["getLoader"]);
  const fakeTagsService = jasmine.createSpyObj("TagsService", ["getAll"]);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularTagsComponent],
      providers: [
        { provide: LoaderService, useValue: fakeLoaderService },
        { provide: TagsService, useValue: fakeTagsService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
