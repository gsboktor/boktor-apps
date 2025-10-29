import { render } from '@testing-library/react';

import LibsLioDataAccessStore from './libs-lio-data-access-store';

describe('LibsLioDataAccessStore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LibsLioDataAccessStore />);
    expect(baseElement).toBeTruthy();
  });
});
