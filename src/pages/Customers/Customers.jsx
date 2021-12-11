import React, { useCallback, useState, useEffect } from 'react';
import config from '../../configs.json';
import axios from 'axios'
// import _debounce from 'lodash/debounce';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import debounce from 'lodash.debounce';
import { Button } from 'react-bootstrap';
import Pagination from '@material-ui/core/Pagination';
// import { ActionsBlock, CreateBlock } from './styles';
import { Main, MainContent, PaginationMain } from '../../styles/globalStyles';
// import SearchBlock from '../../components/SearchBlock/SearchBlock';
// import AddButton from '../../components/AddButton/AddButton';
import StaffTable from '../../components/Table/StaffTable/StaffTable';
import Modal from '../../components/Smart/Modal/Modal';
import UserAccountEdit from '../../components/UserAccountEdit/UserAccountEdit';
import ResetPassword from '../../components/ResetPassword/ResetPassword';
import {
    getUsers,
    // deleteUsers, addUser, editUser 
} from './actions';
import { showToastMeassage } from '../../store/appActions';

let searchVal = '';

function Customers({ getUsers,
    // deleteUsers, 
    users, count,
    // addUser, editUser, 
    showToastMeassage }) {

    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    const [page, setPage] = useState(1);
    const [editAndCreateValues, setEditAndCreateValues] = useState({
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
    const [validations, setValidations] = useState({
        passwordLengthVal: false,
        lowerCaseVal: false,
        uppercaseVal: false,
        numberVal: false,
        password: "",
        confirmPassword: ""
    });
    const [requiredErrors, setRequiredErrors] = useState([false, false, false, false, false, false, false, false, false]);
    const [requiredValidation, setRequiredValidations] = useState([false, false, false]);
    const appState = useSelector((state) => state.AppReducer);
    const dispatch = useDispatch();

    // const handleChange = debounce(() => {
    //     getUsers(page, 10, searchVal);
    //     setPage(1)
    // }, 300);

    // const search = (e) => {
    //     searchVal = e.target.value
    //     handleChange()
    // };

    const onEdit = useCallback((list) => {
        setEditAndCreateValues({
            first_name: list.first_name,
            last_name: list.last_name,
            email: list.email,
            phone_number: list.phone_number,
            role_id: `${list.role.id} ${list.role.name}`,
            position_id: `${list.position.id} ${list.position.name}`,
            password: list.password,
            is_active: true,
            email_confirmed: false,
            phone_number_confirmed: true,
            is_removed: false,
            confirmPassword: list.confirmPassword,
            username: list.username
        });
        setShowModal(list.id);
    }, []);

    const ActionComponent = useCallback((style, list) => {
        return <div className={style.dropdown}>
            <span className={style.dropbtn}>Actions</span>
            {appState.userType === "1" ?
                <div className={style.dropdownContent}>
                    {/* <Link to={`/customers/${list.id}`}>View</Link> */}
                    <span 
                    // onClick={() => { onEdit(list) }}
                    >Edit</span>
                    <span 
                    // onClick={() => { setResetPassword({ id: list.id, name: list.first_name }) }}
                    >Reset password</span>
                    <span 
                    // onClick={() => { setDeleteModal({ id: list.id, name: `${list.first_name} ${list.last_name}` }) }}
                    >Delete</span>
                </div> : <div className={style.dropdownContent}>
                    {/* <Link to={`/customers/${list.id}`}>View</Link> */}
                </div>}
        </div>
    }, []);

    const changePage = useCallback((event, page) => {
        getUsers(page, 10, searchVal);
        setPage(page);
    });

    const cancleBtn = useCallback(() => {
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
        setRequiredErrors([false, false, false, false, false, false, false, false, false]);
    })

    const getButtons = useCallback(() => {
        return <div>
            <Button
                variant="outline-secondary"
                className="mr-2"
                onClick={() => { setDeleteModal(false) }}
            >Cancel
            </Button>{' '}
            <Button
                variant="outline-danger"
                className="ml-2"
                onClick={() => {
                    showToastMeassage('seccessfuly deleted', null)
                    // deleteUsers(deleteModal.id, setDeleteModal, page, Math.ceil(count / 10), users.length === 1 ? true : false, searchVal)
                }}
            >Delete
            </Button>{' '}
        </div>
    }, [deleteModal, page, count, users]);

    const getButtonsForReset = useCallback(() => {
        return <div>
            <Button
                variant="outline-secondary"
                className="mr-2"
                onClick={() => { setResetPassword(false) }}
            >Cancel
            </Button>{' '}
            <Button
                variant="outline-primary"
                className="ml-2"
                onClick={() => {
                    let cloneRequiredValidation = [...requiredValidation];
                    cloneRequiredValidation[0] = validations.password ? false : true;
                    cloneRequiredValidation[1] = validations.confirmPassword ? false : true;
                    cloneRequiredValidation[2] = validations.password === validations.confirmPassword ? false : true;
                    if (cloneRequiredValidation.includes(true)) {
                        setRequiredValidations(cloneRequiredValidation);
                    }
                    else {
                        if (Object.values(validations).includes(false)) {
                            return
                        }
                        else {
                            (async () => {
                                try {
                                    await axios.post(`${config["API"]}api/api/users/${resetPassword.id}/reset-password`, {
                                        password: validations.password,
                                        password_confirmation: validations.confirmPassword
                                    },
                                        { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` } });

                                    dispatch({
                                        type: 'TOAST_MESSAGE',
                                        successMessage: `Password has been changed`,
                                        errorMessage: null
                                    });
                                    setValidations({
                                        passwordLengthVal: false,
                                        lowerCaseVal: false,
                                        uppercaseVal: false,
                                        numberVal: false,
                                        password: "",
                                        confirmPassword: ""
                                    });
                                    setResetPassword(false);
                                } catch(err) {
                                    dispatch({
                                        type: 'TOAST_MESSAGE',
                                        successMessage: null,
                                        errorMessage: 'The given data was invalid.'
                                    })
                                }
                            })();
                        }
                    }
                }}
            >Save
            </Button>{' '}
        </div>
    }, [validations]);


    useEffect(() => {
        getUsers(1, 10);
    }, []);

    return users && <Main className="pb-4">
        <MainContent className="p-3 pb-4">
            {/* <ActionsBlock>
                <SearchBlock
                    onChange={search}
                />
                {appState.userType === "1" && <CreateBlock>
                    <AddButton clickFunc={(() => { setShowModal('Create') })} title="ADD USER" />
                </CreateBlock>}
            </ActionsBlock> */}
            {count ? <StaffTable
                ActionComponent={ActionComponent}
                yessss={true}
                titles={['Full name', 'Email', 'Phone']}
                lists={Object.values(users)}
                gridCount={'40% 30% 30%'}
                isMobile={appState.screenSize}
                customer={true}
            /> : <div className="p-5 text-center">No results were found for your search.</div>}

            {count > 10 && <PaginationMain>
                <Pagination count={Math.ceil(count / 10)} color="primary" page={page} onChange={changePage} size={appState.screenSize < 450 ? "small" : ""} />
            </PaginationMain>}
        </MainContent>

        {showModal && <UserAccountEdit
            showModal={showModal}
            setShowModal={setShowModal}
            cancleBtn={cancleBtn}
            setRequiredErrors={setRequiredErrors}
            editAndCreateValues={editAndCreateValues}
            requiredErrors={requiredErrors}
            userType={appState.userType}
            // addUser={addUser}
            // editUser={editUser}
            setEditAndCreateValues={setEditAndCreateValues}
        />}

        {deleteModal &&
            <Modal
                handleOpen={() => { setDeleteModal(false) }}
                title={`Do you want to delete ${deleteModal.name}?`}
                getButtons={getButtons}
            ></Modal>}

        {resetPassword &&
            <Modal
                handleOpen={() => { setResetPassword(false) }}
                title={`Reset ${resetPassword.name} password․`}
                getButtons={getButtonsForReset}
            >
                <div className="pr-3 pl-3">
                    <ResetPassword
                        setValidations={setValidations}
                        validations={validations}
                        requiredValidation={requiredValidation}
                    />
                </div>
            </Modal>}
    </Main>
}

const mapStateToProps = (state) => {
    return {
        users: state.CustomersReducer.customers,
        count: state.CustomersReducer.count
    };
};

const mapDispatchToProps = {
    getUsers,
    // deleteUsers,
    // addUser,
    // editUser,
    showToastMeassage
};

export default connect(mapStateToProps, mapDispatchToProps)(Customers);