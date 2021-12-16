// import React, { useCallback, memo } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import { TableRow, TableCol, TableContainer, TextWithBack } from '../styles';
// import { ForBorder } from '../../../styles/globalStyles';
// import StyleConstants from '../../../styles/StyleConstants';
// import style from '../style.module.css';

// function StaffTable({ titles, lists, gridCount, checkBoxesValues, ActionComponent, isMobile }) {
//     const paintMain = useCallback(() => {
//         return isMobile < 750 ?
//             <TableContainer className={isMobile ? "mt-4" : "mt-0"}>
//                 {lists.map((list) => <div key={list.id}> <ForBorder className="mb-4 pt-2">
//                     <Container>
//                         <Row className="mb-2">
//                             <Col xs={3}><TableCol color={StyleConstants.TITLE_COLOR}> {titles[0]}: </TableCol></Col>
//                             <Col xs={5}><TableCol color="black">{list['first_name']} {list['last_name']}</TableCol></Col>
//                             <Col xs={4}><TableCol color="black">{ActionComponent(style, list)}</TableCol></Col>
//                             <Col xs={3}><TableCol color={StyleConstants.TITLE_COLOR}> {titles[1]}: </TableCol></Col>
//                             <Col xs={9}><TableCol color="black">{list.role['name']}</TableCol></Col>
//                             <Col xs={3}><TableCol color={StyleConstants.TITLE_COLOR}> {titles[2]}: </TableCol></Col>
//                             <Col xs={9}><TableCol color="black">{list['email']}</TableCol></Col>
//                             <Col xs={3}><TableCol color={StyleConstants.TITLE_COLOR}> {titles[3]}: </TableCol></Col>
//                             <Col xs={9}><TableCol color="black">{list['phone']} {list['last_name']}</TableCol></Col>
//                         </Row>
//                     </Container>
//                 </ForBorder>
//                 </div>
//                 )}
//             </TableContainer>
//             :
//             <TableContainer>
//                 <TableRow gridCount={gridCount}>
//                     {titles.map(tit => <TableCol color={StyleConstants.TITLE_COLOR} key={tit}>{tit}</TableCol>)}
//                 </TableRow>
//                 {lists.map((list) => {
//                     return <TableRow eRow gridCount={gridCount} key={list.id}>
//                         <TableCol color="#3F4254">{list['first_name']} {list['last_name']}</TableCol>
//                         <TableCol color={StyleConstants.TITLE_COLOR}>{list.position['name']}</TableCol>
//                         <TableCol color={StyleConstants.TITLE_COLOR}>{list['email']}</TableCol>
//                         <TableCol color={StyleConstants.TITLE_COLOR}><TextWithBack>{list['phone_number']}</TextWithBack></TableCol>
//                         <TableCol>{ActionComponent(style, list)}</TableCol>
//                     </TableRow>
//                 })}
//             </TableContainer>
//     }, [checkBoxesValues, isMobile, lists]);

//     return <TableContainer>
//         {paintMain()}
//     </TableContainer>
// }

// export default memo(StaffTable);

































import React, { useCallback, memo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { TableRow, TableCol, TableContainer, TextWithBack, ContBlock } from '../styles';
import { ForBorder } from '../../../styles/globalStyles';
import StyleConstants from '../../../styles/StyleConstants';
import style from '../style.module.css';

function StaffTable({ titles, lists, gridCount, checkBoxesValues, ActionComponent, isMobile, customer, yessss }) {
    const paintMain = useCallback(() => {
        return isMobile < 501 ?
            <TableContainer className={isMobile ? "mt-4" : "mt-0"}>
                {lists.map((list) => <div key={list.id}> <ForBorder className="mb-4 pt-2">
                    <Container>
                        <Row className="mb-2">
                            <Col xs={3}><TableCol color={StyleConstants.TITLE_COLOR}> {titles[0]}: </TableCol></Col>
                            <Col xs={5}><TableCol color="black">{customer ? list['full_name'] : `${list['first_name']} ${list['last_name']}`}</TableCol></Col>
                            {!yessss && <Col xs={4}><TableCol color="black">{ActionComponent(style, list)}</TableCol></Col>}
                            {!customer && <> <Col xs={3}><TableCol color={StyleConstants.TITLE_COLOR}> {titles[1]}: </TableCol></Col>
                                <Col xs={9}><TableCol color="black">{list.position['name']}</TableCol></Col> </>}
                            <Col xs={3}><TableCol color={StyleConstants.TITLE_COLOR}> {titles[2]}: </TableCol></Col>
                            <Col xs={9}><TableCol color="black">{list['email']}</TableCol></Col>
                            <Col xs={3}><TableCol color={StyleConstants.TITLE_COLOR}> {titles[3]}: </TableCol></Col>
                            <Col xs={9}><TableCol color="black">{list['phone_number']}</TableCol></Col>
                        </Row>
                    </Container>
                </ForBorder>
                </div>
                )}
            </TableContainer>
            :
            <TableContainer>
                <TableRow gridCount={gridCount}>
                    {titles.map(tit => <TableCol color={StyleConstants.TITLE_COLOR} key={tit}>{tit}</TableCol>)}
                </TableRow>
                {lists.map((list) => {
                    return <TableRow eRow gridCount={gridCount} key={list.id}>
                        <TableCol color="black">{customer ? list['full_name'] : `${list['first_name']} ${list['last_name']}`}</TableCol>
                        {!customer && <TableCol color={StyleConstants.TITLE_COLOR}>{list.position['name']}</TableCol>}
                        <TableCol color={StyleConstants.TITLE_COLOR} fontSize='14px'>{list['email']}</TableCol>
                        <TableCol color={StyleConstants.TITLE_COLOR}><TextWithBack>{list['phone_number']}</TextWithBack></TableCol>
                        {!yessss && <TableCol>{ActionComponent(style, list)}</TableCol>}
                    </TableRow>
                })}
            </TableContainer>
    }, [checkBoxesValues, isMobile, lists]);

    return <ContBlock>
        {paintMain()}
    </ContBlock>
}

export default memo(StaffTable);