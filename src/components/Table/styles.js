import styled from 'styled-components';
import StyleConstants from '../../styles/StyleConstants';
//   width: ${props => !props.isOpen ? StyleConstants.ASIDE_WIDTH_CLOSED : props.mobileView ? '100vw' : StyleConstants.ASIDE_WIDTH_OPEN};

export const ContBlock = styled.div`
@media (max-width: 650px) {
    overflow: scroll;
}
@media (max-width: 500px) {
    overflow: none;
}
`

export const TableContainer = styled.div`
background-color: white;
padding: 20px, 10px;
@media (max-width: 650px) {
    /* grid-template-columns: 33% 33% 33%; */
    height: auto;
    min-width: 800px;
}
@media (max-width: 500px) {
    overflow: none;
    min-width: 10px;
}
`

export const TableRow = styled.div`
padding: 0 20px;
display: grid;
height: auto;
min-height: 53px;
grid-template-columns: ${props => props.gridCount};
grid-gap: 2%;
border-bottom: 1px dashed #F0F2F5;
/* @media (max-width: 650px) {
    grid-template-columns: 33% 33% 33%;
    height: auto;
} */
@media (max-width: 500px) {
    grid-template-columns: 50% 50%;
    height: auto;
}
`;

export const TableCol = styled.div`
color: ${props => props.color};
text-align: left;
overflow-wrap: break-word;
align-self: center;
font-size: 14px;
font-family: ${StyleConstants.FONT_FAMILY};
font-weight: 500;
@media (max-width: 880px) {
    font-size: 12px;
}
`

export const TextWithBack = styled.span`
padding: 3px 5px;
border-radius: 5px;
background-color: ${props => props.backColor ? props.backColor : '#F5F8FA'};
color: ${props => props.color ? props.color : ''};
font-size: 12px;
`