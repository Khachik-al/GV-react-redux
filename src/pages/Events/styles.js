import styled from 'styled-components';

export const ActionsBlock = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding-left: 15px;
padding-right: 23px;
@media (max-width: 1600px) {
padding-right: 28px;
}
@media (max-width: 800px) {
    padding-right: 0px;
    padding-left: 0px;
}
`
export const CreateBlock = styled.div`
display: flex;
/* grid-template-columns: 50% 50%;
grid-gap: 5px; */
`
// export const CreateBlock = styled.div`
// display: grid;
// grid-template-columns: 50% 50%;
// grid-gap: 5px;
// `

export const SearchBlock = styled.div`
position: relative;
`