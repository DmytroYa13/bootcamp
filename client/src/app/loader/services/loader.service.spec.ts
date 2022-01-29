import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add and apiName to the behaviorSubject', (done) => {

    service.show('testApiName');
    service['currentApiRequests'].subscribe(result => {
      expect(result).toEqual(['testApiName']);
      done();
    });

  });


  it('should remove and apiName to the behaviorSubject', (done) => {

    service.show('testApiName');
    service.hide('testApiName');
    service['currentApiRequests'].subscribe(result => {
      expect(result).toEqual([]);
      done();
    });

  });


  it('should return true if apiName is in behaviorSubject', (done) => {

    service.show('testApiName');
    service.getLoader('testApiName').subscribe(result => {
      expect(result).toBeTrue();
      done();
    });

  });


});
