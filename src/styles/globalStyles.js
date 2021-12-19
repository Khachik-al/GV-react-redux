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
  .css-1to7aaw-MuiButtonBase-root-MuiPaginationItem-root{
    border-radius: 4px !important;
    min-width: 27px !important;
    height: 27px !important;
    font-size:18px !important;

    @media (max-width: 1600px) {
      font-size:16px !important;
    }
    @media (max-width: 1300px) {
      font-size:14px !important;
    }
    @media (max-width: 800px) {
      font-size:12px !important;
    }
  }
  .css-1to7aaw-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected{
    background-color:#469CF0 !important;
  }
  .Toastify__progress-bar {
  transform-origin: right !important;
  }
  .react-datepicker__header{
    background-color: #fff;
    border-bottom: none;
    /* background-color:#F5F8FA;
    border-bottom:1px solid #EFF2F5; */
  }
  .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
    width: 2rem;
  }
  .react-datepicker{
    /* border: 1px solid #393d42; */
    border: none;
    font-size: 12px;
    font-family: Popins;
    box-shadow: 0 3px 11px rgba(0, 0, 0, 0.15);
  }
  .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle, .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before{
    display: none;
  }
  .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle, .react-datepicker__year-read-view--down-arrow, .react-datepicker__month-read-view--down-arrow, .react-datepicker__month-year-read-view--down-arrow, .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle::before, .react-datepicker__year-read-view--down-arrow::before, .react-datepicker__month-read-view--down-arrow::before, .react-datepicker__month-year-read-view--down-arrow::before {
    display: none;
    border-bottom: none;
    border-top-color: #fff;
  }
  .react-datepicker-popper[data-placement^="bottom"] {
    margin-top: 3px;
  }
  .react-datepicker-popper[data-placement^="top"] {
    margin-bottom: 3px;
    transform: translate3d(15px, -185px, 0px);
  }
  .react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker-year-header {
    margin-top: 0;
    color: #000;
    font-weight: bold;
    font-size: 1.1rem;
}
.stepper-title{
  font-size: 15px !important;
  @media (max-width: 1500px) {
    font-size: 14px !important;
  }
  @media (max-width: 880px) {
    font-size: 12px !important;
  }
  
 }
.css-3bmhjh-MuiPaper-root-MuiPopover-paper{
    top: 68px !important;
  }
  /*_______*/
`;
export const Main = styled.div`
padding-left: 250px;
padding-right: 90px;
@media (max-width: 1300px) {
    padding-right: 40px;
    padding-left: 220px;
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
padding-left: 18px;
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
font-size: 16px;
@media (max-width: 1500px) {
    font-size: 14px;
}
@media (max-width: 880px) {
    font-size: 12px;
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
