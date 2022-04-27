import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './info.scss';

interface IProps {
  profile?: {
    qlogo: string;
    name: string;
    qq: string;
  };
}

enum IMG_STATUS {
  LOADING,
  SUCCEED,
  FAILED,
}

const IMG_CLASS_MAP = {
  [IMG_STATUS.LOADING]: 'rww-info__avatar--loading',
  [IMG_STATUS.SUCCEED]: 'rww-info__avatar',
  [IMG_STATUS.FAILED]: 'rww-info__avatar--failed',
};

export const Info: FC<IProps> = ({ profile = {} }) => {
  const { qlogo, name, qq } = profile;
  const [imgStatus, setImgStatus] = useState<IMG_STATUS>();

  useEffect(() => {
    setImgStatus(IMG_STATUS.LOADING);
  }, [qlogo]);

  if (!qlogo) {
    return null;
  }

  return (
    <div className='rww-info'>
      <div
        className={`rww-info__avatar ${IMG_CLASS_MAP[imgStatus]}`}
        data-testid='img-wrapper'
      >
        <img
          alt='用户头像'
          src={qlogo}
          onLoad={() => setImgStatus(IMG_STATUS.SUCCEED)}
          onError={() => setImgStatus(IMG_STATUS.FAILED)}
        />
      </div>
      <div className='rww-info__name'>{name}</div>
      <div className='rww-info__qq'>{qq}</div>
    </div>
  );
};

export default Info;
