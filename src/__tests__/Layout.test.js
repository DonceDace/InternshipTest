import { render } from '@testing-library/react';
import Layout from '@/layouts';

test('Layout', () => {
  const wrapper = render(<Layout>test</Layout>);
  expect(wrapper.container.innerHTML).toEqual('test');
});
