import React from 'react';

import style from './Header.module.css';

import Logo from '../../assets/twitter-logo.jpg';

const Header = () => {
  return (
    <header>
      <div className={style.logo}>
        <img src={Logo} alt="Twitter Logo" className={style.imgLogo} />
        <h1>Tweets and sweets</h1>
      </div>
    </header>
  );
};

export default Header;
