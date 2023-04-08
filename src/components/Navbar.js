import styles from '../styles/navbar.module.css';
import Profile from '../static/gif/man.png';
import {Link} from 'react-router-dom';
import { useAuth } from '../hooks';

const Navbar = () => {

  const auth = useAuth();

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

      <div className={styles.rightNav}>
        {
          (
            () => {
              if(auth.user){
                return (
                  <div className={styles.user}>
                    <Link to="/user">
                      <img
                        src={Profile}
                        alt=""
                        className={styles.userDp}
                      />
                    </Link>
                    <span>{auth.user.name}</span>
                  </div>
                );
              }
            }
          ) 
        }

        <div className={styles.navLinks}>
          <ul>
            {
              auth.user ? (
                <li>
                  <Link onClick={auth.logout} to="/logout">Log out</Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/login">Log in</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
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
