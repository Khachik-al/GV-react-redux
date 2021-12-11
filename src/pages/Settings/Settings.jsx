import React, { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Menus from './childComponents/Menus';
import { Main, MainContent } from '../../styles/globalStyles';
import StyleConstants from '../../styles/StyleConstants';
import AddButton from '../../components/AddButton/AddButton';
import Spinner from '../../components/Smart/Spinner/Spinner';
import { Title } from '../Account/styles';
import { TabText } from './styles';
import { getMenu } from './actions';
// import { UpdateButton } from '../StaffView/styles';

function Settings({ getMenu, menues, count }) {
    const [activeTabe, setActiveTabe] = useState(0);
    // const [createMenu, setCreateMenu] = useState()
    const [createOrEdit, setCreateOrEdit] = useState(false);


    const getTabes = useCallback(() => {
        return <Row className="pb-4 mb-4">
            {['Menu'].map((tab, i) => {
                return <Col xs={2} key={tab} onClick={() => { setActiveTabe(i) }} className="text-center" style={{ color: "#a1a5b7" }}>
                    <TabText color={activeTabe === i ? StyleConstants.BRAND_COLOR : "none"} className="cursorPointer">
                        {tab}
                    </TabText>
                </Col>
            })}
        </Row>
    }, [activeTabe]);

    const getBody = useCallback(() => {
        switch (activeTabe) {
            case 0: return (<Menus menues={menues} count={count} createOrEdit={createOrEdit} setCreateOrEdit={setCreateOrEdit} />);
            // case 1: return (<div> Title 1 </div>);
            // case 2: return (<div> Title 1 </div>);
            // case 3: return (<div> Title 1 </div>);
            // case 4: return (<div> Title 1 </div>);
            // case 5: return (<div> Title 1 </div>);
            default: return null;
        }
    }, [activeTabe, menues, createOrEdit])

    useEffect(() => {
        getMenu();
    }, [])

    return menues ? <Main>
        <MainContent>
            <Container fluid>
                <Row className="mb-4 pt-4 pb-3" style={{ borderBottom: '1px solid #eff2f5' }}>
                    <Col xs={activeTabe === 0 ? 6 : 12}>
                        <Title>Settings</Title>
                    </Col>
                    {activeTabe === 0 && <Col className="text-right" xs={6}>
                        <AddButton withoutPlus clickFunc={(() => { setCreateOrEdit(true) })} title="Create Menu" />
                    </Col>}
                </Row>
                {getTabes()}
            </Container>
            {getBody()}
        </MainContent>
    </Main> : <Main> <MainContent style={{ paddingTop: "22%", paddingBottom: "22%" }}>
        <Spinner width="6em" borderWidth="0.55em" />
    </MainContent> </Main>
}

const mapStateToProps = (state) => {
    return {
        menues: state.SettingsReducer.menues,
        count: state.SettingsReducer.count
        // screenSize: state.AppReducer.screenSize,
    };
};

const mapDispatchToProps = {
    getMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);