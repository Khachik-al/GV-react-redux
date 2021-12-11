import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { TableCol, TableContainer, TableRow, TextWithBack } from '../../../components/Table/styles';
import { Main, MainContent } from '../../../styles/globalStyles';
import StyleConstants from '../../../styles/StyleConstants';

function Event({ }) {


    return <Main style={{ paddingTop: '200px', paddingLeft: '200px' }}>
        <MainContent>
            <TableContainer className='pt-5'>
                <TableRow gridCount={'16% 7% 13% 13% 13% 13% 13%'} className='pl-5' background='rgba(245, 248, 250, 0.5)'>
                    {['Event Name', 'Event Date', 'Status', 'Deposit', 'Payment', 'Balance Due', 'Details'].map(
                        tit => <TableCol key={tit}>{tit}</TableCol>)}
                </TableRow>
                {
                    ['sdfsdf', 'ewfewfewf', 'wefwefewf'].map((menu) => {
                        return <TableRow gridCount={'16% 7% 13% 13% 13% 13% 13%'} key={Math.random()} className='pl-5'>
                            <TableCol color={StyleConstants.TITLE_COLOR}>JEFF Baptism</TableCol>
                            <TableCol>
                                <TextWithBack
                                    color='#50CD89'
                                    backColor='#E8FFF3'
                                >21.10.2021</TextWithBack>
                            </TableCol>
                            <TableCol color={StyleConstants.TITLE_COLOR}>
                                Pending
                            </TableCol>
                            <TableCol color={StyleConstants.TITLE_COLOR}>
                                1500$
                            </TableCol>
                            <TableCol color={StyleConstants.TITLE_COLOR}>
                                5000$
                            </TableCol>
                            <TableCol color={StyleConstants.TITLE_COLOR}>
                                3500$
                            </TableCol>
                            <TableCol color={StyleConstants.TITLE_COLOR}>
                                <Button>
                                    {'>'}
                                </Button>
                            </TableCol>
                        </TableRow>
                    })}
            </TableContainer>
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