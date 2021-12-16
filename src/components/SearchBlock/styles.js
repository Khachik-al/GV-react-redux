import styled from 'styled-components';
import StyleConstants from '../../styles/StyleConstants';

export const SearchBlockRow = styled.div`
position: relative;
.input--icon {
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
`

export const InputBlock = styled.input`
padding-left: 50px;
border-radius: 10px;
height: 52px;
width: ${props => props.width ? props.width : ''};
background-color: ${StyleConstants.BODY_BACKGROUND};
border: none;
outline: none;
font-size: 15px;
font-family: ${StyleConstants.FONT_FAMILY};
&:hover {
  background-color: #ebebeb;
}
@media (max-width: 800px) {
  width: 120px;
  height: 35px;
}
`