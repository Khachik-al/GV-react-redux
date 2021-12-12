import styled, { createGlobalStyle } from 'styled-components';
import StyleConstants from './StyleConstants';

/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    background-color: #F5F8FA;
  }

  body {
    font-family: 'Poppins';
  } 

  body.fontLoaded {
    font-family: 'Poppins', 'Inter';
  }

  main {
    padding: 20px 10px;
    overflow-x: hidden;
    flex: 1;
  }

  .content-head-title {
    color: #51545D;
    font-size: 17px;
    font-weight: 500;
    margin: 0;
  }

  .cursorPointer {
    cursor: pointer;
  }
  
  .inputBack{background-color: #EEF3F7;}

  .inputText{
    font-size: 14px;
    font-family: 'Poppins';
  }

  .borderBottomColor {
    border-bottom: solid 1px #EFF2F5;
  }
  
  /*Margins*/
  .pl-1 {
    padding-left: 10px;
  }
  .pr-1 {
    padding-right: 10px;
  }
  .pl-2 {
    padding-left: 15px;
  }
  .pr-2 {
    padding-right: 20px;
  }
  .pb-1 {
    padding-bottom: 10px;
  }
  .pb-2 {
    padding-bottom: 15px;
  }
  .pt-1 {
    padding-top: 10px;
  }
  .ml-2 {
    margin-left: 20px;
  }
  .ml-1 {
	margin-left: 10px;
  }
  .mr-1 {
    margin-right: 10px;
  }
  .mb-0 {
    margin-bottom: 0px;
  }
  .mt-0 {
    margin-top: 0px;
  }
  .mb-1 {
    margin-bottom: 10px;
  }
  .mb-2 {
    margin-bottom: 20px;
  }
  .mt-1 {
    margin-top: 10px;
  }
  .downIcMen:hover{
    background-color: rgb(108 202 255 / 20%) !important;
  }
  .flex{
    display: flex;
  }
  .flex-center{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flex-between{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .stepper.stepper-links .stepper-nav .stepper-item:after {
    content: none !important;
  }
  .css-rnmm7m-MuiPaper-root-MuiDialog-paper{
    border-radius: 12px !important;
  }
  /*_______*/
`;
export const Main = styled.div`
padding-left: 330px;
padding-right: 150px;
@media (max-width: 1600px) {
    padding-right: 100px;
    padding-left: 280px;
}
@media (max-width: 1300px) {
    padding-right: 80px;
    padding-left: 270px;
}
@media (max-width: 800px) {
    padding-right: 5px;
    padding-left: 5px;
}
`

export const MainContent = styled.div`
border-radius: 10px;
background-color: ${StyleConstants.BLOCK_COLOR};
`

export const SortIcon = styled.span`
display: ${props => props.display ? 'inline-table' : 'none'};
`

export const MainSection = styled.section`
  position: absolute;
  left: ${props => props.isMobileView ? 0 : !props.isOpen ? StyleConstants.ASIDE_WIDTH_CLOSED : props.isAuthenticated ? StyleConstants.ASIDE_WIDTH_OPEN : 0};
  transition: ${props => !props.isMobileView ? '.2s' : '0s'};
  padding-right: ${props => props.isMobileView ? 0 : props.isAuthenticated ? StyleConstants.ASIDE_WIDTH_CLOSED : '0px'};
  min-width: 100%;
  max-width: 100%;
  padding-bottom: ${props => props.isMobileView ? '' : props.isAuthenticated ? '90px' : '0px'};
  display: flex;
  flex-direction: column;
  max-height: 100vh;
`;

export const PaginationMain = styled.div`
min-height: 60px; 
padding-top: 10px;
& ul {
  justify-content: right;
}
display: flex;
    place-content: space-between;
/* display: flex;
justify-content: right;
align-items: center; */
`

// div p {
//   background-color: yellow;
// }

export const DashboardWrapper = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  background-color: ${props => props.isAuthenticated ? '#F5F8FA' : 'white'};
  height: ${props => props.isMobile ? '100vh' : props.isAuthenticated ? '88vh' : '100vh'};
`;

export const ContentBody = styled.div`
  padding: 1vw 1.4vw;
`;

export const AlignFlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ForBorder = styled.div`
border: solid 1px ${StyleConstants.BORDER_COLOR};
border-radius: 5px;
`

export const InputTitle = styled.h5`
color: #333333;
padding-left: 0px;
margin-bottom: 5px;
font-family: ${StyleConstants.FONT_FAMILY};
font-weight: 500;
font-size: 18px;
@media (max-width: 880px) {
    font-size: 12px;
}
@media (max-width: 1500px) {
    font-size: 16px;
}

`

export const TitlesFont = styled.h6`
color: #181C32;
font-family: ${StyleConstants.FONT_FAMILY};
font-weight: 600;
font-size: 15px;
`

export const RedFont = styled.span`
color: red;
font-family: ${StyleConstants.FONT_FAMILY};
font-size: ${StyleConstants.TEXT_SIZE};
`

export const InputIconWrapper = styled.div`
  display: flex;

  & .select-icon {
    margin-left: -1px;
  }

  & .MuiInputBase-root, & .MuiSelect-root, & .MuiFormControl-root {
    border-top-right-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
    flex: 1;
  }
`;
