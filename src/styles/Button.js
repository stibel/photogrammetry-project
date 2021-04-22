import styled from "styled-components";

    // navy: '#000080',
    // stripes: '#BF1C2D',
    // steel: '#E8E6CE',
    // sky: '#B6D9E1',
    // sea: '#006994'

const Button = styled.div`
  padding: 0;
  margin: 1vw;
  width: 12vw;
  height: 2vw;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 2vh;
  font-family: Bahnschrift, Helvetica, Arial, monospace;
  color: #BF1C2D;
  background-color: #B6D9E1;
  border: solid 0.25vh #BF1C2D;
  
  cursor: pointer;
  @keyframes change{
    100% {
      color: #B6D9E1;
      background-color: #BF1C2D;
      border: solid 0.25vh #B6D9E1;
    }
  }
  
  &:hover {
    animation: change 0.5s;
    -webkit-animation-fill-mode: forwards;
  }
`

export default Button;