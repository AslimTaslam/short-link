import { useState, useEffect } from 'react';

export const SearchPanel = ({ searchLink }) => {
  const [searchUrl, setSearchUrl] = useState('');

  const changeHandler = (e) => {
    setSearchUrl(e.target.value);
  };

  useEffect(() => {
    searchLink(searchUrl);
  }, [searchUrl, searchLink]);

  return (
    <div className='input-group mb-4'>
      <input
        type='text'
        className='form-control'
        id='searchPanel'
        aria-describedby='basic-addon3'
        placeholder='Search...'
        value={searchUrl}
        onChange={changeHandler}
      />
      <span
        className='input-group-text'
        id='basic-addon3'
      >
        <i className='bi bi-search text-info' />
      </span>
    </div>
  );
};
