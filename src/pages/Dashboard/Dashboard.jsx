import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { BsFillSquareFill } from "react-icons/bs";
import { Container, Row, Col } from 'react-bootstrap';
import Lines from '../../components/Charts/Lines';
import Bars from '../../components/Charts/Bars';
import { Main, MainContent } from '../../styles/globalStyles';
import { Texts, GridCol, ViewButton, InvitNew } from './styles';

function Dashboard(props) {
    const isMobile = useSelector((state) => state.AppReducer.screenSize);
    const paintTopChart = useCallback(() => {
        return <>
            <Row className="mb-4" style={{ backgroundColor: 'white', borderRadius: '5px' }}>
                <Col xs={6} className="text-left mb-4 pt-3">
                    <Texts color="black" fSize="12px">Generate Reports</Texts>
                    <Texts color="grey" fSize="8px">Finance and accounting reports</Texts>
                </Col>
                <Col xs={6} className="text-right pt-3 mb-4">
                    <Texts color="#26ACF8" fSize="12px">422$</Texts>
                </Col>
                <Col xs={12} className="pl-0 pr-0">
                    <Lines
                        datasets={[{
                            label: "Profile",
                            data: [100, 320, 500, 452, 800, 610, 780, 230, 152, 250, 152, 450, 810],
                            fill: true,
                            borderColor: "#26ACF8",
                            backgroundColor: "#F0F9FF",
                            tension: 0.1
                        }]}
                        width={100}
                        height={120}
                    />
                </Col>
            </Row>

            <Row className="mb-4 pb-3" style={{ backgroundColor: 'white', borderRadius: '5px' }}>
                <Col xs={6} className="text-left mb-4 pt-3">
                    <Texts color="black" fSize="12px">Sales</Texts>
                    <Texts color="grey" fSize="8px">Oct - 8 : Oct - 28</Texts>
                </Col>
                <Col xs={6} className="text-right pt-3 mb-4">
                    <Texts color="#26ACF8" fSize="12px">450$</Texts>
                </Col>
                <Col xs={12} className="p-1">
                    <Bars />
                </Col>
            </Row>
        </>
    }, []);

    const paintTasksSection = useCallback(() => {
        return <Row className="mb-4 pb-3">
            <Col xs={isMobile > 768 ? 6 : 12} style={{ padding: `${isMobile > 768 ? '10px 20px 0 0' : '0px'}`, marginBottom: `${isMobile > 768 ? '10px 0 0 20px' : '25px'}` }}>
                <div style={{ backgroundColor: 'white', borderRadius: '5px', padding: '10px 5%' }}>
                    <div className="mb-4">
                        <GridCol columns="70% 30%">
                            <div>
                                <Texts color="black" fSize="12px">Tasks Summary</Texts>
                                <Texts color="grey" fSize="8px">24 overdue tasks</Texts>
                            </div>

                            <div className="text-right">
                                <ViewButton>Tasks View</ViewButton>
                            </div>
                        </GridCol>
                    </div>

                    <div className="mb-3">
                        <GridCol columns="40% 40% 20%">
                            <div className="pt-2 text-center">
                                <Texts color="black" fSize="22px">420</Texts>
                                <Texts color="grey" fSize="12px">Total tasks</Texts>
                            </div>

                            <div className="text-left">
                                {[{ title: 'Active', color: 'blue' }, { title: 'Complated', color: 'green' },
                                { title: 'Overdue', color: 'red' }, { title: 'Yet to start', color: 'grey' }].map(
                                    el => <Texts key={el.title} className="mb-2" color="grey" fSize="8px"><BsFillSquareFill color={el.color} className="mr-2" /> {el.title} </Texts>
                                )}
                            </div>

                            <div className="text-right">
                                {['10', '20', '41', '34'].map(el => <Texts key={el} className="mb-2" color="grey" fSize="8px">{el}</Texts>)}
                            </div>
                        </GridCol>
                    </div>

                    <InvitNew>
                        <Texts className="mb-1" color="grey" fSize="8px">
                            <b style={{ color: '#26ACF8' }}>Invite New .NET</b> Collaboratorsto create great outstanding business to business .jsp modutr class scripts
                        </Texts>
                    </InvitNew>
                </div>
            </Col>

            <Col xs={isMobile > 768 ? 6 : 12} style={{ padding: `${isMobile > 768 ? '10px 00px' : '0px'}` }}>
                <div style={{ backgroundColor: 'white', borderRadius: '5px' }}>
                    <div className="mb-4 pt-2 pl-3 pr-3">
                        <GridCol columns="70% 30%">
                            <div>
                                <Texts color="black" fSize="12px" className="mb-2">Tasks Over time</Texts>
                                <Texts color="grey" fSize="8px">Complete Incomplete</Texts>
                            </div>

                            <div className="text-right">
                                <ViewButton>Tasks View</ViewButton>
                                <ViewButton>Tasks View</ViewButton>
                            </div>
                        </GridCol>
                    </div>

                    <div className="mt-3 pl-2">
                        <Lines
                            datasets={[
                                {
                                    label: "No Profile",
                                    data: [5, 21, 30, 15, 24, 34, 8, 42, 22, 30, 12, 40, 25],
                                    fill: true,
                                    borderColor: "#50CD89",
                                    backgroundColor: "#E8FFF3",
                                    tension: 0.1
                                },
                                {
                                    label: "Profile",
                                    data: [30, 52, 70, 62, 80, 61, 70, 60, 52, 80, 72, 50, 65],
                                    fill: true,
                                    borderColor: "#009EF7",
                                    backgroundColor: "#F1FAFF",
                                    tension: 0.1
                                }
                            ]}
                            width={100}
                            height={140}
                            radius={1}
                            yValue={true}
                            yGridValue={true}
                            xFontSize={10}
                            labelsSize={10}
                        />
                    </div>
                </div>
            </Col>
        </Row >
    }, [isMobile])

    return <Main>
        <MainContent>
            <Container>
                {paintTopChart()}
                {paintTasksSection()}
            </Container>
        </MainContent>
    </Main>
};

export default memo(Dashboard);