import styled from 'styled-components';

export const ActionsBlock = styled.div`
display: grid;
grid-template-columns: 50% 50%;
@media (max-width: 600px) {
    display: block;
    margin-bottom: 15px;
}
`
export const CreateBlock = styled.div`
text-align: right;
`

export const SearchBlock = styled.div`
position: relative;
`