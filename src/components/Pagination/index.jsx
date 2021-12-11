import React, { memo, useCallback } from 'react';
import { BsArrowRight, BsArrowLeft, BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { Container, Row, Col } from 'react-bootstrap';
import { MainContent, PageBlock, ButtonSpan } from './styles';

let pagesArray;

function Pagination({ page, lastPage, changePage }) {
    const paintPages = useCallback(() => {
        let lastValidPage = lastPage;
        pagesArray = [];
        for (let i = 0; i < lastValidPage; i++) {
            pagesArray.push(<PageBlock key={i} onClick={() => { changePage(i + 1) }} color={page === i + 1 ? '#f1f1f1' : '#069BF8'} backgroundColor={page === i + 1 ? '#069BF8' : '#f1f1f1'}>{i + 1}</PageBlock>)
        }
        return pagesArray
    }, [page, lastPage]);

    return <MainContent>
        <div></div>
        <Container>
            <Row className="pt-3 pb-3" style={{ justifyContent: 'right' }}>
                <Col xs={2} className="text-center p-0" style={{ whiteSpace: 'pre' }}>
                    <ButtonSpan onClick={() => { changePage(1) }} className="mr-2" style={{ display: 'inline-table', cursor: 'pointer' }}>
                        <BsArrowBarLeft />
                    </ButtonSpan>
                    <ButtonSpan onClick={() => { changePage(page - 1) }} className="mr-2" style={{ display: 'inline-table', cursor: 'pointer' }}>
                        <BsArrowLeft />
                    </ButtonSpan>
                </Col>
                {paintPages()}
                {lastPage > 7 && <span>...</span>}
                <Col xs={2} className="text-center p-0" style={{ whiteSpace: 'pre' }}>
                    <ButtonSpan onClick={() => { changePage(page + 1) }} className="mr-2" style={{ display: 'inline-table', cursor: 'pointer' }}>
                        <BsArrowRight />
                    </ButtonSpan>
                    <ButtonSpan onClick={() => { changePage(lastPage) }} className="mr-2" style={{ display: 'inline-table', cursor: 'pointer' }}>
                        <BsArrowBarRight />
                    </ButtonSpan>
                </Col>
            </Row>
        </Container>
    </MainContent>
};

export default memo(Pagination);