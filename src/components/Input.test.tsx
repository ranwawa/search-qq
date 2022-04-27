import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

const mockInput = jest.fn();
const mockClear = jest.fn();

const getInput = () => screen.getByRole('textbox');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Input组件', () => {
  it('默认情况下不显示label标签,传label属性后可显示', () => {
    const { rerender } = render(<Input />);
    expect(screen.queryByText('QQ')).not.toBeInTheDocument();

    rerender(<Input label='QQ' />);
    expect(screen.getByText('QQ')).toBeInTheDocument();
  });

  it('默认情况下input没有值,传value后显示默认值', () => {
    render(<Input />);
    expect(screen.queryByDisplayValue('123456')).not.toBeInTheDocument();

    render(<Input defaultValue='123456' />);
    expect(screen.getByDisplayValue('123456')).toBeInTheDocument();
  });

  it('默认情况下placeholder没有值,传placeholder后显示默认值', () => {
    const { rerender } = render(<Input />);
    expect(screen.queryByPlaceholderText('请输入QQ号')).not.toBeInTheDocument();

    rerender(<Input placeholder='请输入QQ号' />);
    expect(screen.getByPlaceholderText('请输入QQ号')).toBeInTheDocument();
  });

  it('默认情况下maxLength没有值,传maxlength后显示默认值', async () => {
    const { rerender } = render(<Input />);
    expect(getInput()).not.toHaveAttribute('maxLength');

    rerender(<Input maxlength={10} onInput={mockInput} />);
    expect(getInput()).toHaveAttribute('maxLength', '10');

    await userEvent.type(getInput(), '123456789012');
    expect(getInput()).toHaveAttribute('value', '1234567890');
  });

  it('默认情况下没有type属性,type属性为integer时只能输入数字', async () => {
    render(<Input type='integer' />);

    await userEvent.type(getInput(), '123abc');
    expect(getInput()).toHaveValue('123');
  });

  it('默认不显示清空按钮,输入内容后会显示清空按钮,点击按钮可清空内容并触发onClear事件', async () => {
    render(<Input onClear={mockClear} onInput={mockInput} />);
    const user = userEvent.setup();

    expect(screen.queryByText('x')).not.toBeInTheDocument();

    await userEvent.type(getInput(), 'abc');
    await user.click(screen.getByText('x'));

    expect(mockClear).toBeCalledTimes(1);
  });

  it('有文字并且loading时只显示loading图片,不显示删除按钮', async () => {
    render(<Input loading defaultValue='abc' />);

    expect(screen.queryByText('x')).not.toBeInTheDocument();
    expect(screen.getByTestId('rww-input__loading')).toBeInTheDocument();
  });

  it('输入内容后会触发input事件', async () => {
    render(<Input onInput={mockInput} />);

    await userEvent.type(getInput(), '123456');

    expect(mockInput).toBeCalledWith('123456');
  });

  it('integer情况下输入小数点,要直接过滤掉', async () => {
    render(<Input type='integer' onInput={mockInput} />);

    await userEvent.type(getInput(), '123456.78');

    expect(mockInput).toBeCalledWith('12345678');
  });
});
