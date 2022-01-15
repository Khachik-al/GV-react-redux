import { Pagination } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import { ContBlock, TableCol, TableContainer, TableRow, TextWithBack } from '../../../components/Table/styles';
import { ForBorder, Main, MainContent, PaginationMain } from '../../../styles/globalStyles';
import StyleConstants from '../../../styles/StyleConstants';
import { getEventContracts } from './action';
import SelectOfPagination from '../../../components/Smart/SelectOfPagination/SelectForPagination'

function Event() {
    const dispatch = useDispatch()
    const { eventContracts, eventContractsCount } = useSelector(state => state.EventContractReducer)
    const isMobile = useSelector((state) => state.AppReducer.screenSize);
    const [pageSizes, setPageSizes] = useState(10)
    const [page, setPage] = useState(1);
    useEffect(() => dispatch(getEventContracts()), [dispatch])
    const changePage = useCallback((event, page) => {
        setPage(page);
    });
    const paintView = useCallback(() => {
        return isMobile < 501 ? <TableContainer className="mt-5 pl-2 pr-2">
            {eventContracts.map(el => {
                return <ForBorder className="mb-5 pt-2 pb-2">
                    <Container>
                        <Row key={Math.random()}>
                            <Col xs={5}><TableCol >Event Name: </TableCol></Col>
                            <Col xs={7} className="mb-2"><TableCol color={StyleConstants.TITLE_COLOR}>{el.menu.name}</TableCol></Col>

                            <Col xs={5}><TableCol >Event Date: </TableCol></Col>
                            <Col xs={7} className="mb-2"><TextWithBack color='#50CD89' backColor='#E8FFF3'
                            >{el.created_at.split(' ')[0]}</TextWithBack></Col>

                            <Col xs={5}><TableCol >Status: </TableCol></Col>
                            <Col xs={7} className="mb-2"><TableCol color={StyleConstants.TITLE_COLOR}>Pending</TableCol></Col>

                            <Col xs={5}><TableCol >Deposit: </TableCol></Col>
                            <Col xs={7} className="mb-2"><TableCol color={StyleConstants.TITLE_COLOR}>{el.deposit}</TableCol></Col>

                            <Col xs={5}><TableCol >Payment: </TableCol></Col>
                            <Col xs={7} className="mb-2"><TableCol color={StyleConstants.TITLE_COLOR}>{el.grand_total}</TableCol></Col>

                            <Col xs={5}><TableCol >Balance Due: </TableCol></Col>
                            <Col xs={7} className="mb-2"><TableCol color={StyleConstants.TITLE_COLOR}>{el.balance_due}</TableCol></Col>

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
                {eventContracts.map(el => {
                    return <TableRow gridCount={'13% 13% 13% 13% 13% 13% 13%'} key={Math.random()} className='pl-4'>
                        <TableCol color={StyleConstants.TITLE_COLOR}>{el.menu.name}</TableCol>
                        <TableCol><TextWithBack color='#50CD89' backColor='#E8FFF3'>{el.created_at.split(' ')[0]}</TextWithBack></TableCol>
                        <TableCol color={StyleConstants.TITLE_COLOR}>Pending</TableCol>
                        <TableCol color={StyleConstants.TITLE_COLOR}>{el.deposit}</TableCol>
                        <TableCol color={StyleConstants.TITLE_COLOR}>{el.grand_total}</TableCol>
                        <TableCol color={StyleConstants.TITLE_COLOR}>{el.balance_due}</TableCol>
                        <TableCol color={StyleConstants.TITLE_COLOR}><Button className='pl-3 pr-3 pt-2 pb-2'>{'>'}</Button></TableCol>
                    </TableRow>
                })}
            </TableContainer>
    }, [isMobile, eventContracts])

    return eventContracts && <Main className="pb-4 pt-4">
        <MainContent className={!(isMobile < 800) ? 'pt-5 pb-4 pr-4 pl-5' : 'p-3 pb-4'}>
            <ContBlock>
                {paintView()}
            </ContBlock>
            {eventContractsCount > pageSizes &&
                <PaginationMain>
                    <div style={{ position: 'relative', width: '60px' }}><SelectOfPagination value={pageSizes} setValues={setPageSizes} /></div>
                    <Pagination count={Math.ceil(eventContractsCount / pageSizes)} color="primary" page={page}
                        onChange={changePage} size={isMobile < 450 ? "small" : ""} />
                </PaginationMain>}
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