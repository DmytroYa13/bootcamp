import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AUTHOR_DEFAULT_AVATAR_TOKEN } from 'src/app/shared/InjectionTokens/author-default-avatar';
import { AuthorService } from '../../services/author.service';

import { CabinetComponent } from './cabinet.component';

describe('CabinetComponent', () => {

  let component: CabinetComponent;
  let fixture: ComponentFixture<CabinetComponent>;

  const fakeAuthorService = jasmine.createSpyObj('AuthorService', ['getAuthor']);
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetComponent ],
      providers:[
        { provide: AuthorService, useValue: fakeAuthorService },
        { provide: AUTHOR_DEFAULT_AVATAR_TOKEN, useValue: 'avatarUrl' }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject the author Default Avatar', () => {
    expect(component.authorDefaultAvatar).toEqual('avatarUrl');
  });

});
