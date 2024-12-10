import { useCallback, useContext, useState } from 'react';
import { FileData, FileType, FolderBlobContext } from './FolderBlobContext';

export const File = ({ fileData }: { fileData: FileData }) => {
  return (
    <span key={fileData.id} style={{ color: 'green', display: 'inline' }}>
      {fileData.name}
    </span>
  );
};

export const Folder = ({ data, padding }: { data: FileData[]; padding: number }) => {
  const [openObj, setOpenObj] = useState<Record<number, boolean>>(() => {
    return data.reduce((acc, curr) => ({ ...acc, [curr.id]: false }), {} as Record<number, boolean>);
  });

  const handleSetOpen = useCallback(
    (id: number) => {
      const curr = openObj[id];
      setOpenObj((prev) => ({ ...prev, [id]: !curr }));
    },
    [openObj],
  );

  return (
    <div style={{ paddingLeft: padding, display: 'flex', flexDirection: 'column' }}>
      {data.map((fileOrFolder) => {
        if (fileOrFolder.type === FileType.FILE) return <File fileData={fileOrFolder} />;
        return (
          <div key={fileOrFolder.id}>
            <span style={{ color: 'black', display: 'inline' }} onClick={() => handleSetOpen(fileOrFolder.id)}>
              {fileOrFolder.name}
            </span>
            {openObj[fileOrFolder.id] && fileOrFolder.children && (
              <Folder data={fileOrFolder.children} padding={padding + 12} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export const DataTreeContainer = () => {
  const mockData = useContext(FolderBlobContext);

  return <Folder data={mockData} padding={0} />;
};
