import styled from 'styled-components';
import StyleConstants from '../../styles/StyleConstants';

export const MainContent = styled.div`
padding: 100px 50px;
@media (max-width: 900px) {
    padding: 50px 20px;
}
@media (max-width: 500px) {
    padding: 10px;
}
`

export const Texts = styled.div`
color: ${props => props.color};
font-size: ${props => props.fSize};
font-weight: 600;
font-family: ${StyleConstants.FONT_FAMILY};
`

export const GridCol = styled.div`
display: grid;
grid-template-columns: ${props => props.columns};
`

export const ViewButton = styled.button`
font-size: 10px;
background-color: #F5F8FA;
color: #8982B2;
border: none;
padding: 2px 7px;
font-family: ${StyleConstants.FONT_FAMILY};
border-radius: 2px;
&:hover {
    background-color: #e3e3e3;
  }
`
export const InvitNew = styled.div`
border: 1px solid #26ACF8;
border-style: dashed;
background-color: #F1FAFF;
padding: 10px
`