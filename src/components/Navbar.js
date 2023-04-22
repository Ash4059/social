import styles from '../styles/navbar.module.css';
import Profile from '../static/gif/man.png';
import Search from '../static/gif/search.png';
import {Link} from 'react-router-dom';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { searchUser } from '../api';

const Navbar = () => {

  const [result, setResult] = useState([]);
  const [searchText, setSearchText] = useState('');
  const auth = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await searchUser(searchText);

      if(response.success){
        setResult(response.data.users);
      }
    };

    if(searchText.length > 2){
      fetchUsers();
    }else{
      setResult([]);
    }

  }, [searchText])

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <img 
          className={styles.searchIcon}
          alt='Search'
          src={Search}
        />
        <input placeholder='Search users' value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} />

        {
          result.length > 0 && 
          <div className={styles.searchResults}>
            <ul>
              {result.map(user => <li 
                className={styles.searchResultsRow}
                key={`user-${user._id}`}
              >
                <Link to={`user/${user._id}`} onClick={(e) => {setResult([]); setSearchText('')}}>
                  <img src={Profile} alt='Profile' />
                  <span>{user.name}</span>
                </Link>
              </li>)}
            </ul>
          </div>
        }
      </div>

      <div className={styles.rightNav}>
        {
          auth.user ? (
            <div className={styles.user}>
              <Link to="/settings">
                <img
                  src={Profile}
                  alt=""
                  className={styles.userDp}
                />
              </Link>
              <span>{auth.user.name}</span>
            </div>
          ) : (<></>)
        }


        <div className={styles.navLinks}>
          <ul>
            {
              auth.user ? (
                <li>
                  <Link onClick={auth.logout}>Log out</Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/login">Log in</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign Up</Link>
                  </li>
                </>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
