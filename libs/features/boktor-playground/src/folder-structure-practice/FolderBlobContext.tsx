import { createContext, useMemo } from 'react';

export enum FileType {
  FILE = 'file',
  FOLDER = 'folder',
}

export type FileData = {
  id: number;
  type: FileType;
  name: string; // Added name field
  children?: FileData[];
};

export const FolderBlobContext = createContext<FileData[]>([]);

export const FolderBlobProvider = ({ children }: { children: React.ReactNode }) => {
  const mockData = useMemo(
    () =>
      [
        {
          id: Math.floor(Math.random() * 10 ** 8),
          type: FileType.FILE,
          name: 'readme.md',
        },
        {
          id: Math.floor(Math.random() * 10 ** 8),
          type: FileType.FOLDER,
          name: 'src',
          children: [
            {
              id: Math.floor(Math.random() * 10 ** 8),
              type: FileType.FILE,
              name: 'index.ts',
            },
            {
              id: Math.floor(Math.random() * 10 ** 8),
              type: FileType.FILE,
              name: 'types.ts',
            },
            {
              id: Math.floor(Math.random() * 10 ** 8),
              type: FileType.FOLDER,
              name: 'components',
              children: [
                {
                  id: Math.floor(Math.random() * 10 ** 8),
                  type: FileType.FILE,
                  name: 'Button.tsx',
                },
                {
                  id: Math.floor(Math.random() * 10 ** 8),
                  type: FileType.FILE,
                  name: 'Input.tsx',
                },
              ],
            },
          ],
        },
        {
          id: Math.floor(Math.random() * 10 ** 8),
          type: FileType.FILE,
          name: 'package.json',
        },
        {
          id: Math.floor(Math.random() * 10 ** 8),
          type: FileType.FOLDER,
          name: 'public',
          children: [
            {
              id: Math.floor(Math.random() * 10 ** 8),
              type: FileType.FILE,
              name: 'favicon.ico',
            },
            {
              id: Math.floor(Math.random() * 10 ** 8),
              type: FileType.FILE,
              name: 'index.html',
            },
          ],
        },
      ] as FileData[],
    [],
  );

  return <FolderBlobContext.Provider value={mockData}>{children}</FolderBlobContext.Provider>;
};
