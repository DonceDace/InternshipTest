import Loading from '@/components/loading';
import { render } from '@testing-library/react';

describe('Component: Loading', function () {
  it('match snapshot', async function () {
    const result = render(<Loading />).container.outerHTML;
    expect(result).toMatchSnapshot();
  });
});
