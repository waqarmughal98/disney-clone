import React, { useEffect } from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserName,
  selectUserPhoto,
  setSignoutState,
  setUserLoginDetail,
} from "../features/users/userSlice";
import { useNavigate } from "react-router";

const Header = () => {
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        nagivate("/home");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  const handleAuth = () => {
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignoutState());
          nagivate("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetail({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };
  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo>
      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <a href="/">
              <img src="/images/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </a>
            <a href="/">
              <img src="/images/search-icon.svg" alt="SEARCH" />
              <span>SEARCH</span>
            </a>
            <a href="/">
              <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </a>
            <a href="/">
              <img src="/images/original-icon.svg" alt="ORIGINALS" />
              <span>ORIGINALS</span>
            </a>
            <a href="/">
              <img src="/images/movie-icon.svg" alt="MOVIES" />
              <span>MOVIES</span>
            </a>
            <a href="/">
              <img src="/images/series-icon.svg" alt="SERIES" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={handleAuth}>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  background-color: rgb(9, 11, 19);
  width: 100%;
  letter-spacing: 2.5px;
  top: 0;
  right: 0;
  left: 0;
  padding: 0 36px;
  z-index: 3;
`;

const Logo = styled.a`
  width: 80px;
  max-height: 70px;
  padding: 0;
  margin-top: 4px;
`;

const Login = styled.a`
  padding: 6px 8px;
  text-transform: uppercase;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 0.4s ease-out;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const NavMenu = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  margin: 0;
  padding: 0;
  margin-left: 25px;
  margin-right: auto;
  position: relative;
  justify-content: flex-end;

  a {
    display: flex;
    align-items: center;
    padding: 0 15px;

    img {
      height: 20px;
      width: 20px;
      min-width: 20px;
      margin-right: 5px;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      line-height: 1;
      padding: 2px 0;
      letter-spacing: 1.5px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        right: 0px;
        left: 0px;
        opacity: 0;
        position: absolute;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        visibility: visible;
        transform: scaleX(1);
        opacity: 1 !important;
      }
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background-color: rgb(19, 19, 19);
  border: 1px solid rgb(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 101px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
  }
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
