import React from 'react';

import Logo from '../assets/twitter-logo.jpg';

const Header = () => {
  return (
    <header>
      <div className="flex flex-row justify-center items-center gap-2 p-4">
        <img src={Logo} alt="Twitter Logo" className="h-12 px-2" />
        <h1 className="text-xl font-bold">Tweets and sweets</h1>
      </div>
    </header>
  );
};

export default Header;
