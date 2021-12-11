import styled from 'styled-components';
import StyleConstants from '../../styles/StyleConstants';

export const MainContent = styled.div`
text-align: center;
padding-top: 1%;
box-sizing: border-box;
@media (max-width: 800px) {
    padding-top: 20%;
}
`

export const ValidationFont = styled.span`
color: #495057;
font-family: ${StyleConstants.FONT_FAMILY};
font-size: ${StyleConstants.TEXT_SIZE};
`

export const MainRow = styled.div`
width: 30%;
display: inline-block;
padding-top: 30px;
padding-bottom: 30px;
padding-left: 2%;
padding-right: 2%;
background-color: #FFFFFF;
box-shadow: 0 0.1rem 1rem 0.25rem rgb(0 0 0 / 5%);
border-radius: 5px;

@media (max-width: 1100px) {
    width: 50%;
}

@media (max-width: 800px) {
    width: 60%;
}

@media (max-width: 600px) {
    width: 82%;
}
`

export const LogButton = styled.button`
background-color: #2cadf5;
font-weight: 500;
font-size:  1.15rem;
font-family: ${StyleConstants.FONT_FAMILY};
border-radius: 5px;
color: white;
width: 100%;
height: 45px;
border: none;
outline: none !important;
&:hover {
    background-color: #0ea1f3;
  }
`

export const ForgotePass = styled.span`
cursor: pointer;
color: #009ef7;
font-size: 13px;
font-weight: 600;
font-family: ${StyleConstants.FONT_FAMILY};
`

export const InputTitle = styled.label`
color: #181c32;
--bs-text-opacity: 1;
padding-left: 0px;
margin-bottom: 5px;
font-family: ${StyleConstants.FONT_FAMILY};
font-weight: 600;
font-size: 13px;
`

export const LogIcon = styled.div`
    color: #7e8299;
    background-color: #f5f8fa;
    justify-content: center;
    height: 45px;
    padding-top: 10px;
    cursor: pointer;
    font-weight: 500;
    font-size: 1.15rem;
    font-family: ${StyleConstants.FONT_FAMILY};
    border-radius: 5px;
    width: 100%;
    border: none;
    &:hover {
    background-color: #e5e9eb;
    }
`

export const Or = styled.div`
color: #a1a5b7;
text-align: center;
font-weight: 600;
font-size: 0.8rem;;
font-family: ${StyleConstants.FONT_FAMILY};
`

export const SignIn = styled.h1`
color: #181c32;
font-family: ${StyleConstants.FONT_FAMILY};
font-size: 25px;
@media (max-width: 600px) {
    font-size: 20px;
  }
`