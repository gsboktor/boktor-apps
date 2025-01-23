type File = {
  type: 'File' | 'Folder';
  name: string;
  content?: string;
  children?: File[];
};

export class FileSystem {
  constructor(private readonly root?: File) {
    this.root = {
      type: 'Folder',
      name: '/',
      children: [],
    };
  }

  public addContentFile = (filePath: string, content: string) => {
    let path = filePath.split('/').filter((s) => s !== '');
    let fileName = path.shift();
    let currDirectory = this.root;

    while (path.length >= 0) {
      let next = currDirectory.children.findIndex((file) => file.name === fileName);
      if (next === -1 && path.length > 0) {
        currDirectory.children.push({
          type: 'Folder',
          children: [],
          name: fileName,
        });

        next = currDirectory.children.length - 1;
      } else if (path.length === 0) {
        if (next === -1) {
          let newFile: File = {
            type: 'File',
            content: content,
            name: fileName,
          };

          currDirectory.children.push(newFile);
        } else {
          currDirectory.children[next].content += ' ' + content;
        }
        break;
      }

      currDirectory = currDirectory.children[next];
      fileName = path.shift();
    }
  };

  public mkDir = (filePath: string) => {
    let path = filePath.split('/').filter((s) => s !== '');

    let fileName = path.shift();
    let currDirectory = this.root;

    while (path.length >= 0) {
      let next = (currDirectory.children && currDirectory.children.findIndex((file) => file.name === fileName)) ?? -1;
      if (next === -1 || !next) {
        currDirectory.children.push({
          type: 'Folder',
          name: fileName,
          children: [],
        });

        next = currDirectory.children.length - 1;
        if (path.length === 0) break;
      }

      currDirectory = currDirectory.children[next];
      fileName = path.shift();
    }
  };

  public ls = (filePath: string) => {
    let path = filePath.split('/').filter((s) => s !== '');

    let fileName = path.shift();
    let currDirectory = this.root;

    while (path.length >= 0) {
      if (currDirectory.type === 'Folder') {
        let next = currDirectory.children.findIndex((file) => file.name === fileName);
        if (next === -1) break;

        currDirectory = currDirectory.children[next];
        fileName = path.shift();
      } else {
        break;
      }
    }

    console.log('currd', currDirectory);

    if (currDirectory.type === 'Folder') {
      return [currDirectory.name, ...currDirectory.children.map((ch) => ch.name)];
    } else {
      return [currDirectory.name];
    }
  };

  public print = () => {
    console.log(JSON.stringify(this.root, null, 2));
  };

  public getRoot = () => {
    return this.root;
  };
}
