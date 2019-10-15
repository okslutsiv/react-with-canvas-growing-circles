import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { GlobalStyles } from "./GlobalStyles";

import Circles from "./Circles";

const baseColors = [
  "#026592",
  "#94bfd2",
  "#91a4a2",
  "#247067",
  "#38b1d4",
  "#fcffff",
  "#a18999",
  "#95c092",
  "#88dfe4",
];

const opacities = ["80", "aa", "cc", "ff"];

function App() {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    setDimensions({
      width: container.offsetWidth,
      height: container.offsetHeight,
    });
    const handleWindowResize = () => {
      setDimensions({
        width: container.offsetWidth,
        height: container.offsetHeight,
      });
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <>
      <GlobalStyles></GlobalStyles>
      <Main ref={containerRef}>
        <Circles
          width={dimensions.width}
          height={dimensions.height}
          num={150}
          minRadius={2}
          maxRadius={5}
          velocity={3}
          opacities={opacities}
          colors={baseColors}
        ></Circles>
      </Main>
    </>
  );
}
const Main = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
`;
export default App;
