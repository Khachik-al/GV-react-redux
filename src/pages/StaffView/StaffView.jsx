import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Main, MainContent, TitlesFont } from '../../styles/globalStyles';
import PaintListForView from '../../components/PaintListForView/PaintListForView';
import { ParagraphText } from './styles';
import { getUser, resetUser } from './actions';
import styled from './style.css';

function StaffView({ match, getUser, staffUser, resetUser, screenSize }) {
    const staffBody = useCallback(() => {

        return staffUser && <Row className="mb-3"> {[{ title: 'First name', name: 'first_name' }, { title: 'Last name', name: 'last_name' },
        { title: 'Email', name: 'email' }, { title: 'Phone', name: 'phone_number' }].map((el, i) => {
            return <Col className="mb-4" key={el.name} xs={screenSize > 1000 ? 4 : screenSize > 800 ? 6 : 12}
                style={{ borderRight: screenSize > 1000 && i !== 2 ? 'solid 1px grey' : screenSize > 800 && screenSize < 1000 && (i === 0 || i === 2) ? 'solid 1px grey' : 'none' }}>
                <ParagraphText color="#181C32">
                    {el.title}
                </ParagraphText>
                <ParagraphText color="#181C32" style={{ overflowWrap: 'anywhere' }}>
                    {staffUser[el.name]}
                </ParagraphText>
            </Col>
        })}
            {
                [{ title: 'Position', name: 'position' }, { title: 'Role', name: 'role' }].map((el, i) => {
                    return <Col className="mb-4" key={el.name} xs={screenSize > 1000 ? 4 : screenSize > 800 ? 6 : 12}
                        style={{ borderRight: screenSize > 800 && i !== 1 ? 'solid 1px grey' : 'none' }}>
                        <ParagraphText color="#181C32">
                            {el.title}
                        </ParagraphText>
                        <ParagraphText color="#181C32" style={{ overflowWrap: 'anywhere' }}>
                            {staffUser[el.name]['name']}
                        </ParagraphText>
                    </Col>
                })
            }
        </Row>
    }, [screenSize, staffUser]);

    useEffect(() => {
        getUser(match.params.id);
        return () => { resetUser() }
    }, []);

    return staffUser && <Main>
        <MainContent className="p-3">
            <Container style={{ minWidth: '100%' }} className={styled.aaa}>
                <Row className="mb-4" style={{ borderBottom: 'solid 1px #bfbfbf' }}>
                    <Col xs={12} >
                        <TitlesFont>Details</TitlesFont>
                    </Col>
                </Row>
                {/* {staffBody()} */}


                <PaintListForView state={{ ...staffUser, role: staffUser.role.name, position: staffUser.position.name }} screenSize={screenSize} lists={[
                    { title: 'First name', name: 'first_name' }, { title: 'Last name', name: 'last_name' },
                    { title: 'Email', name: 'email' }, { title: 'Phone', name: 'phone_number' },
                    { title: 'Position', name: 'position' }, { title: 'Role', name: 'role' }
                ]} />


            </Container>
        </MainContent>
    </Main>
}

const mapStateToProps = (state) => {
    return {
        staffUser: state.StaffEditReducer.staffUser,
        screenSize: state.AppReducer.screenSize,
    };
};

const mapDispatchToProps = {
    getUser,
    resetUser
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffView);