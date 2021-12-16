import React, { useCallback } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';
import { ContBlock, TableCol, TableContainer, TableRow, TextWithBack } from '../../../components/Table/styles';
import { ForBorder, Main, MainContent } from '../../../styles/globalStyles';
import StyleConstants from '../../../styles/StyleConstants';

function Event() {

    const isMobile = useSelector((state) => state.AppReducer.screenSize);

    const paintView = useCallback(() => {
        return isMobile < 501 ? <TableContainer className="mt-5 pl-2 pr-2">
            {['asdsad', 'asdasd', 'sadasd'].map((menu) => {
                return <ForBorder className="mb-5 pt-2 pb-2">
                    <Container>
                        <Row key={Math.random()}>
                            <Col xs={5}><TableCol >Event Name: </TableCol></Col>
                            <Col xs={7} className="mb-2"><TableCol color={StyleConstants.TITLE_COLOR}>JEFF Baptism</TableCol></Col>

                            <Col xs={5}><TableCol >Event Date: </TableCol></Col>
                            <Col xs={7} className="mb-2"><TextWithBack color='#50CD89' backColor='#E8FFF3'
                            >21.10.2021</TextWithBack></Col>

                            <Col xs={5}><TableCol >Status: </TableCol></Col>
                            <Col xs={7} className="mb-2"><TableCol color={StyleConstants.TITLE_COLOR}>Pending</TableCol></Col>

                            <Col xs={5}><TableCol >Deposit: </TableCol></Col>
                            <Col xs={7} className="mb-2"><TableCol color={StyleConstants.TITLE_COLOR}>1500$</TableCol></Col>

                            <Col xs={5}><TableCol >Payment: </TableCol></Col>
                            <Col xs={7} className="mb-2"><TableCol color={StyleConstants.TITLE_COLOR}>5000$</TableCol></Col>

                            <Col xs={5}><TableCol >Balance Due: </TableCol></Col>
                            <Col xs={7} className="mb-2"><TableCol color={StyleConstants.TITLE_COLOR}>3500$</TableCol></Col>

                            <Col xs={5}><TableCol >Details: </TableCol></Col>
                            <Col xs={7} className="mb-2"><TableCol color={StyleConstants.TITLE_COLOR}>
                                <Button className='pl-3 pr-3 pt-1 pb-1'>{'>'}</Button></TableCol></Col>
                        </Row>
                    </Container>
                </ForBorder>
            })}
        </TableContainer> :
            <TableContainer className='pt-5'>
                <TableRow gridCount={'13% 13% 13% 13% 13% 13% 13%'} className='pl-4' background='rgba(245, 248, 250, 0.5)'>
                    {['Event Name', 'Event Date', 'Status', 'Deposit', 'Payment', 'Balance Due', 'Details'].map(
                        tit => <TableCol key={tit}>{tit}</TableCol>)}
                </TableRow>
                {['sdfsdf', 'ewfewfewf', 'wefwefewf'].map((menu) => {
                    return <TableRow gridCount={'13% 13% 13% 13% 13% 13% 13%'} key={Math.random()} className='pl-4'>
                        <TableCol color={StyleConstants.TITLE_COLOR}>JEFF Baptism</TableCol>
                        <TableCol><TextWithBack color='#50CD89' backColor='#E8FFF3'>21.10.2021</TextWithBack></TableCol>
                        <TableCol color={StyleConstants.TITLE_COLOR}>Pending</TableCol>
                        <TableCol color={StyleConstants.TITLE_COLOR}>1500$</TableCol>
                        <TableCol color={StyleConstants.TITLE_COLOR}>5000$</TableCol>
                        <TableCol color={StyleConstants.TITLE_COLOR}>3500$</TableCol>
                        <TableCol color={StyleConstants.TITLE_COLOR}><Button className='pl-3 pr-3 pt-2 pb-2'>{'>'}</Button></TableCol>
                    </TableRow>
                })}
            </TableContainer>
    }, [isMobile])

    return <Main style={{ paddingTop: isMobile < 501 ? '' : '200px'}}>
        <MainContent className={!(isMobile < 800) ? 'pt-5 pb-4 pr-4 pl-5' : 'p-3 pb-4'}> 
            <ContBlock>
                {paintView()}
            </ContBlock>
        </MainContent>
    </Main>
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Event);