import { useCallback, useState } from 'react';
import _ from 'lodash';
import Input from './components/Input.tsx';
import Info from './components/Info.tsx';
import './app.scss';

const REG_QQ = /^[1-9][0-9]{4,9}/;

function App() {
  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [tempQQ, setTempQQ] = useState('');

  const onInput = useCallback(
    _.debounce((qq: string) => {
      if (!REG_QQ.test(qq)) {
        return;
      }

      setLoading(true);

      fetch(`https://api.uomg.com/api/qq.info?qq=${qq}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setUserInfo(res);
          setLoading(false);
          setError(false);
        })
        .catch(() => {
          setUserInfo(undefined);
          setLoading(false);
          setError(true);
          setTempQQ(qq);
        });
    }, 500),
    [error]
  );
  return (
    <div className='rww-container'>
      <h2>QQ号查询</h2>
      <Input
        loading={loading}
        label='QQ'
        placeholder='请输入QQ号'
        maxlength='10'
        onInput={onInput}
      />
      {error ? (
        <div className='rww-error' onClick={() => onInput(tempQQ)}>
          系统异常,请点击重试
        </div>
      ) : (
        <Info profile={userInfo} />
      )}
    </div>
  );
}

export default App;
