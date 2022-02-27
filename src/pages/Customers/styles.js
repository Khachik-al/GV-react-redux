import styled from 'styled-components';

export const ActionsBlock = styled.div`
display: grid;
grid-template-columns: 50% 47%;
@media (max-width: 600px) {
    display: block;
    margin-bottom: 15px;
}
@media (max-width: 600px) {
    grid-template-columns: 50% 42%;
}
`
export const CreateBlock = styled.div`
text-align: right;
`

export const SearchBlock = styled.div`
position: relative;
`