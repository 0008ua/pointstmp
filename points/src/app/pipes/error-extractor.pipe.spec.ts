import { ErrorExtractorPipe } from './error-extractor.pipe';

describe('ErrorExtractorPipe', () => {
  it('create an instance', () => {
    const pipe = new ErrorExtractorPipe();
    expect(pipe).toBeTruthy();
  });
});
