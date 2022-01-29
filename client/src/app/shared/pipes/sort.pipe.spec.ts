import { ArraySortPipe } from './sort.pipe';

const testArray: any[] = [
  { testField: 'zTestValue' },
  { testField: 'aTestValue' },
];

describe('SortPipe', () => {

  let pipe: ArraySortPipe;

  beforeEach(() => {
    pipe = new ArraySortPipe();
  });

  it('create an instance', () => {
    const pipe = new ArraySortPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return false if not array', () => {
    expect(pipe.transform({} as [], 'testField')).toBeFalse();
  });

  it('should return array if array sorted', () => {

    const sortedArray = [
      { testField: 'zTestValue' },
      { testField: 'aTestValue' },
    ];
    const result = pipe.transform(testArray, 'testField');
    expect(result).toEqual(sortedArray);
  });

});
