import styled from 'styled-components';
import StyleConstants from '../../styles/StyleConstants';

export const Main = styled.div`
background-color: #FFFFFF;
padding: 0px;
`

export const RowHeader = styled.div`
padding: 5px 30px;
border-bottom: solid 1px #EFF2F5;
font-size: 14px;
font-family: ${StyleConstants.FONT_FAMILY};
font-weight: 600;
display: flex;
justify-content: flex-end;
margin-bottom: 10px;
@media (max-width: 650px) {
  padding: 10px 10px;
  font-size: 5px;
}
`

export const RowBody = styled.div`
display: flex;
flex-direction: column;
padding: ${props => props.isMobile ? '0px' : '0px 10px'};
@media (max-width: 600px) {
  display: block;
}
`

// export const RowBody = styled.div`
// display: grid;
// grid-template-columns: 30% 70%;
// padding: 0px 10px;
// @media (max-width: 600px) {
//   display: block;
// }
// `

export const BodySectionsCol = styled.div`
`

export const BodyValuesCol = styled.div`
`

// export const NumberBlock = styled.div`
// display: inline-block;
// height: 40px;
// width: 40px;
// text-align: center;
// padding-top: 8px;
// background-color: ${props => props.backgroundColor};
// color: ${props => props.color};
// border-radius: 5px;
// `



export const NumberBlock = styled.div`
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color .2s ease, background-color .2s ease;
  width: 40px;
  font-size: 15px;
  font-weight: 600;
  height: 40px;
  border-radius: 0.475rem;
  margin-right: 1.5rem;
  @media (max-width: 600px) {
    margin-right: 0;
    display: inline-flex;
}
`

export const TextBlock = styled.div`
font-size: 1.25rem;
font-weight: 600;
padding-top: 10px;
color: ${props => props.color};
`
export const BackButton = styled.button`
background-color: #F1FAFF;
color: #009EF7;
padding: 5px 10px;
height: 30px;
font-size: 12px;
font-family: ${StyleConstants.FONT_FAMILY};
font-weight: 600;
width: 100px;
border: none;
border-radius: 5px;
outline: none !important;
&:hover {
    background-color: #009EF7;
    color: white;
  }
@media (max-width: 600px) {
  font-size: 10px;
}
`

export const CountinueButton = styled.button`
background-color: ${StyleConstants.BRAND_COLOR};
color: white;
padding: 5px 10px;
font-size: 12px;
height: 30px;
width: 100px;
font-family: ${StyleConstants.FONT_FAMILY};
font-weight: 600;
border: none;
border-radius: 5px;
outline: none !important;
@media (max-width: 600px) {
  font-size: 10px;
}

`

export const IconCont = styled.span`
position: absolute; 
padding-top: 7px;
right: 25px; 
`

// export const DataPicBlock = styled.div`
//    background-color: #F5F8FA;
//    height: 45px;
//    border-radius: 0.475rem;
//    padding-top: 12px;
//  div {
//    input {
//      position:relative;
//      z-index:100;
//     width:100%;
//     background-color: #F5F8FA;
//     border: none;
//     padding: 0 0 0 10px;
//     color: #5E6278;
//     -webkit-transition: color 0.2s ease,background-color 0.2s ease;
//     transition: color 0.2s ease,background-color 0.2s ease;
//     font-size: 1rem;
//     font-family: Poppins;
//     font-weight: 500;
//     line-height: 1.5;
//     outline: none;
//    }
//  }
//  `

export const DataPicBlock = styled.div`
.react-datepicker-wrapper{
  width: 100%;
}
 div {
   input {
    background-color: #F5F8FA;
    border: none;
    border-radius: 0.475rem;
    padding: 0.75rem 1rem;
    padding-right: 40px;
    color: #5E6278;
    -webkit-transition: color 0.2s ease,background-color 0.2s ease;
    transition: color 0.2s ease,background-color 0.2s ease;
    width: 100%;
    font-size: 1rem;
    font-family: Poppins;
    font-weight: 500;
    line-height: 1.5;
    height: 45px;
    outline: none;
   }
 }
`

export const SpanIcon = styled.span`
color: #E3E4EA;
background-color: #5e6278;
display: inline-flex;
border-radius: 10px;
&:hover {
  color:#dff3ff;
  background-color: #009EF7;  
}
`