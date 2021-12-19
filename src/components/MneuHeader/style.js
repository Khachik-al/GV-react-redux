import styled from 'styled-components';
import StyleConstants from '../../styles/StyleConstants';

export const MainContent = styled.div`
/* position: fixed; */
background-color: white;
margin-bottom: 10px;
padding-top: 22px;
min-height: 100px;
max-height: 100px;
padding-left: 365px;
padding-right: 80px;
box-shadow: 0 0.1rem 1rem 0.25rem rgb(0 0 0 / 5%);
@media (max-width: 1600px) {
    padding-right: 80px;
    padding-left: 365px;
}
@media (max-width: 1300px) {
    padding-right: 30px;
    padding-left: 330px;
    padding-top: 22px;
}
@media (max-width: 800px) {
    padding-right: 5px;
    padding-left: 80px;
    min-height: 80px;
    max-height: 80px;
    padding-top: 15px;
    
}
`

export const AccountButton = styled.span`
background-color: white;
color: grey;
font-size: 13px;
cursor: pointer;
`

export const DropItem = styled.div`
padding: 2px 5px;
font-size: 0.9rem;
font-weight: 500;
min-width: 150px;
cursor: pointer;
color: #3f4254;
display: flex;
border-radius: 5px;
align-items: center;
flex: 0 0 100%;
padding: 0.65rem 1rem;
transition: none;
outline: 0;
&:hover {
  background-color: #f6f6f6;
  color: ${StyleConstants.BRAND_COLOR};
}
`

// &:hover {
//   color: #009EF7;
// }

export const UpdateButton = styled.button`
background-color: ${StyleConstants.BRAND_COLOR};
color: white;
padding: 5px 10px;
font-size: 12px;
font-family: ${StyleConstants.FONT_FAMILY};
font-weight: 600;
border: none;
border-radius: 5px;
outline: none !important;
`

export const BellButton = styled.div`
background-color: #F6F8FA;
width: 40px;
height: 40px;
cursor: pointer;
border-radius: 50px;
color: black;
display: flex;
justify-content: center;
align-items: center;

@media (max-width: 800px) {
  height:35px;
}
`

export const ContentIcons = styled.div`
display: inline-block;
`
export const IconsText = styled.span`
font-size: 11px;
font-family: ${StyleConstants.FONT_FAMILY};
font-weight: 500;
`
export const SearchMainBlock = styled.div`
/* padding-left: 105px; */

/* @media (min-width: 992px) {
    padding-left: 105px;
}

@media (max-width: 1300px) {
  padding-left: 110px;
}

@media (max-width: 1000px) {
  padding-left: 130px;
} */
`


// import styled from 'styled-components';
// import StyleConstants from '../../styles/StyleConstants';

// export const MainContent = styled.div`
// background-color: white;
// margin-bottom: 10px;
// padding-top: 20px;
// min-height: 80px;
// max-height: 80px;
// padding-left: 20px;
// box-shadow: 0 0.1rem 1rem 0.25rem rgb(0 0 0 / 5%);
// padding-right: 170px;
// @media (max-width: 1300px) {
//     padding-right: 100px;
//     padding-left: 20px;
// }
// @media (max-width: 800px) {
//     padding-right: 5px;
//     padding-left: 80px;
// }
// `

// export const AccountButton = styled.span`
// background-color: white;
// color: grey;
// font-size: 13px;
// cursor: pointer;
// `

// export const DropItem = styled.div`
// padding: 2px 5px;
// font-size: 0.9rem;
// font-weight: 500;
// min-width: 150px;
// cursor: pointer;
// color: #3f4254;
// display: flex;
// border-radius: 5px;
// align-items: center;
// flex: 0 0 100%;
// padding: 0.65rem 1rem;
// transition: none;
// outline: 0;
// &:hover {
//   background-color: #f6f6f6;
//   color: ${StyleConstants.BRAND_COLOR};
// }
// `

// // &:hover {
// //   color: #009EF7;
// // }

// export const UpdateButton = styled.button`
// background-color: ${StyleConstants.BRAND_COLOR};
// color: white;
// padding: 5px 10px;
// font-size: 12px;
// font-family: ${StyleConstants.FONT_FAMILY};
// font-weight: 600;
// border: none;
// border-radius: 5px;
// outline: none !important;
// `

// export const BellButton = styled.div`
// background-color: rgb(249 249 249);
// width: 35px;
// height: 35px;
// cursor: pointer;
// border-radius: 50px;
// color: black;
// text-align: center;
// padding-top: 7px;
// `

// export const ContentIcons = styled.div`
// display: inline-block;
// `
// export const IconsText = styled.span`
// font-size: 11px;
// font-family: ${StyleConstants.FONT_FAMILY};
// font-weight: 500;
// `
// export const SearchMainBlock = styled.div`

// @media (min-width: 992px) {
//     padding-left: 105px;
// }

// @media (max-width: 1300px) {
//   padding-left: 110px;
// }

// @media (max-width: 1000px) {
//   padding-left: 130px;
// }
// `