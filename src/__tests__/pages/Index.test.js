import Index from '@/pages';
import { toHaveNoViolations, axe } from 'jest-axe';
import { render } from '@testing-library/react';

expect.extend(toHaveNoViolations);

describe('Page: index', function () {
  it('should Index a11y', async function () {
    const result = await axe(render(<Index />).container);

    expect(result).toHaveNoViolations();
  });
});
