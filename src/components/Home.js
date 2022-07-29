import React from "react";
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Recommends from "./Recommends";
import Viewers from "./Viewers";
import NewDisney from "./NewDisney";
import Original from "./Original";
import Trending from "./Trending";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movies/movieSlice";
import { selectUserName } from "../features/users/userSlice";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let newDisneys = [];
  let original = [];
  let trending = [];

  useEffect(() => {
    db.collection("movie").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        switch (doc.data().type) {
          case "recommend":
            recommends = [...recommends, { id: doc.id, ...doc.detail }];
            break;
          case "new":
            newDisneys = [...newDisneys, { id: doc.id, ...doc.detail }];
            break;
          case "original":
            original = [...original, { id: doc.id, ...doc.detail }];
            break;
          case "trending":
            trending = [...trending, { id: doc.id, ...doc.detail }];
            break;
          default:
            //Nothing
            break;
        }
      });
    });

    dispatch(
      setMovies({
        recommend: recommends,
        newDisney: newDisneys,
        original: original,
        trending: trending,
      })
    );
  }, [userName]);

  return (
    <>
      <Container>
        <ImgSlider />
        <Viewers />
        <Recommends />
        <NewDisney />
        <Original />
        <Trending />
      </Container>
    </>
  );
};

const Container = styled.main`
  position: relative;
  display: block;
  top: 72px;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") no-repeat center fixed;
    content: "";
    position: absolute;
    inset: 0;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
