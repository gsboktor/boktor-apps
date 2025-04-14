/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useCallback, useMemo, useState } from 'react';

export enum Detail {
  FS = 'fullstack',
  AS = 'asurion',
  HCA = 'HCA',
}

export type PersonalDetailsContextType = {
  onHoverDetail: (detail: Detail) => void;
  onResetDetail: () => void;
  detailToShow?: Detail;
};

export const PersonalDetailsContext = createContext<PersonalDetailsContextType>({
  onHoverDetail: (d: Detail) => {},
  onResetDetail: () => {},
  detailToShow: undefined,
});

export const PersonalDetailsProvider = ({ children }: { children: React.ReactNode }) => {
  const [detail, setDetail] = useState<Detail>();

  const onHoverDetail = useCallback(
    (detail: Detail) => {
      setDetail(detail);
    },
    [setDetail],
  );

  const onResetDetail = useCallback(() => setDetail(undefined), [setDetail]);

  const value = useMemo<PersonalDetailsContextType>(
    () => ({
      onHoverDetail: onHoverDetail,
      onResetDetail: onResetDetail,
      detailToShow: detail,
    }),
    [detail, onHoverDetail, onResetDetail],
  );

  return <PersonalDetailsContext.Provider value={value}>{children}</PersonalDetailsContext.Provider>;
};
