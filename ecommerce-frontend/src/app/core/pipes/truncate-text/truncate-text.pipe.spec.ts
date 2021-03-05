import { TruncateTextPipe } from './truncate-text.pipe';

describe('TruncateTextPipe', () => {
  const pipe = new TruncateTextPipe();
  const dummyString = "testing pipe";
  const dummyStringWithElipses = "testing..."

  it('create an instance', () => {    
    expect(pipe).toBeTruthy();
  });

  it('it should not add "..."', () => {
    const response = pipe.transform(dummyString, 15);
    expect(response).toEqual(dummyString);
  });

  it('it should add "..."', () => {
    const response = pipe.transform(dummyString, 10);
    expect(response).toEqual(dummyStringWithElipses);
  });

});
