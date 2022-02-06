import styled from 'styled-components';
import StyleConstants from '../../styles/StyleConstants';

export const GridMain = styled.div`
display: grid;
grid-template-columns: 80% 18%;
@media (max-width: 1400px) {
  display: block;
}
`

export const SectionsBlock = styled.div`
background-color: white;
padding: 30px 20px;
border-radius: 12px;
margin-bottom: 50px;
@media (max-width: 600px) {
    padding: 10px 0px;
    margin-bottom: 20px;
}
`

export const SectionsTitle = styled.div`
color: #469CF0;
font-family: 'Poppins';
font-size: 20px;
font-weight: 600;
`

export const FixedBlock = styled.div`
position: fixed;
padding: 10px 0px;
background-color: white;
width: auto;
max-width: 300px;
height: auto;
@media (max-width: 1400px) {
  display: block;
  position: static;
  width: 100%;
  padding: 10px 10px;
  max-width: none;
}
`

export const UpdateButton = styled.button`
background-color: ${StyleConstants.BRAND_COLOR};
width: 100%;
color: white;
padding: 5px 10px;
font-size: 12px;
height: 30px;
font-family: ${StyleConstants.FONT_FAMILY};
font-weight: 600;
border: none;
border-radius: 5px;
outline: none !important;
`

export const CompletedButton = styled.button`
background-color: ${props => props.backColor};
color: ${props => props.color};
padding: 5px 10px;
font-size: 12px;
height: 30px;
font-family: ${StyleConstants.FONT_FAMILY};
font-weight: 600;
border: none;
border-radius: 5px;
outline: none !important;
&:hover {
    background-color: #adfbd2;
    color: white;
  }
`