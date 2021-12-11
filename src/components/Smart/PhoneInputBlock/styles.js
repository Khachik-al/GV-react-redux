import styled from 'styled-components';

export const PhoneBlock = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    background-color: #F5F8FA;
    border: ${props => props.require ? '1px solid red' : 'none'};
    appearance: none;
    border-radius: 0.475rem;
    padding-left: 1rem;
    color: #5E6278;
    transition: color 0.2s ease, background-color 0.2s ease;
    width: 100%;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
    height: 45px;
    outline: none;
    /* font-family: unset; */
    &:focus {
       background-color: #EEF3F7;
    }
`