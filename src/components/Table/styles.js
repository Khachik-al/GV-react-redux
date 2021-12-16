import styled from 'styled-components';
import StyleConstants from '../../styles/StyleConstants';
//   width: ${props => !props.isOpen ? StyleConstants.ASIDE_WIDTH_CLOSED : props.mobileView ? '100vw' : StyleConstants.ASIDE_WIDTH_OPEN};

export const ContBlock = styled.div`
@media (max-width: 1250px) {
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
padding: 11px 0;
color: ${props => props.color};
text-align: left;
overflow-wrap: break-word;
align-self: center;
font-size: ${props => props.fontSize ? props.fontSize : '18px'};
font-family: ${StyleConstants.FONT_FAMILY};
font-weight: 500;
@media (max-width: 1500px) {
    font-size: 14px;
}
@media (max-width: 1200px) {
    font-size: 13px;
}
@media (max-width: 1102px) {
    font-size: 12px;
}
`

export const TextWithBack = styled.span`
padding: 5px 17px;
border-radius: 7px;
background-color: ${props => props.backColor ? props.backColor : '#F5F8FA'};
color: ${props => props.color ? props.color : ''};
font-size: 14px;
@media (max-width: 1500px) {
    font-size: 12px;
}
@media (max-width: 1080px) {
    font-size: 11px;
    padding: 5px 13px;
}
@media (max-width: 1050px) {
    font-size: 11px;
    padding: 5px 12px;
}
`