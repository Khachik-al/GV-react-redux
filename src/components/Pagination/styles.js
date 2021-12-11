import styled from 'styled-components';

export const MainContent = styled.div`
display: grid;
grid-template-columns: 50% 50%;
@media (max-width: 1000px) {
  display: block;
}
`

export const PageBlock = styled.span`
width: 25px;
height: 20px;
text-align: center;
border-radius: 50%;
background-color: ${props => props.backgroundColor};
color: ${props => props.color};
display: inline-table;
cursor: pointer;
margin-right: 5px;
&:hover {
    background-color: #7cc4f1;
    color: white;
  }
  @media (max-width: 600px) {
    display: block;
    width: 18px;
height: 20px;
font-size: 15px;
  }
`

export const ButtonSpan = styled.span`
display: inline-table;
cursor: pointer;
border-radius: 5px;
&:hover {
    background-color: #f1f1f1;
    color: black;
  }
`