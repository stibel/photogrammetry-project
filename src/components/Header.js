import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useStyle } from "../contexts/StyleContext";
import { ROUTES } from "../globals/ROUTES";
import Clock from "./Clock";

const ItemWrapper = styled.div`
  @keyframes shadow{
    100% {
      text-shadow: 5px 3px #000080, -5px -3px #BF1C2D;
    }
  }

  &:hover {
    animation: shadow 300ms;
    -webkit-animation-fill-mode: forwards;
  }
`

const Item = props => {
    const { curStyle } = useStyle();
    return (
        <ItemWrapper style={{ ...curStyle.layout, marginLeft: '5%', fontWeight: 'bold' }}>
            <NavLink
                style={{
                    textDecoration: 'none',
                    fontFamily: curStyle.fonts.family,
                    fontSize: curStyle.fonts.size.xl,
                    color: curStyle.colours.steel
                }}
                activeStyle={{
                    textShadow: '5px 3px ' + curStyle.colours.navy + ' , -5px -3px ' + curStyle.colours.stripes
                }}
                exact to={props.dest}>
                {props.children}
            </NavLink>
        </ItemWrapper>
    );
}

const Header = props => {
    const { curStyle } = useStyle();
    return (
        <div style={{
            ...curStyle.layout,
            height: '10vh',
            maxWidth: '100vw',
            flexFlow: 'row',
            justifyContent: 'center',
            backgroundColor: curStyle.colours.sea

        }}>
            <div style={{
                ...curStyle.layout,
                height: 'inherit',
                width: '85vw',
                flexFlow: 'row',
                justifyContent: 'left'
            }}>
                <Item dest={ROUTES.MAIN.url}>
                    {props.destFirst}
                </Item>
                <Item dest={ROUTES.PARAMETERS.url}>
                    {props.destSecond}
                </Item>
                {/* <Item dest={ROUTES.RESULT.url}>
                    {props.destThird}
                </Item> */}
            </div>
            <div style={{
                ...curStyle.layout,
                width: '15vw',
                justifyContent: 'right'
            }}>
                <Clock />
            </div>
        </div>
    )
}

export default Header