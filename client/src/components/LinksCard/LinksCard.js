import { Link } from 'react-router-dom';
import { ItemLink } from '../ItemLink';

export const LinksCard = ({ links }) => {
  if (links.length === 0) {
    return (
      <>
        <h3 className='text-center text-warning mt-4'>You don't have a link</h3>
        <Link
          className='btn btn-info float-roght mt-3'
          to='/create'
        >
          Go to create page
        </Link>
      </>
    );
  }
  return (
    <ul className='list-group list-group-flush'>
      {links.map((item) => {
        return (
          <ItemLink
            item={item}
            key={item.code}
          />
        );
      })}
    </ul>
  );
};
