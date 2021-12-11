import React from 'react';
import { connect } from 'react-redux';
import { TableCol, TableContainer, TableRow, TextWithBack } from '../../../components/Table/styles';
import { Main, MainContent } from '../../../styles/globalStyles';
import StyleConstants from '../../../styles/StyleConstants';

function Vendor({ }) {

    return <Main style={{ padding: '200px' }}>
        <MainContent>
            <TableContainer style={{ padding: '70px 70px' }}>
            <h5 className='text-right'>Total: $2000</h5>
                <TableRow gridCount={'15% 15% 15% 15% 15% 15%'} className='pl-5' background='rgba(245, 248, 250, 0.5)'>
                    {['Cash Flow type', 'Payment Type', 'Vendors', 'Status', 'Date', 'Amount'].map(
                        tit => <TableCol key={tit}>{tit}</TableCol>)}
                </TableRow>
                {
                    ['sdfsdf', 'ewfewfewf', 'wefwefewf'].map(() => {
                        return <TableRow gridCount={'15% 15% 15% 15% 15% 15%'} key={Math.random()} className='pl-5'>
                            <TableCol color={StyleConstants.TITLE_COLOR}>
                                Income
                            </TableCol>
                            <TableCol color={StyleConstants.TITLE_COLOR}>
                                Cash
                            </TableCol>
                            <TableCol color={StyleConstants.TITLE_COLOR}>
                                PROTEIN
                            </TableCol>
                            <TableCol color={StyleConstants.TITLE_COLOR}>
                                <TextWithBack
                                    color='#50CD89'
                                    backColor='#E8FFF3'
                                >Success</TextWithBack>
                            </TableCol>
                            <TableCol color={StyleConstants.TITLE_COLOR}>
                                10/12/2021
                            </TableCol>
                            <TableCol color={StyleConstants.TITLE_COLOR}>
                                500$
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

export default connect(mapStateToProps, mapDispatchToProps)(Vendor);