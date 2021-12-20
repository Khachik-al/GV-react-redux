import styled from 'styled-components';

export const DropDownContainer = styled("div")`
  width: 100%;
`;

export const DropDownHeader = styled.div`
  display: flex;
  align-items: center;
  height: 45px;
  border: none;
  border-radius: 5px;
  padding: 0.4em 2em 0.4em 1em;
  font-size: 1.15rem;
  color: #5E6278;
  font-weight: 500;
  background:#F5F8FA;
`;

export const DropDownListContainer = styled.div``;

export const DropDownList = styled.div`
  background: '#FFFFFF';
  max-height: ${props => props.maxHeight ? props.maxHeight : '150px'};
  overflow: auto;
  border: none;
  border-radius: 7px 7px 7px 7px;
  position: absolute;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  color: #5E6278;
  font-weight: 500;
  font-size: 1.15rem;
  width: 100%;
`;

export const ListItem = styled.div`
  background-color: ${props => props.active ? '#EDF4FB' : '#FFFFFF'};
  text-align: left;
  padding: 10px 15px;
  color: #5E6278;
  font-size: 1.15rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: ${props => props.index === 0 ? '7px 7px 0px 0px' : props.lastIndex === props.index ? '0px 0px 7px 7px' : '0px'};
  &:hover{
    background-color :${props => props.active ? '#EDF4FB' : 'rgb(236 247 254)'};
    color: #009EF7;
  }
`;

export const DropDownIcon = styled.div`
  position: absolute;
  right: 12px;
  color: #707273;
`;

export const IconCont = styled.span`
  position: absolute; 
  padding-top: 4px;
  right: 35px; 
`