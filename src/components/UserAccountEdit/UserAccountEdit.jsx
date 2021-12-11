import React, { useCallback, memo, useState } from 'react';
import { BsFillCircleFill, BsCheckCircleFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { BsExclamationCircle } from "react-icons/bs";
import FormControl from '@material-ui/core/FormControl';
import Tooltip from "@material-ui/core/Tooltip";
// import InputLabel from '@material-ui/core/InputLabel';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Modal from '../Smart/Modal/Modal';
import BlockInputs from '../Smart/InputBlock/InputBlock';
// import PhoneInputBlock from '../Smart/PhoneInputBlock/PhoneInputBlock';
import SelectComponent from '../Smart/SelectComponent/SelectComponent';
import { ValidationFont } from './style';
import { RedFont, InputTitle } from '../../styles/globalStyles';

const emailValidation = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const nonLowercaseLetters = /[a-z]/;
const nonUppercaseLetters = /[A-Z]/;
const nonNumber = /[0-9]/;

function UserAccountEdit({ setEditAndCreateValues, requiredErrors, userType, setRequiredErrors, showModal, setShowModal,
    accountPage, editAndCreateValues, addUser, cancleBtn, editUser }) {

    const isMobile = useSelector((state) => state.AppReducer.screenSize);

    const [validations, setValidations] = useState({
        emailval: false,
        passwordLengthVal: false,
        lowerCaseVal: false,
        uppercaseVal: false,
        numberVal: false
    });

    const setValues = useCallback(({ target }) => {
        setEditAndCreateValues({
            ...editAndCreateValues,
            [target.name]: target.value
        })
    }, [editAndCreateValues]);

    const emailHandleChange = useCallback((event) => {
        let cloneValidations = { ...validations };
        emailValidation.test(event.target.value) ? cloneValidations.emailval = false : cloneValidations.emailval = true;
        setValidations(cloneValidations);
        setValues(event);
    }, [editAndCreateValues]);

    const passwordHandle = useCallback((event) => {
        let cloneValidations = { ...validations };
        nonLowercaseLetters.test(event.target.value) ? cloneValidations.lowerCaseVal = true : cloneValidations.lowerCaseVal = false;
        nonUppercaseLetters.test(event.target.value) ? cloneValidations.uppercaseVal = true : cloneValidations.uppercaseVal = false;
        nonNumber.test(event.target.value) ? cloneValidations.numberVal = true : cloneValidations.numberVal = false;
        event.target.value.length > 8 ? cloneValidations.passwordLengthVal = true : cloneValidations.passwordLengthVal = false;
        setValidations(cloneValidations);
        setValues(event);
    }, [editAndCreateValues]);

    const paintMainValues = useCallback(() => {
        return <Row>{[{ title: 'First name', name: 'first_name' },
        { title: 'Last name', name: 'last_name' }].map((el, i) => <Col xs={isMobile > 500 ? 6 : 12} key={el.title}>
            <InputTitle>{el.title}<RedFont>*</RedFont> </InputTitle>
            <div className="mb-4" style={{ borderColor: '1px solid red' }}>
                <BlockInputs
                    onChange={setValues}
                    name={el.name}
                    placeholder=""
                    title={el.title}
                    value={editAndCreateValues[el.name]}
                    require={requiredErrors[i]}
                />
            </div>
        </Col>
        )}

            <Col xs={isMobile > 500 ? 6 : 12} className="mb-4">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <InputTitle>Email<RedFont>*</RedFont></InputTitle>
                    <div><RedFont>{validations.emailval ? 'Must be a email' : ''}</RedFont></div> </div>

                <BlockInputs
                    onChange={emailHandleChange}
                    name="email"
                    title="Email"
                    placeholder=""
                    value={editAndCreateValues["email"]}
                    require={requiredErrors[2]}
                />
                {/* <div className="text-right"><RedFont className="mb-3" style={{ fontSize: '10px' }}>
                <b>{validations.emailval ? 'Must be a email' : ''}</b></RedFont></div> */}
                {/* <span className="mb-3"></span> */}
            </Col>

            <Col xs={isMobile > 500 ? 6 : 12} className="mb-4">
                <InputTitle>Phone <RedFont>*</RedFont> </InputTitle>
                <BlockInputs
                    onChange={setValues}
                    name="phone_number"
                    placeholder="+1 743 449-7033"
                    value={editAndCreateValues["phone_number"]}
                    require={requiredErrors[3]}
                    title="Phone"
                    type="tel"
                />
            </Col>
        </Row>
    }, [editAndCreateValues, requiredErrors]);

    const createOrEdit = useCallback(() => {
        let cloneRequiredErrors = [...requiredErrors];
        ['first_name', 'last_name', 'email', 'phone_number', 'role_id', 'position_id'].map((el, i) => {
            cloneRequiredErrors[i] = editAndCreateValues[el] ? false : true
        });

        if (showModal === 'Create') {
            cloneRequiredErrors[6] = editAndCreateValues['password'] ? false : true;
            cloneRequiredErrors[7] = editAndCreateValues['confirmPassword'] ? false : true;
            editAndCreateValues.password !== editAndCreateValues.confirmPassword ? cloneRequiredErrors[8] = true : cloneRequiredErrors[8] = false;
        }

        if (cloneRequiredErrors.includes(true) && Object.values(validations).includes(false)) {
            setRequiredErrors(cloneRequiredErrors);
        }
        else {
            if (showModal === 'Create') {
                addUser({ ...editAndCreateValues, username: editAndCreateValues.email });
            }
            else {
                editUser(editAndCreateValues, showModal);
                setShowModal(false);
                setRequiredErrors([false, false, false]);
            }

            if (!accountPage && showModal === 'Create') {
                setShowModal(false);
                setEditAndCreateValues({
                    first_name: "",
                    last_name: "",
                    username: "",
                    email: "",
                    phone_number: "",
                    role_id: "2 manager",
                    position_id: "1 manager",
                    password: "",
                    confirmPassword: ""
                });
                setRequiredErrors([false, false, false]);
            }
        };

    }, [editAndCreateValues, showModal, editUser]);

    const getModalButtons = useCallback(() => {
        return <Row>
            <Col xs={12} className="text-right">
                <button type="button"
                    onClick={cancleBtn}
                    class="btn btn-light me-3" data-kt-stepper-action="previous">
                    Cancel</button>

                <button type="button" class="btn btn-primary"
                    data-kt-stepper-action="next"
                    onClick={createOrEdit}>
                    {showModal === 'Create' ? 'Create' : 'Save'}
                </button>
            </Col>
        </Row>
    }, [showModal, editAndCreateValues]);

    const pasValidations = useCallback(() => {
        return <>
            {[{ validationsName: 'lowerCaseVal', title: 'lowercase letter.' }, { validationsName: 'uppercaseVal', title: 'uppercase letter.' },
            { validationsName: 'numberVal', title: 'one number.' }, { validationsName: 'passwordLengthVal', title: 'Length must be at least 8 characters.' }].map((el, i) => {
                return <div className="text-left" key={el.title}>
                    <ValidationFont>{validations[el.validationsName] ? <BsCheckCircleFill size={8} color="#5cff5c" className="mr-2" /> :
                        <BsFillCircleFill size={8} className="mr-2" color="white" />}
                        Must contain at least {el.title}</ValidationFont>
                </div>
            })}
        </>
    }, [validations])

    return <>
        <Modal
            getButtons={getModalButtons}
            handleOpen={cancleBtn}
            title={showModal === 'Create' ? 'Create new user' : accountPage ? 'Edit Profile Details' : 'Edit user'}
        > <div>
                <Container>
                    {paintMainValues()}
                    <FormControl fullWidth className="mt-2 mb-4" size="small" >
                        <InputTitle>Position<RedFont>*</RedFont> </InputTitle>
                        <SelectComponent
                            value={editAndCreateValues.position_id.split(" ")[1]}
                            options={[
                                { value: "1 manager", title: "manager" },
                                { value: "2 accountant", title: "accountant" },
                                { value: "3 waiter", title: "waiter" }]}
                            setValues={setValues}
                            name="position_id"
                        />
                    </FormControl>

                    <FormControl fullWidth className="mb-4" size="small">
                        <InputTitle>Role<RedFont>*</RedFont> </InputTitle>
                        <SelectComponent
                            value={editAndCreateValues['role_id'].split(" ")[1]}
                            options={[{ value: "1 administrator", title: "administrator" },
                            { value: "2 manager", title: "manager" },
                            { value: "3 user", title: "user" }]}
                            setValues={setValues}
                            name="role_id"
                        />
                    </FormControl>

                    {showModal === 'Create' && <>
                        <div className="mb-4"> <InputTitle>Password<RedFont className="mr-1 ml-1">*</RedFont><Tooltip title={pasValidations()} placement="top">
                            <span><BsExclamationCircle size={15} color="grey" /></span>
                        </Tooltip></InputTitle>
                            <BlockInputs
                                onChange={passwordHandle}
                                name="password"
                                type="password"
                                placeholder=""
                                title="Password"
                                value={editAndCreateValues["password"]}
                                require={requiredErrors[6]}
                            />
                        </div>

                        <InputTitle>Confirm password<RedFont>*</RedFont> </InputTitle>
                        <BlockInputs
                            onChange={setValues}
                            name="confirmPassword"
                            type="password"
                            placeholder=""
                            value={editAndCreateValues["confirmPassword"]}
                            require={requiredErrors[7]}
                        />
                        <div className="mb-4 pl-2 text-center">
                            {requiredErrors[8] && <RedFont>Password and Confirm password must be match</RedFont>}</div>
                    </>}
                </Container>
            </div>
        </Modal>

    </>
}

export default memo(UserAccountEdit);

