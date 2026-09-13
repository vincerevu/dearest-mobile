import * as React from 'react';

import { storage } from '../storage';

const IS_FIRST_TIME = 'IS_FIRST_TIME';

export function useIsFirstTime() {
  const [isFirstTime, setValue] = React.useState<boolean | undefined>(() => storage.getString(IS_FIRST_TIME) === 'true' ? true : storage.getString(IS_FIRST_TIME) === 'false' ? false : undefined);
  const setIsFirstTime = React.useCallback((value: boolean) => { storage.set(IS_FIRST_TIME, String(value)); setValue(value); }, []);
  if (isFirstTime === undefined) {
    return [true, setIsFirstTime] as const;
  }
  return [isFirstTime, setIsFirstTime] as const;
}
