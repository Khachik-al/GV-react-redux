import styled from 'styled-components';
import StyleConstants from '../../styles/StyleConstants';
//   width: ${props => !props.isOpen ? StyleConstants.ASIDE_WIDTH_CLOSED : props.mobileView ? '100vw' : StyleConstants.ASIDE_WIDTH_OPEN};

export const FilterBut = styled.button`
display: inline-block;
font-weight: 500;
line-height: 1.5;
color: #009EF7;
text-align: center;
vertical-align: middle;
cursor: pointer;
user-select: none;
border: 1px solid transparent;
padding: 0.75rem 1.5rem;
font-size: 1.1rem;
border-radius: 0.475rem;
padding: calc(0.75rem + 1px) calc(1.5rem + 1px);
outline: none !important;
@media (max-width: 550px) {
    padding: 0.45rem 1rem;
}
&:hover {
    background-color: #009EF7;
    color: white;
  }
@media (max-width: 600px) {
display: block;
}
background-color: #F1FAFF;
color: #009EF7;

`

export const FilterBody = styled.div`
width: 300px;
padding-bottom: 15px;
`

export const ParagraphText = styled.p`
color: ${props => props.color};
margin: 0;
font-size: ${StyleConstants.TEXT_SIZE};
font-weight: 600;
font-family: ${StyleConstants.FONT_FAMILY};
`

export const ApplyBut = styled.button`
background-color: #009EF7;
color: white;
padding: 5px 10px;
height: 30px;
font-size: 12px;
font-family: ${StyleConstants.FONT_FAMILY};
font-weight: 600;
width: 100%;
border: none;
border-radius: 5px;
outline: none !important;
&:hover {
    background-color: #0088d5;
  }
`

export const ResetBut = styled.button`
background-color: #F5F8FA;
color: #898CA2;
padding: 5px 10px;
height: 30px;
font-size: 12px;
font-family: ${StyleConstants.FONT_FAMILY};
font-weight: 600;
width: 100%;
border: none;
border-radius: 5px;
outline: none !important;
&:hover {
    color: #009EF7;
  }
`