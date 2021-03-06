import React, { useCallback, memo } from 'react';
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { Container, Row, Col } from 'react-bootstrap';
import Tooltip from '@material-ui/core/Tooltip';
import { TableRow, TableCol, TableContainer, TextWithBack, ContBlock } from './styles';
import { ForBorder, SortIcon } from '../../styles/globalStyles';
import StyleConstants from '../../styles/StyleConstants';
import style from './style.module.css';
import format from 'date-fns/format'

function Table({ titles, lists, gridCount, ActionComponent, isMobile, sortArray, sortVal, gridCountTitle }) {

    const paintMain = useCallback(() => {
        return isMobile < 501 ?
            <TableContainer className={isMobile ? "mt-4" : "mt-0"}>
                {lists.map((list, index) => <div key={list.id + ' ' + list.customer_id}> <ForBorder className="mb-4 pt-2">
                    <Container>
                        <Row className="mb-2">
                            <Col xs={3}>
                                <TableCol color={'#469CF0'}>{titles[0]}: </TableCol>
                            </Col>

                            <Col xs={5} className="mb-1">
                                {list.name.length > 30 ? <Tooltip
                                    title={<TableCol color="white">{list.name}</TableCol>}
                                    placement="top">
                                    <TableCol color='#333333'>{list.name.slice(0, 30)}...</TableCol>
                                </Tooltip> : <TableCol color='#333333'>{list.name}</TableCol>}
                            </Col>

                            <Col xs={4} className="text-right">
                                {ActionComponent(style, list.id, index)}
                            </Col>

                            <Col xs={3}>
                                <TableCol color={'#469CF0'}>{titles[1]}: </TableCol>
                            </Col>

                            <Col xs={9} className="mb-1">
                                <TableCol color={'#469CF0'}>
                                    <TextWithBack>{list.type.name}</TextWithBack>
                                </TableCol>
                            </Col>

                            <Col xs={3}>
                                <TableCol color={'#469CF0'}>{titles[2]}: </TableCol>
                            </Col>
                            <Col xs={9} className="mb-1">
                                <TableCol color={'#469CF0'}>{list.event_date}</TableCol>
                            </Col>

                            <Col xs={3}>
                                <TableCol color={'#469CF0'}>{titles[3]}: </TableCol>
                            </Col>

                            <Col xs={9}>
                                <TableCol color={'#469CF0'}>
                                    <TextWithBack color={list.status.id === 1 ? '#FFC700' : list.status.id === 2 ? '#50CD89' : '#F1416C'}
                                        backColor={list.status.id === 1 ? '#FFF8DD' : list.status.id === 2 ? '#E8FFF3' : '#FFF5F8'}
                                    >{list.status.name}</TextWithBack>
                                </TableCol>
                            </Col>
                        </Row>
                    </Container>
                </ForBorder>
                </div>
                )}
            </TableContainer>
            :
            <TableContainer>
                <TableRow gridCount={gridCountTitle ? gridCountTitle : gridCount}>
                    <TableCol color={'#469CF0'}>{titles[0]}</TableCol>
                    <TableCol className="cursorPointer" onClick={() => { sortArray(0, 'type') }} color={'#469CF0'}>
                        {titles[1]} <SortIcon display={sortVal[0]}>
                            {sortVal[0] === true ? <BsArrowUpShort size={15} /> : <BsArrowDownShort size={15} />}
                        </SortIcon>
                    </TableCol>
                    <TableCol className="cursorPointer" onClick={() => { sortArray(1, 'event_date') }} color={'#469CF0'}>
                        {titles[2]} <SortIcon display={sortVal[1]}>
                            {sortVal[1] === true ? <BsArrowUpShort size={15} /> : <BsArrowDownShort size={15} />}
                        </SortIcon>
                    </TableCol>

                    <TableCol className="cursorPointer" onClick={() => { sortArray(2, 'status') }} color={'#469CF0'}>
                        {titles[3]} <SortIcon display={sortVal[2]}>
                            {sortVal[2] === true ? <BsArrowUpShort size={15} /> : <BsArrowDownShort size={15} />}
                        </SortIcon>
                    </TableCol>

                    <TableCol color={'#469CF0'}>{titles[4]}</TableCol>


                    {/* {titles.map(tit => <TableCol 
                    onClick={()=>{sortArray('type')}}
                    color={StyleConstants.TITLE_COLOR}
                    key={tit}>{tit}</TableCol>)} */}
                </TableRow>
                {lists.map((list) => {
                    return <TableRow gridCount={gridCount} key={list.id + ' ' + list.customer_id}>

                        {list.name.length > 50 ? <Tooltip title={<TableCol color="white">{list.name}</TableCol>} placement="top">
                            <TableCol color='#333333'>{list.name.slice(0, 50)}...</TableCol>
                        </Tooltip> : <TableCol color='#333333'>{list.name}</TableCol>}

                        {/* <TableCol color='#333333'>{list.name}</TableCol> */}

                        <TableCol color='#333333'>
                            {list.type.name}
                        </TableCol>
                        <TableCol color='#333333'>{format(new Date(list.event_date + ', ' + list.event_start), 'dd MMM yyyy, h:mm aaa')}</TableCol>
                        <TableCol color={StyleConstants.TITLE_COLOR}>
                            <TableCol color={StyleConstants.TITLE_COLOR}>
                                <TextWithBack color={list.status.id === 2 ? '#FFC700' : list.status.id === 1 ? '#50CD89' :list.status.id === 3 ? '#5f67cf' : '#F1416C'}
                                    backColor={list.status.id === 2 ? '#FFF8DD' : list.status.id === 1 ? '#E8FFF3' :list.status.id === 3 ? '#d9e8fc' : '#f8dfe7'}
                                >{list.status.name}</TextWithBack>
                            </TableCol>
                        </TableCol>
                        <TableCol className='text-right pr-4'>{ActionComponent(style, list.id, list.name)}</TableCol>
                    </TableRow>
                })}
            </TableContainer>
    }, [isMobile, lists]);

    return <ContBlock>
        {paintMain()}
    </ContBlock>
}

export default memo(Table);