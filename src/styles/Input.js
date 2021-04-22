import styled from "styled-components";

const Input = styled.input`
 background-color: #B6D9E1;
 border: 3px solid #BF1C2D;
 font-family: Bahnschrift, Helvetica, Arial, monospace;
 font-size: 2vh;
 color: #BF1C2D;
 text-align: center;  
  
 @keyframes change{
   100% { background-color: #E8E6CE; }
 }
  
  &:focus {
    animation: change 500ms;
    animation-fill-mode: forwards;
  }
`

export default Input