import { FileSystem } from './file-system-attempt/FileSystem';

describe('FileSystem should be initialized with empty slash', () => {
  let fs;
  beforeAll(() => {
    fs = new FileSystem();
  });

  test('Construct FileSystem', () => {
    fs.mkDir('/e/r');
    expect(JSON.stringify(fs.getRoot())).toEqual(
      '{"type":"Folder","name":"/","children":[{"type":"Folder","name":"e","children":[{"type":"Folder","name":"r","children":[]}]}]}',
    );
  });
});
