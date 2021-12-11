import React, { useState, useCallback } from 'react';
import { FcGoogle } from "react-icons/fc";
import { connect } from 'react-redux';
import {
    // Container, Row, Col, 
    Button
} from 'react-bootstrap';
import Checkbox from '@material-ui/core/Checkbox';
// import Modal from '../../components/Smart/Modal/Modal';
import BlockInputs from '../../components/Smart/InputBlock/InputBlock';
// import { MainContent, MainRow, LogButton, ForgotePass, InputTitle, LogIcon, Or, SignIn } from './styles';
import brandLogo from './grandvenue.jpg';
import { login, forgotPassw } from './actions';
import RecIcon from '../../components/Smart/ReqIcon/ReqIcon';
import StyleConstants from '../../styles/StyleConstants';

const emailValidation = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Login({ login, forgotPassw }) {
    const [stateValues, setStateValues] = useState({
        email: '',
        emailReg: false,
        loginError: false,
        password: '',
        passwordError: false,
    });

    const [forgotPass, setForgotPass] = useState(false);

    const handleChange = useCallback((name, value, errorName, cloneState) => {
        cloneState[name] = value;
        value ? cloneState[errorName] = false : cloneState[errorName] = true;
        setStateValues(cloneState);
    }, [stateValues]);

    const emailHandleChange = useCallback(({ target }) => {
        let cloneState = { ...stateValues };
        emailValidation.test(target.value) ? cloneState.emailReg = false : cloneState.emailReg = true;
        handleChange('email', target.value, 'loginError', cloneState);
    }, [stateValues]);

    const loginApp = useCallback(() => {
        if (stateValues.email && stateValues.password) {
            login({ email: stateValues.email, password: stateValues.password });
        }
        else {
            let cloneState = { ...stateValues };
            stateValues.email ? cloneState.loginError = false : cloneState.loginError = true;
            stateValues.password ? cloneState.passwordError = false : cloneState.passwordError = true;
            setStateValues(cloneState)
        };
    }, [stateValues]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            loginApp();
        }
    };

    const getButtons = useCallback(() => {

        return <>
            <Button
                variant="outline-secondary"
                className="mr-2"
                onClick={() => { setForgotPass(false) }}
            >
                Cancel
            </Button>{' '}

            <Button
                variant="outline-primary"
                className="ml-2"
                onClick={() => { forgotPassw(); setForgotPass(false) }}
            >
                Send
            </Button>{' '}
        </>

    }, []);

    return <div className="d-flex flex-column flex-root">
        <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
        // style="background-image: url(assets/media/illustrations/sketchy-1/14.png"
        >
            <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
                <a className="mb-12">
                    <img alt="Logo" src={brandLogo} className="h-60px" />
                </a>
                <div className="w-lg-500px bg-body rounded shadow-xs p-10 p-lg-15 mx-auto">
                    {!forgotPass ? <div className="text-center mb-10">
                        <h2 className="text-dark mb-3">Sign In to Grand Venue</h2>
                    </div> :
                        <div className="text-center mb-10">
                            <h2 className="text-dark mb-3">Forgot Password ?</h2>
                            <div className="text-gray-400 fw-bold fs-4">Enter your email to reset your password.</div>
                        </div>}
                    <div className="fv-row mb-10">
                        <label className="form-label fs-6 fw-bolder text-dark">Email</label>
                        <input
                            onChange={emailHandleChange}
                            value={stateValues.email}
                            className="form-control form-control-lg form-control-solid"
                            type="text" name="email" autoComplete="off" />
                        {stateValues.loginError && <div className="fs-7 text-danger mt-2">Email address is required</div>}
                    </div>
                    {!forgotPass && <div className="fv-row mb-10">
                        <div className="d-flex flex-stack mb-2">
                            <label className="form-label fw-bolder text-dark fs-6 mb-0">Password</label>
                            <a className="link-primary fs-6 fw-bolder" style={{ cursor: 'pointer' }}
                                onClick={() => { setForgotPass(true) }}
                            >Forgot Password ?</a>
                        </div>
                        <input
                            className="form-control form-control-lg form-control-solid"
                            type="password"
                            onChange={({ target }) => {
                                handleChange('password', target.value, 'passwordError', { ...stateValues })
                            }}
                            onKeyPress={handleKeyDown}
                            name="password"
                            value={stateValues.password}
                            autoComplete="off" />
                        {stateValues.passwordError && <div className="fs-7 text-danger mt-2">Password address is required</div>}

                        <div className="form-label fs-6 fw-bolder text-dark">
                            <Checkbox {...label} /> Remember me
                        </div>

                        {/* <div className="mb-3" style={{ borderColor: '1px solid red' }}>
                            <BlockInputs
                                onChange={({ target }) => {
                                    handleChange('password', target.value, 'passwordError', { ...stateValues })
                                }}
                                type="password"
                                onKeyPress={handleKeyDown}
                                name="password"
                                value={stateValues.password}
                                require={true}
                            />
                            </div> */}
                    </div>}

                    <div className="text-center">
                        {!forgotPass ? <button type="submit" id="kt_sign_in_submit" className="btn btn-lg btn-primary w-100 mb-5"
                            onClick={loginApp}
                        >
                            <span className="indicator-label">Continue</span>
                        </button> : <>

                            <button type="submit" id="kt_sign_in_submit" className="btn btn-lg btn-primary w-30 mb-5 mr-2"
                                onClick={() => { }}
                            >
                                <span className="indicator-label">Submit</span>
                            </button>
                            <button type="submit" id="kt_sign_in_submit" className="btn btn-lg btn-secondary w-30 mb-5 ml-2"
                                onClick={() => { setForgotPass(false) }}
                            >
                                <span className="indicator-label">Cancel</span>
                            </button>
                        </>}
                        {!forgotPass && <div className="text-center text-muted text-uppercase fw-bolder mb-5">or</div>}
                        {!forgotPass && <a className="btn btn-flex flex-center btn-light btn-lg w-100 mb-5">
                            <FcGoogle size={23} className="mr-2" />
                            Continue with Google</a>}
                    </div>
                </div>
            </div>
        </div>
    </div>




    // <MainContent>
    //     <div className="mb-5"> <img src={brandLogo} width="100px" /> </div>
    //     <MainRow>
    //         <Container>
    //             <Row className="mb-4 mt-3"><Col xs={12}> <SignIn>Sign In to Grand Venue</SignIn> </Col></Row>
    //             <Row className="mb-4">
    //                 <Col xs={12} className="text-left">
    //                     <InputTitle>Email</InputTitle>
    //                     <div className="mb-3" style={{ borderColor: '1px solid red' }}>
    //                         <BlockInputs
    //                             onChange={emailHandleChange}
    //                             name="email"
    //                             value={stateValues.email}
    //                             require={stateValues.loginError}
    //                         />
    //                     </div>
    //                 </Col>

    //                 <Col xs={12} className="text-left">
    //                     <div style={{
    //                         justifyContent: 'space-between',
    //                         alignItems: 'center',
    //                         display: 'flex'
    //                     }}><div><InputTitle>Password</InputTitle></div> <ForgotePass onClick={() => { setForgotPass(true) }}>Forgot Password ?</ForgotePass></div>
    //                     <div className="mb-3" style={{ borderColor: '1px solid red' }}>
    //                         <BlockInputs
    //                             onChange={({ target }) => {
    //                                 handleChange('password', target.value, 'passwordError', { ...stateValues })
    //                             }}
    //                             type="password"
    //                             onKeyPress={handleKeyDown}
    //                             name="password"
    //                             value={stateValues.password}
    //                             require={stateValues.passwordError}
    //                         />
    //                     </div>
    //                 </Col>
    //             </Row>

    //             <Row className="mb-3"><Col xs={12}><LogButton onClick={loginApp}>Continue</LogButton></Col></Row>

    //             <Row className="mb-3"><Col xs={12}><Or>OR</Or></Col></Row>

    //             <Row>
    //                 <Col xs={12}>
    //                     <LogIcon><FcGoogle size={23} className="mr-2" /> Continue with Google</LogIcon>
    //                 </Col>
    //             </Row>

    //         </Container>
    //     </MainRow>

    //     {
    //         forgotPass && <Modal handleOpen={() => { setForgotPass(false) }} title="Find your account" getButtons={getButtons}>
    //             <Container className="mb-3">
    //                 <Row>
    //                     <Col className="pl-4 pr-4">
    //                         <InputTitle>Email</InputTitle>
    //                         <div className="mb-3" style={{ borderColor: '1px solid red' }}>
    //                             <BlockInputs onChange={() => { }} />
    //                         </div>
    //                     </Col>
    //                 </Row>
    //             </Container>
    //         </Modal>
    //     }
    // </MainContent>
}

const mapDispatchToProps = {
    login,
    forgotPassw
};

export default connect(null, mapDispatchToProps)(Login);