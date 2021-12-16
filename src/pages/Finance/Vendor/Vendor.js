import React, { useCallback } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';
import { TableCol, TableContainer, TableRow, TextWithBack } from '../../../components/Table/styles';
import { ForBorder, Main, MainContent } from '../../../styles/globalStyles';
import StyleConstants from '../../../styles/StyleConstants';

function Vendor() {
    const isMobile = useSelector((state) => state.AppReducer.screenSize);

    const paintView = useCallback(() => {
        return isMobile < 501 ? <TableContainer className="mt-5">
            {['asdsad', 'asdasd', 'sadasd'].map((menu) => {
                return <ForBorder className="mb-5 pt-2 pb-2">
                    <Container>
                        <Row key={Math.random()}>
                            <Col xs={5}><TableCol >Cash Flow type: </TableCol></Col>
                            <Col xs={3} className="mb-2"><TableCol color={StyleConstants.TITLE_COLOR}>Income</TableCol></Col>
                            <Col xs={4} className="mb-2"><h6 className='text-right'>Total: $2000</h6></Col>

                            <Col xs={5}><TableCol >Payment Type: </TableCol></Col>
                            <Col xs={7} className="mb-2"><TableCol color={StyleConstants.TITLE_COLOR}>Cash</TableCol></Col>

                            <Col xs={5}><TableCol >Vendors: </TableCol></Col>
                            <Col xs={7} className="mb-2"><TableCol color={StyleConstants.TITLE_COLOR}>PROTEIN</TableCol></Col>

                            <Col xs={5}><TableCol >Status: </TableCol></Col>
                            <Col xs={7} className="mb-2"><TextWithBack color='#50CD89' backColor='#E8FFF3'>Success</TextWithBack></Col>

                            <Col xs={5}><TableCol >Date: </TableCol></Col>
                            <Col xs={7} className="mb-2"><TableCol color={StyleConstants.TITLE_COLOR}>10/12/2021</TableCol></Col>

                            <Col xs={5}><TableCol >Amount: </TableCol></Col>
                            <Col xs={7} className="mb-2"><TableCol color={StyleConstants.TITLE_COLOR}>500$</TableCol></Col>
                        </Row>
                    </Container>
                </ForBorder>
            })}
        </TableContainer> :
            <TableContainer >
                <h5 className='text-right'>Total: $2000</h5>
                <TableRow gridCount={'15% 15% 15% 15% 15% 15%'} className='pl-4' background='rgba(245, 248, 250, 0.5)'>
                    {['Cash Flow type', 'Payment Type', 'Vendors', 'Status', 'Date', 'Amount'].map(
                        tit => <TableCol key={tit}>{tit}</TableCol>)}
                </TableRow>
                {['sdfsdf', 'ewfewfewf', 'wefwefewf'].map(() => {
                    return <TableRow gridCount={'15% 15% 15% 15% 15% 15%'} key={Math.random()} className='pl-4'>
                        <TableCol color={StyleConstants.TITLE_COLOR}>Income</TableCol>
                        <TableCol color={StyleConstants.TITLE_COLOR}>Cash</TableCol>
                        <TableCol color={StyleConstants.TITLE_COLOR}>PROTEIN</TableCol>
                        <TableCol color={StyleConstants.TITLE_COLOR}><TextWithBack color='#50CD89' backColor='#E8FFF3'>Success</TextWithBack></TableCol>
                        <TableCol color={StyleConstants.TITLE_COLOR}>10/12/2021</TableCol>
                        <TableCol color={StyleConstants.TITLE_COLOR}>500$</TableCol>
                    </TableRow>
                })}
            </TableContainer>
    }, [isMobile])
    return <Main style={{ paddingTop: isMobile < 800 ? '' : '200px' }}>
        <MainContent className={!(isMobile < 800) ? 'pt-5 pb-4 pr-4 pl-5' : 'p-3 pb-4'}>
            {paintView()}
        </MainContent>
    </Main>
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Vendor);