// Header.js
import React from 'react';
import styled from 'styled-components';
import DarkModeToggle from './DarkModeToggle';
import { Link } from "react-router-dom";

const Nav = styled.div`
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

const NavHeader = styled.div`
  max-width: 1010px;
  padding: 26px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const NavLeft = styled.div`
  width: 33.333%;
  text-align: left;
`;

const NavCenter = styled.div`
  width: 33.333%;
  text-align: center;
`;


const NavRight = styled.div`
  width: 33.333%;
  text-align: right;
 
  svg {
    margin-right: 20px;
  }
`;


function Header() {
  return (
      <Nav className="Header">
        <NavHeader>
          <NavLeft>Speed Typing Game</NavLeft>
          <NavCenter>
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji*/}
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji*/}<Link style={{ color: "red", textDecoration: "none" }} to="/Speed-Typing-Game">🏠</Link>
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji*/}<Link style={{ color: "red", textDecoration: "none" }} to="/settings">⚙️</Link>
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji*/}<Link style={{ color: "red", textDecoration: "none" }} to="/high_scores">🏆</Link>

          </NavCenter>

          <NavRight>
            <DarkModeToggle />
          </NavRight>
        </NavHeader>
      </Nav>
  );
}

export default Header;