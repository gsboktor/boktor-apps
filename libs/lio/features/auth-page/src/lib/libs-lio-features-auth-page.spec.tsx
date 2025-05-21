import { render } from '@testing-library/react';

import LibsLioFeaturesAuthPage from './libs-lio-features-auth-page';

describe('LibsLioFeaturesAuthPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LibsLioFeaturesAuthPage />);
    expect(baseElement).toBeTruthy();
  });
});
