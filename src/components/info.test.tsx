import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Info from './Info';

const mockProfile = {
  qq: '1232342',
  name: '测试帐号',
  qlogo: 'https://q2.qlogo.cn/headimg_dl?spec=100&dst_uin=1232342',
};

describe('Info', () => {
  it('如果没有传头像的话,则不进行渲染', () => {
    render(<Info />);
    expect(screen.queryByAltText('用户头像')).not.toBeInTheDocument();
  });

  it('默认情况下要显示图片加载中的遮罩', () => {
    render(<Info profile={mockProfile} />);

    expect(screen.getByTestId('img-wrapper')).toHaveAttribute(
      'class',
      'rww-info__avatar rww-info__avatar--loading'
    );
  });

  it('图片加载成功后要去掉遮罩', () => {
    // TODO 怎么测试图片的成功和失败回调
  });
});
