import { Link } from 'react-router-dom';

export const ItemLink = ({ item }) => {
  return (
    <li className='list-group-item d-flex justify-content-between align-items-center'>
      <span className='d-inline-block text-truncate col-10 '>{item.link}</span>
      <Link
        className='btn btn-sm btn-info'
        to={`/detail/${item.code}`}
      >
        Detail
      </Link>
    </li>
  );
};
