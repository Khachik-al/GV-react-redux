import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import config from '../../configs.json';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { logout } from '../../utils/auth';
import UserAccountEdit from '../../components/UserAccountEdit/UserAccountEdit';
import Modal from '../../components/Smart/Modal/Modal';
import ResetPassword from '../../components/ResetPassword/ResetPassword';
import Spinner from '../../components/Smart/Spinner/Spinner';
import { Main, MainContent } from '../../styles/globalStyles';
import { UpdateButton } from '../StaffView/styles';
import { getUser, resetUser } from '../StaffView/actions';
// import { Title, TextTitle, TextName } from './styles'
import { editAccount } from './actions';

function Account({ match, getUser, staffUser, resetUser, screenSize, editAccount }) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showPassModal, setShowPassModal] = useState(false);
    const [editAndCreateValues, setEditAndCreateValues] = useState({});
    const [validations, setValidations] = useState({
        passwordLengthVal: false,
        lowerCaseVal: false,
        uppercaseVal: false,
        numberVal: false,
        password: "",
        confirmPassword: ""
    });
    const [requiredErrors, setRequiredErrors] = useState([false, false, false, false, false, false, false]);
    const [passReq, setPassReq] = useState([false, false, false]);
    const appState = useSelector((state) => state.AppReducer);

    const staffBody = useCallback(() => {
        return staffUser && <> {[{ title: 'First name', name: 'first_name' }, { title: 'Last name', name: 'last_name' },
        { title: 'Email', name: 'email' }, { title: 'Phone', name: 'phone_number' }].map((el, i) => {
            return <Row className="mb-7" key={el.name}>
                <Col className="mb-0" xs={screenSize > 830 ? 4 : 12}>
                    <label className="col-xs-12 fw-bold text-muted"> {el.title}</label>
                </Col>

                <Col className="mb-0" xs={screenSize > 830 ? 8 : 12}>
                    <span className="fw-bolder fs-6 text-gray-800">
                        {staffUser[el.name]}
                    </span>
                </Col>
            </Row>
        })}
            {
                [{ title: 'Position', name: 'position' }, { title: 'Role', name: 'role' }].map((el) => {
                    return <Row className="mb-7" key={el.name}> <Col className="mb-0" xs={screenSize > 830 ? 4 : 12}>
                        <label className="col-xs-12 fw-bold text-muted">
                            {el.title}
                        </label>
                    </Col>

                        <Col xs={screenSize > 830 ? 8 : 12}>
                            <span className="fw-bolder fs-6 text-gray-800">
                                {staffUser[el.name]['name']}
                            </span>
                        </Col>
                    </Row>
                })
            }
        </>
    }, [screenSize, staffUser]);

    const cancleBtn = useCallback(() => {
        setShowModal(false);
        setEditAndCreateValues({
            first_name: staffUser.first_name,
            last_name: staffUser.last_name,
            email: staffUser.email,
            phone_number: staffUser.phone_number,
            role_id: `${staffUser.role.id} ${staffUser.role.name}`,
            position_id: `${staffUser.position.id} ${staffUser.position.name}`,
            password: staffUser.password,
            confirmPassword: staffUser.confirmPassword
        });
        setRequiredErrors([false, false, false, false, false, false, false]);
    });

    const closePasswordModal = useCallback(() => {
        setShowPassModal(false);
        setValidations({
            passwordLengthVal: false,
            lowerCaseVal: false,
            uppercaseVal: false,
            numberVal: false,
            password: "",
            confirmPassword: ""
        });
    }, []);

    const resetPassword = useCallback(() => {
        let cloneRequiredErrors = [...passReq];
        validations['password'] ? cloneRequiredErrors[0] = false : cloneRequiredErrors[0] = true;
        validations['confirmPassword'] ? cloneRequiredErrors[1] = false : cloneRequiredErrors[1] = true;
        validations['password'] === validations['confirmPassword'] ? cloneRequiredErrors[2] = false : cloneRequiredErrors[2] = true;

        if (cloneRequiredErrors.includes(true)) {
            setPassReq(cloneRequiredErrors);
        }
        else {
            if (Object.values(validations).includes(false)) {
                return
            }
            else {
                (async () => {
                    try {
                        dispatch({ type: 'PENDING', payload: true })

                        await axios.post(`${config["API"]}api/api/users/${match.params.id}/reset-password`, {
                            password: validations.password,
                            password_confirmation: validations.confirmPassword
                        }, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` } });

                        dispatch({
                            type: 'TOAST_MESSAGE',
                            successMessage: `Password has been changed`,
                            errorMessage: null
                        });
                        closePasswordModal();
                        setPassReq([false, false, false])

                    } catch (err) {

                        if (err.response && err.response.hasOwnProperty('status')) {
                            if (err.response.status === 401) {
                                logout();
                                dispatch({ type: 'saveToken', token: '' });
                                dispatch({
                                    type: 'TOAST_MESSAGE',
                                    successMessage: null,
                                    errorMessage: 'Log Out'
                                })
                            }
            
                            if (err.response.status === 422) {
                                dispatch({
                                    type: 'TOAST_MESSAGE',
                                    successMessage: null,
                                    errorMessage: err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]
                                })
                            }
                        }
            
                        dispatch({
                            type: 'TOAST_MESSAGE',
                            successMessage: null,
                            errorMessage: 'Error'
                        })
                    }
                })();
            }
        };

    }, [passReq, validations, match.params.id]);

    const getButtPassMod = useCallback(() => {
        return <Row>
            <Col xs={12} className="text-right">
                <button type="button"
                    onClick={closePasswordModal}
                    class="btn btn-light me-3" data-kt-stepper-action="previous">
                    Cancel</button>

                <button type="button" class="btn btn-primary"
                    data-kt-stepper-action="next"
                    onClick={resetPassword}>
                    Save
                </button>
            </Col>
        </Row>
    }, [passReq, validations]);

    useEffect(() => {
        getUser(match.params.id);
        // return () => { resetUser() }
    }, []);

    useEffect(() => {
        if (staffUser) {
            setEditAndCreateValues({
                first_name: staffUser.first_name,
                last_name: staffUser.last_name,
                email: staffUser.email,
                phone_number: staffUser.phone_number,
                role_id: `${staffUser.role.id} ${staffUser.role.name}`,
                position_id: `${staffUser.position.id} ${staffUser.position.name}`,
                password: staffUser.password,
                confirmPassword: staffUser.confirmPassword
            });
        }
    }, [staffUser]);

    return staffUser ? <Main>
        <MainContent style={{ boxShadow: '0 0 20px 0 rgb(76 87 125 / 2%)' }}>
            <Container style={{ minWidth: '100%' }} className="pb-3">
                <Row className="mb-4 pt-4 pb-3" style={{ borderBottom: '1px solid #eff2f5' }}>
                    <Col xs={appState.screenSize > 550 ? 4 : 12}>
                        <h1 class="d-flex align-items-center text-dark fw-bolder fs-3 my-1">
                            Profile Details
                        </h1>
                    </Col>
                    <Col xs={appState.screenSize > 550 ? 8 : 12} className={appState.screenSize > 550 ? "text-right" : "text-left"}>
                        <UpdateButton className="mr-2" onClick={() => { setShowModal(match.params.id) }}>Edit Profile</UpdateButton>
                        <UpdateButton onClick={() => { setShowPassModal(true) }}>Reset password</UpdateButton>
                    </Col>
                </Row>
                {staffBody()}
            </Container>

            {showModal && <UserAccountEdit
                editUser={editAccount}
                accountPage={true}
                showModal={showModal}
                setShowModal={setShowModal}
                cancleBtn={cancleBtn}
                setRequiredErrors={setRequiredErrors}
                editAndCreateValues={editAndCreateValues}
                requiredErrors={requiredErrors}
                userType={appState.userType}
                setEditAndCreateValues={setEditAndCreateValues} />}
        </MainContent>

        {showPassModal && <Modal getButtons={getButtPassMod} title="Reset password" handleOpen={closePasswordModal}>
            <div className="pl-3 pr-3">
                <ResetPassword
                    setValidations={setValidations}
                    validations={validations}
                    requiredValidation={passReq}
                />
            </div>
        </Modal>}
    </Main> : <Main> <MainContent style={{ paddingTop: "12%", paddingBottom: "12%" }}>
        <Spinner width="6em" borderWidth="0.55em" />
    </MainContent> </Main>
}

const mapStateToProps = (state) => {
    return {
        staffUser: state.StaffEditReducer.staffUser,
        screenSize: state.AppReducer.screenSize,
    };
};

const mapDispatchToProps = {
    getUser,
    resetUser,
    editAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);