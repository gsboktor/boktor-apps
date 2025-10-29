import { render } from '@testing-library/react';

import LibsLioDataAccessHooks from './libs-lio-data-access-hooks';

describe('LibsLioDataAccessHooks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LibsLioDataAccessHooks />);
    expect(baseElement).toBeTruthy();
  });
});
