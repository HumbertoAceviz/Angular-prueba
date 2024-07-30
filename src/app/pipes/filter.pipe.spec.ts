import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  const pipe = new FilterPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('filters users by name', () => {
    const users = [
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' }
    ];
    expect(pipe.transform(users, 'Alice').length).toBe(1);
    expect(pipe.transform(users, 'Alice')[0].name).toBe('Alice');
  });

  it('returns original array if no search text is provided', () => {
    const users = [
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' }
    ];
    expect(pipe.transform(users, '').length).toBe(2);
  });

  it('returns empty array if users is null', () => {
    expect(pipe.transform(null, 'Alice').length).toBe(0);
  });
});
