import React, { useCallback, useState, useEffect } from 'react';
import config from '../../configs.json';
import axios from 'axios'
// import _debounce from 'lodash/debounce';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import debounce from 'lodash.debounce';
import { Button } from 'react-bootstrap';
import Pagination from '@material-ui/core/Pagination';
import { ActionsBlock, CreateBlock } from './styles';
import { Main, MainContent, PaginationMain } from '../../styles/globalStyles';
import CustomerInfo from '../../components/CreateEvents/childComponents/CustomerInfo';
import AddButton from '../../components/AddButton/AddButton';
import warningAlert from '../../utils/warningAlert';
// import SearchBlock from '../../components/SearchBlock/SearchBlock';
// import AddButton from '../../components/AddButton/AddButton';
import StaffTable from '../../components/Table/StaffTable/StaffTable';
import Modal from '../../components/Smart/Modal/Modal';
// import UserAccountEdit from '../../components/UserAccountEdit/UserAccountEdit';
import ResetPassword from '../../components/ResetPassword/ResetPassword';
import {
    getUsers, deleteUsers,
    // addUser, editUser 
} from './actions';
import { showToastMeassage } from '../../store/appActions';
import { BsChevronDown } from 'react-icons/bs';

let searchVal = '';

function Customers({ getUsers,
    deleteUsers,
    users, count,
    // addUser, editUser, 
    showToastMeassage }) {

    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    const [page, setPage] = useState(1);

    const [customerRequired, setCustomerRequired] = useState([false, false, false, false, false, false, false]);
    const [customerInfo, setCustomerInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phone_number: '',
        alt_phone_number: '',
        dl_number: '',
        dl_expire_date: ''
    });

    const [validations, setValidations] = useState({
        passwordLengthVal: false,
        lowerCaseVal: false,
        uppercaseVal: false,
        numberVal: false,
        password: "",
        confirmPassword: ""
    });

    const [requiredValidation, setRequiredValidations] = useState([false, false, false]);
    const appState = useSelector((state) => state.AppReducer);
    const dispatch = useDispatch();

    const onEdit = useCallback((list) => {
        setShowModal(list.id.toString());
        setCustomerInfo({
            ...list,
            firstName: list.full_name.split(" ")[0],
            lastName: list.full_name.split(" ")[1],
            dl_expire_date: new Date(list.dl_expire_date),
        });
    }, []);

    const ActionComponent = useCallback((style, list) => {
        return <div className={style.dropdown}>
            <span className={style.dropbtn}>Actions <BsChevronDown size={appState.screenSize < 1100 ? 12 : 20} className='ml-3' /></span>
            {appState.userType === "1" ?
                <div className={style.dropdownContent}>
                    <span
                        onClick={() => { onEdit(list) }}
                    >Edit</span>
                    <span onClick={() => {
                        warningAlert(() => {
                            // showToastMeassage('seccessfuly deleted', null)
                            deleteUsers(list.id)
                        })
                    }}>Delete</span>
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
        setCustomerRequired([false, false, false, false, false, false, false]);
        setCustomerInfo({
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            phone_number: '',
            alt_phone_number: '',
            dl_number: '',
            dl_expire_date: ''
        });
    }, []);

    const createOrEdit = useCallback(() => {
        let cloneReqArray = [...customerRequired];
        ['firstName', 'lastName', 'address', 'email',
            'phone_number', 'dl_number', 'dl_expire_date'].forEach((el, i) => customerInfo[el] ? cloneReqArray[i] = false : cloneReqArray[i] = true);
        if (cloneReqArray.includes(true)) {
            setCustomerRequired(cloneReqArray);
        }
        else {
            if (showModal === true) {
                axios.post(`${config["API"]}api/api/customers`,
                    {
                        full_name: customerInfo.firstName + ' ' + customerInfo.lastName,
                        email: customerInfo.email,
                        address: customerInfo.address,
                        phone_number: customerInfo.phone_number,
                        alt_phone_number: customerInfo.alt_phone_number,
                        dl_number: customerInfo.dl_number,
                        dl_expire_date: customerInfo.dl_expire_date
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                ).then(res => {
                    dispatch({
                        type: 'TOAST_MESSAGE',
                        successMessage: `${res.data.full_name} has been created`,
                        errorMessage: null
                    })

                    dispatch({
                        type: 'GET_CUSTOMERS',
                        payload: Object.values([...users, res.data]),
                    });

                    cancleBtn();

                }).catch(err => {
                    if (err.response.hasOwnProperty('status')) {
                        if (err.response.status === 422) {
                            dispatch({
                                type: 'TOAST_MESSAGE',
                                successMessage: null,
                                errorMessage: err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]
                            })
                        }
                    }
                })
            }
            else {
                axios.put(`${config["API"]}api/api/customers/${showModal}`, {
                    full_name: customerInfo.firstName + ' ' + customerInfo.lastName,
                    email: customerInfo.email,
                    address: customerInfo.address,
                    phone_number: customerInfo.phone_number,
                    alt_phone_number: customerInfo.alt_phone_number,
                    dl_number: customerInfo.dl_number,
                    dl_expire_date: customerInfo.dl_expire_date
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(res => {

                    let cloneUser = [...users];
                    let ind = cloneUser.findIndex(el => {
                        return el.id === Number(showModal)
                    });

                    cloneUser[ind] = res.data;

                    dispatch({
                        type: 'TOAST_MESSAGE',
                        successMessage: `${res.data.full_name} has been edited`,
                        errorMessage: null
                    });

                    dispatch({
                        type: 'GET_CUSTOMERS',
                        payload: cloneUser,
                    });

                    cancleBtn();

                }).catch(err => {
                    if (err.response.hasOwnProperty('status')) {
                        if (err.response.status === 422) {
                            dispatch({
                                type: 'TOAST_MESSAGE',
                                successMessage: null,
                                errorMessage: err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]
                            })
                        }
                    }
                })
            }
        }
    }, [customerInfo, customerRequired])

    const getButtons = useCallback(() => {
        return <div className="text-right">
            <button type="button"
                onClick={cancleBtn}
                className="btn btn-light me-3" data-kt-stepper-action="previous">
                Cancel
            </button>
            <button type="button" className="btn btn-primary"
                data-kt-stepper-action="next"
                onClick={createOrEdit}
            >
                {showModal === true ? 'Create' : 'Save'}
            </button>
        </div>
    }, [showModal, customerRequired, customerInfo]);

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
                                } catch (err) {
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

    return users && <Main className="pb-4 pt-4">
        <MainContent className={!(appState.screenSize < 800) ? 'pt-5 pb-4 pr-4 pl-5' : 'p-3 pb-4'}>
            <ActionsBlock>
                {/* <h1 class="d-flex align-items-center text-dark fw-bolder fs-3 my-1">
                    Customers
                </h1> */}
                {/* <SearchBlock
                    onChange={search}
                /> */}
                {appState.userType === "1" && <CreateBlock>
                    {/* <AddButton clickFunc={(() => { setShowModal(true) })} title="ADD CUSTOMER" /> */}
                </CreateBlock>}
            </ActionsBlock>
            {count ? <StaffTable
                ActionComponent={ActionComponent}
                titles={['Full name', 'Email', 'Phone']}
                lists={users}
                lists={users.slice(page === 1 ? 0 : (page - 1) * 10, page === 1 ? 10 : page * 10)}
                gridCount={'30% 30% 20% 20%'}
                isMobile={appState.screenSize}
                customer={true}
            /> : <div className="p-5 text-center">No results.</div>}

            {users.length > 10 && <PaginationMain>
                <div></div>
                <Pagination count={Math.ceil(users.length / 10)} color="primary" page={page} onChange={changePage} size={appState.screenSize < 450 ? "small" : ""} />
            </PaginationMain>}
        </MainContent>

        {showModal && <Modal
            handleOpen={cancleBtn}
            title="Create Customer"
            getButtons={getButtons}
        >
            <CustomerInfo requiredError={customerRequired} state={customerInfo}
                disabledAll={false} createActive={true}
                handleChange={({ target }) => { setCustomerInfo({ ...customerInfo, [target.name]: target.value }) }} />
        </Modal>

        }

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
    deleteUsers,
    // addUser,
    // editUser,
    showToastMeassage
};

export default connect(mapStateToProps, mapDispatchToProps)(Customers);