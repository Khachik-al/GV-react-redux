import styled from 'styled-components';
import StyleConstants from '../../styles/StyleConstants';

export const IconCont = styled.span`
position: absolute; 
padding-top: 7px;
right: 25px; 
`

export const ValidationFont = styled.span`
color: #495057;
font-family: ${StyleConstants.FONT_FAMILY};
font-size: ${StyleConstants.TEXT_SIZE};
`

export const TabText = styled.span`
color: ${props => props.color};
padding-top: 1.25rem;
padding-bottom: 1.25rem;
font-weight: 600;
border-bottom: solid 2px ${props => props.color};
&:hover{
    border-bottom: solid 2px ${StyleConstants.BRAND_COLOR};
}
`