import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../globals/ROUTES";
import styled from "styled-components";

import Clock from "./Clock";
import {StyleContext} from "../styles/StyleContext";

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
    const theme = useContext(StyleContext)
    return (
        <ItemWrapper style={{...theme.layout, marginLeft: '5%', fontWeight: 'bold'}}>
            <NavLink
                style={{
                    textDecoration: 'none',
                    fontFamily: theme.fonts.family,
                    fontSize: theme.fonts.size.xl,
                    color: theme.colours.steel
                }}
                activeStyle={{
                    textShadow: '5px 3px ' + theme.colours.navy + ' , -5px -3px ' + theme.colours.stripes
                }}
                exact to={props.dest}>
                {props.children}
            </NavLink>
        </ItemWrapper>
    );
}

const Header = props => {
    const theme = useContext(StyleContext)
    return (
            <div style={{
                ...theme.layout,
                height: '10vh',
                width: '100vw',
                flexFlow: 'row',
                justifyContent: 'center',
                backgroundColor: theme.colours.sea
            }}>
                <div style={{
                    ...theme.layout,
                    height: 'inherit',
                    width: '85vw',
                    flexFlow: 'row',
                    justifyContent: 'left'
                }}>
                    <Item dest={ROUTES.MAIN.url}>
                            {props.destFirst}
                    </Item>
                    <Item dest={ROUTES.EQUIPMENT.url}>
                            {props.destSecond}
                    </Item>
                    <Item dest={ROUTES.RESULT.url}>
                        {props.destThird}
                    </Item>
                </div>
                <div style={{
                    ...theme.layout,
                    width: '15vw',
                    justifyContent:'right'
                }}>
                    <Clock />
                </div>
            </div>
    )
}

export default Header