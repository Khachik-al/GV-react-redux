import styled from 'styled-components';

export const DropDownContainer = styled("div")`
  width: 100%;
`;

export const DropDownHeader = styled.div`
  font-family: 'Roboto';
  display: flex;
  align-items: center;
  height: 35px;
  border: none;
  border-radius: 5px;
  padding: 0.4em 2em 0.4em 1em;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 500;
  font-family: 'Poppins';
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  background:#F6F8FA;
  
  @media (max-width: 1300px) {
      font-size:14px;
  }
  @media (max-width: 800px) {
      font-size:12px;
  }
`

export const DropDownListContainer = styled.div``;

export const DropDownList = styled.div`
  background: '#F6F8FA';
  max-height: 150px;
  overflow: auto;
  border: none;
  border-radius: 7px 7px 7px 7px;
  position: absolute;
  z-index: 1000;;
  box-sizing: border-box;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 400;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  @media (max-width: 1600px) {
      font-size:16px;
  }
  @media (max-width: 1300px) {
      font-size:14px;
  }
  @media (max-width: 800px) {
      font-size:12px;
  }
`;

export const ListItem = styled.div`
font-family: 'Roboto';
  background-color: ${props => props.active ? '#EDF4FB' : '#FFFFFF'};
  text-align: left;
  padding: 5px 15px;
  color: rgba(0, 0, 0, 0.87);
  cursor: pointer;
  font-weight: 500;
  font-family: 'Poppins';
  border-radius: ${props => props.index === 0 ? '7px 7px 0px 0px' : props.lastIndex === props.index ? '0px 0px 7px 7px' : '0px'};
  &:hover{
    background-color :${props => props.active ? '#EDF4FB' : 'rgb(236 247 254)'};
    color: #009EF7;
  }
  font-size: 16px;
  @media (max-width: 1600px) {
      font-size:16px;
  }
  @media (max-width: 1300px) {
      font-size:14px;
  }
  @media (max-width: 800px) {
      font-size:12px;
  }
`;

export const DropDownIcon = styled.div`
  position: absolute;
  right: 14px;
  font-size: 11.3px;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 400;
  @media (max-width: 1600px) {
      font-size:14px;
  }
  @media (max-width: 1300px) {
      font-size:12px;
  }
`;

export const IconCont = styled.span`
  position: absolute; 
  padding-top: 4px;
  right: 35px; 
`