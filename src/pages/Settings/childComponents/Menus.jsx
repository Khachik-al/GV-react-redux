import React, { useCallback, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { editMenu, createMenu, deleteMenuF } from '../actions';
import Pagination from '@material-ui/core/Pagination';
import Modal from '../../../components/Smart/Modal/Modal';
import BlockInputs from '../../../components/Smart/InputBlock/InputBlock';
import { TableCol, TableContainer, TableRow, ContBlock } from '../../../components/Table/styles';
import style from '../../../components/Table/style.module.css';
import StyleConstants from '../../../styles/StyleConstants';
import { InputTitle, RedFont, ForBorder, PaginationMain } from '../../../styles/globalStyles';
import warningAlert from '../../../utils/warningAlert';

function Menues({ menues, count, editMenu, createMenu, deleteMenuF, createOrEdit, setCreateOrEdit }) {
    const [page, setPage] = useState(1);
    const [state, setState] = useState({ name: '', errorName: false, errorDes: false, description: '' });
    const isMobile = useSelector((state) => state.AppReducer.screenSize);

    const ActionComponent = useCallback((style, id, name, description) => {
        return <div className={style.dropdown}>
            <span className={style.dropbtn}>Actions</span>
            <div className={style.dropdownContent}>
                <span onClick={() => {
                    setCreateOrEdit({ id: id });
                    setState({ ...state, name: name, description: description })
                }}>Edit</span>
                <span onClick={() => {
                    warningAlert(() => {
                        deleteMenuF(id,
                            Object.values(menues).slice(page === 1 ? 0 : (page - 1) * 10, page === 1 ? 10 : page * 10).length,
                            setPage, page)
                    })
                }}>Delete</span>
            </div>
        </div>
    }, [menues, page, setPage]);

    const handleChange = ({ target }) => {
        setState({
            ...state,
            [target.name]: target.value
        })
    };

    const changePage = useCallback((event, page) => {
        setPage(page);
    });

    const onCloseModal = useCallback(() => {
        setCreateOrEdit(false);
        setState({ name: '', errorName: false, errorDes: false, description: '' });
    }, [])

    const getMenues = useCallback(() => {
        return isMobile < 501 ? <TableContainer className="mt-4">
            {
                Object.values(menues).slice(page === 1 ? 0 : (page - 1) * 10, page === 1 ? 9 : page * 10).map((menu) => {
                    return <ForBorder className="mb-4 pt-2 pb-2">
                        <Container>
                            <Row key={menu.id}>
                                <Col xs={12} className="mb-2"><TableCol className="text-right">
                                    {ActionComponent(style, menu.id, menu.name, menu.description)}
                                </TableCol>
                                </Col>
                                <Col xs={12} className="mb-2"><TableCol color="">
                                    <span style={{ color: StyleConstants.TITLE_COLOR, marginRight: '5px' }}>Name:</span> {menu.name}</TableCol></Col>
                                <Col xs={12}><TableCol color="">
                                    <span style={{ color: StyleConstants.TITLE_COLOR, marginRight: '5px' }}>Description:
                                    </span> {menu.description}</TableCol></Col>
                            </Row>
                        </Container>
                    </ForBorder>
                })}
        </TableContainer>
            :
            <TableContainer>
                <TableRow gridCount={'27% 56% 13%'}>
                    {['NAME', 'DESCRIPTION', 'ACTIONS'].map(tit => <TableCol color={StyleConstants.TITLE_COLOR} key={tit}>{tit}</TableCol>)}
                </TableRow>
                {
                    // Object.values(menues)
                    Object.values(menues).slice(page === 1 ? 0 : (page - 1) * 10, page === 1 ? 9 : page * 10).map((menu) => {
                        return <TableRow gridCount={'27% 56% 13%'} key={menu.id}>
                            <TableCol >{menu.name}</TableCol>
                            <TableCol color={StyleConstants.TITLE_COLOR}>{menu.description}</TableCol>
                            <TableCol>
                                {ActionComponent(style, menu.id, menu.name, menu.description)}
                            </TableCol>
                        </TableRow>
                    })}
            </TableContainer>
    }, [menues, page]);

    const createOrEditFun = useCallback(() => {

        let cloneState = { ...state };
        cloneState.name ? cloneState.errorName = false : cloneState.errorName = true;
        cloneState.description ? cloneState.errorDes = false : cloneState.errorDes = true;

        if (cloneState.errorName || cloneState.errorDes) {
            setState(cloneState);
        }
        else {
            if (createOrEdit === true) {
                createMenu({ name: state.name, description: state.description }, onCloseModal);
            }
            else {
                editMenu({ name: state.name, description: state.description }, createOrEdit.id, onCloseModal);
            }
        }

    }, [state, createOrEdit])

    const getButtons = useCallback(() => {
        return <Row>
            <Col xs={12} className="text-right">
                <button type="button"
                    onClick={onCloseModal}
                    className="btn btn-light me-3" data-kt-stepper-action="previous">
                    Cancel
                </button>
                <button type="button" className="btn btn-primary"
                    data-kt-stepper-action="next"
                    onClick={createOrEditFun}>
                    {createOrEdit === true ? 'Create' : 'Save'}
                </button>
            </Col>
        </Row>
    }, [createOrEdit, state])

    return <Container fluid>
        <Row>
            <Col>
                <ContBlock>
                    {getMenues()}
                </ContBlock>
            </Col>
            <Col xs={12}>
                {count > 10 && <PaginationMain>
                    <Pagination count={Math.ceil(count / 10)} color="primary" page={page}
                        onChange={changePage} size={isMobile < 450 ? "small" : ""} />
                </PaginationMain>}
            </Col>
        </Row>
        {createOrEdit &&
            <Modal
                handleOpen={onCloseModal}
                title={`${createOrEdit === true ? 'Create' : 'Edit'} menu.`}
                getButtons={getButtons}
            >
                <div className="pr-3 pl-3">
                    <InputTitle>Name<RedFont>*</RedFont> </InputTitle>
                    <div style={{ borderColor: '1px solid red' }} className="mb-4">
                        <BlockInputs
                            onChange={handleChange}
                            name={'name'}
                            title="Name"
                            value={state['name']}
                            require={state.errorName}
                        />
                    </div>
                    <InputTitle>Description<RedFont>*</RedFont></InputTitle>
                    <div className="mb-3" style={{ borderColor: '1px solid red' }}>
                        <BlockInputs
                            title="Description"
                            onChange={handleChange}
                            name={'description'}
                            value={state['description']}
                            require={state.errorDes}
                        />
                    </div>
                </div>
            </Modal>}
    </Container>
}

const mapStateToProps = (state) => {
    return {
        menues: state.SettingsReducer.menues,
    };
};

const mapDispatchToProps = {
    editMenu,
    createMenu,
    deleteMenuF
};

export default connect(mapStateToProps, mapDispatchToProps)(Menues);