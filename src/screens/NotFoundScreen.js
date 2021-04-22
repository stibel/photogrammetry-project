import { useContext } from "react";
import { useHistory } from 'react-router-dom';
import styled, { keyframes } from "styled-components";
import { StyleContext } from "../styles/StyleContext";
import glass from "../images/glass.svg";
import Button from "../styles/Button";

const move = keyframes`
    50% {
      transform: rotate(90deg);
`

const ImageWrapper = styled.img`
  animation: infinite 4s ${move} linear;
`

const NotFoundScreen = props => {
    const theme = useContext(StyleContext)
    const history = useHistory();

    const returnHome = () => {
        history.push('/')
    }

    return (
        <div style={{
            ...theme.layout,
            flexFlow: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: theme.colours.steel,
            height: '90vh',
            width: '100vw',
            fontFamily: theme.fonts.family
        }}>
            <ImageWrapper src={glass} alt={'Not found'} />
            <Button onClick={returnHome}>Powrót</Button>
        </div>
    )
}

export default NotFoundScreen;