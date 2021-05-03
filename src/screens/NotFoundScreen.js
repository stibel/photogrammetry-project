import { useHistory } from 'react-router-dom';
import styled, { keyframes } from "styled-components";
import Button from "../styles/Button";
import { useStyle } from "../contexts/StyleContext";
import glass from "../images/glass.svg";

const move = keyframes`
    50% {
      transform: rotate(90deg);
`

const ImageWrapper = styled.img`
  animation: infinite 4s ${move} linear;
`

const NotFoundScreen = props => {
    const {curStyle} = useStyle();
    const history = useHistory();

    const returnHome = () => {
        history.push('/')
    }

    return (
        <div style={{
            ...curStyle.layout,
            flexFlow: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: curStyle.colours.steel,
            height: '90vh',
            width: '100vw',
            fontFamily: curStyle.fonts.family
        }}>
            <ImageWrapper style={{ height: '60%' }} src={glass} alt={'Not found'} />
            <Button onClick={returnHome}>Powrót</Button>
        </div>
    )
}

export default NotFoundScreen;