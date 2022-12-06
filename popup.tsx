import { FC, useState } from 'react';

const Popup: FC = () => {
  const [data, setData] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16
      }}
    >
      <h2>
        Welcome to your{' '}
        <a href='https://www.plasmo.com' target='_blank' rel='noreferrer'>
          Plasmo
        </a>{' '}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href='https://docs.plasmo.com' target='_blank' rel='noreferrer'>
        View Docs12
      </a>
    </div>
  );
};

export default Popup;
