import { EmptyValueMessagePipe } from './empty-value-message.pipe';

describe('EmptyValueMessagePipe', () => {
  const data = '';
  it('create an instance', () => {
    const pipe = new EmptyValueMessagePipe();
    expect(pipe).toBeTruthy();
  });

  it('no data present', () => {
    const pipe = new EmptyValueMessagePipe();
    const response = pipe.transform(data);
    expect(response).toContain('--');
  });
});
