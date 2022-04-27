import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

global.fetch = jest.fn();
const getInput = () => screen.getByPlaceholderText('请输入QQ号');

describe('App', () => {
  test.skip('500ms内连续输入字符,只会请求一次接口', async () => {
    // TODO 如何fakeTimers会导致测试超时
    jest.useFakeTimers();
    render(<App />);

    await userEvent.type(getInput(), '12345');

    expect(fetch).toBeCalledTimes(0);

    jest.runAllTimers();

    expect(fetch).toBeCalledTimes(1);
  });
});
