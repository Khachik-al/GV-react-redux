import styled from 'styled-components';

export const InputBlock = styled.input`
    background-color: #f5f8fa;
    /* border: ${props => props.require ? '1px solid red' : 'none'}; */
    border: none;
    border-radius: 0.475rem;
    padding-right: 40px;
    color: #5E6278;
    transition: color 0.2s ease, background-color 0.2s ease;
    width: 100%;
    font-weight: 500;
    line-height: 1.5;
    height: 45px;
    outline: none;
    padding: 0.825rem 1.2rem;
    /* padding-right: ${props => props.require ? '35px' : '1.2rem'}; */
    font-size: 1.15rem;
    &:focus {
       background-color: #EEF3F7;
    }
`

export const IconCont = styled.span`
  position: absolute; 
  padding-top: 10px;
  right: 24px; 
`