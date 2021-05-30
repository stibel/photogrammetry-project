import styled, { keyframes } from "styled-components";
import Slideshow from "../components/Slideshow";
import { useStyle } from "../contexts/StyleContext";
import { slideshowImages } from "../data/SlideshowData";

const show = keyframes`
  25% {
    text-shadow: 5px 3px #000080
  }
  50% {
    text-shadow: 5px 3px #000080, -5px -3px #BF1C2D
  }
  75% {
    text-shadow: 5px 3px #000080, -5px -3px #BF1C2D, 5px -3px #000080
  }
  100% {
    text-shadow: 5px 3px #000080, -5px -3px #BF1C2D, 5px -3px #000080, -5px 3px #BF1C2D
  }
`

const NameWrapper = styled.div`
  animation: ${show} 2s;
  animation-fill-mode: forwards;
`

const HomeScreen = props => {
  const { curStyle } = useStyle();

  return (
    <div style={{
      ...curStyle.layout,
      backgroundColor: curStyle.colours.steel,
      height: '90vh',
      width: '100vw',
      fontFamily: curStyle.fonts.family
    }}>
      <NameWrapper style={{
        ...curStyle.layout,
        width: '50vw',
        justifyContent: 'center',
        fontSize: curStyle.fonts.size.title,
        color: curStyle.colours.steel
        // textShadow: `5px 3px ${theme.colours.navy}, -5px -3px ${theme.colours.stripes}, 5px -3px ${theme.colours.navy}, -5px 3px ${theme.colours.stripes}`
      }}>
        Mikołaj Siebielec
      </NameWrapper>
      <div style={{
        ...curStyle.layout,
        width: '50vw',
        justifyContent: 'center',
        fontSize: curStyle.fonts.size.title,
        color: curStyle.colours.steel,
      }}>
        <Slideshow data={slideshowImages} />
      </div>
    </div>
  );
}

export default HomeScreen;
