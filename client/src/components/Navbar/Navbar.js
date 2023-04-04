import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const Navbar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <nav className='navbar navbar-expand-lg bg-info navbar-dark mb-3'>
      <div className='container-fluid'>
        <NavLink
          className='navbar-brand'
          to='/'
        >
          S-Link
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse'
          id='navbarNavAltMarkup'
        >
          <div className='navbar-nav'>
            <NavLink
              className='nav-link'
              to='/links'
            >
              Links
            </NavLink>
            <NavLink
              className='nav-link'
              to='/create'
            >
              Create
            </NavLink>
            <NavLink
              className='nav-link'
              to='/setting'
            >
              Setting
            </NavLink>
            <a
              className='nav-link'
              href='/'
              onClick={logout}
            >
              Exit
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
