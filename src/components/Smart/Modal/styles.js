import styled from 'styled-components';
import StyleConstants from '../../../styles/StyleConstants';

export const RowHeader = styled.div`
padding: 20px 20px;
border-bottom: solid 1px #EFF2F5;
font-size: 14px;
font-family: ${StyleConstants.FONT_FAMILY};
font-weight: 600;
display: flex;
justify-content: space-between;
margin-bottom: 30px;
@media (max-width: 650px) {
  padding: 10px 10px;
}
`