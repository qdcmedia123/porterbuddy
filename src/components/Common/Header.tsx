import React from 'react';
import { NavBar, A } from '../StyledComponents/NavBar';

const Header:React.FC = () => {
    return (
      <NavBar>
          <A href = "/#/">Countries</A>
          <A href = "/#/languages">Languages</A>
      </NavBar>
    );
};


export default Header;