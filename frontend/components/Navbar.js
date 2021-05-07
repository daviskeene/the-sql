import React from 'react';
import styled from "styled-components";
import { useRouter } from 'next/router';
import { signin, signout, useSession } from 'next-auth/client';

// NavBar Styles
const NavWrapper = styled.nav`
    height: 4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${({theme}) => (useRouter().pathname === '/') ? theme.darkBlue : 'white'};
    z-index: 1;
    position: relative;
    .menu {
        width: 50%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    
    .menu a {
        text-decoration: none;
        color: ${({theme}) => useRouter().pathname === '/' ? 'white' : 'black'};
        text-transform: uppercase;
        font-weight: bold;
        position: relative;
        @media only screen and (max-width: 600px) {
            font-size: .75rem;
            padding: .75rem;
        }
    }
    .menu a:before {
        content: '';
        position: absolute;
        left: 0;
        top: 100%;
        width: 0;
        height: 3px;
        background-color: #000;
        transition: all 0.20s linear;
    }
    .menu a:hover:before {
        width: 100%;
        background-color: ${({ theme }) => theme.foundersOrange};
    }
    .menuItem:hover {
            .teamMenu {
            display: block;
            }
        }
    }
`;

const Logo = styled.div`
  img {
    max-width: 25%;
    height: auto;
    float: left;
    margin-top: 1rem;
  }

  h1 {
    font-size: 3rem;
    float: right;
  }
  p {
    color: ${({theme}) => useRouter().pathname === '/' ? 'white' : 'black'};
    margin-left: 4rem;
    font-size: 1.5rem;
    font-weight: bold;
  }
`

// Navbar
const Navbar = ( props ) => {
  const [session, loading] = useSession();

  return (
      <NavWrapper>
          <Logo>
            <a href="/">
              <p>The SQL</p>
            </a>
          </Logo>

          <div className={"menu"}>
              <a href="/about">About</a>
              <a href="/sandbox">Sandbox</a>
              <a href="/classrooms">Classrooms</a>
              {session && <a href="/profile">Profile</a>}
              {!session ? <a href="/api/auth/signin/">Sign In</a> : <a href="/api/auth/signout/">Sign Out</a>}
          </div>
      </NavWrapper>
  )
};

export default Navbar;