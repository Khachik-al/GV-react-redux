import styled from 'styled-components';
import StyleConstants from '../../styles/StyleConstants';
//   width: ${props => !props.isOpen ? StyleConstants.ASIDE_WIDTH_CLOSED : props.mobileView ? '100vw' : StyleConstants.ASIDE_WIDTH_OPEN};

export const AddBut = styled.button`
display: inline-block;
font-weight: 500;
line-height: 1.5;
color: #181C32;
text-align: center;
vertical-align: middle;
cursor: pointer;
user-select: none;
background-color: transparent;
border: 1px solid transparent;
padding: 0.75rem 1.5rem;
font-size: 1.1rem;
border-radius: 0.475rem;
padding: calc(0.75rem + 1px) calc(1.5rem + 1px);
background-color: ${StyleConstants.BRAND_COLOR};
color: white;
outline: none !important;
@media (max-width: 550px) {
    padding: 0.45rem 1rem;
}
`