import styled from 'styled-components';

export const ActionsBlock = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding-left: 15px;
padding-right: 80px;
@media (max-width: 1400px) {
    grid-template-columns: 60% 40%;
}
@media (max-width: 1030px) {
    grid-template-columns: 50% 50%;
}
@media (max-width: 1030px) {
    grid-template-columns: 40% 60%;
}
@media (max-width: 600px) {
    display: block;
    margin-bottom: 15px;
}
`
// export const ActionsBlock = styled.div`
// display: grid;
// grid-template-columns: 70% 30%;
// padding-left: 15px;
// padding-right: 80px;
// @media (max-width: 1400px) {
//     grid-template-columns: 60% 40%;
// }
// @media (max-width: 1030px) {
//     grid-template-columns: 50% 50%;
// }
// @media (max-width: 1030px) {
//     grid-template-columns: 40% 60%;
// }
// @media (max-width: 600px) {
//     display: block;
//     margin-bottom: 15px;
// }
// `
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