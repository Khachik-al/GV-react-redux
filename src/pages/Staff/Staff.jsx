import React, { useCallback, useState, useEffect } from 'react';
import config from '../../configs.json';
import { BsChevronDown } from 'react-icons/bs';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { Row, Col } from 'react-bootstrap';
import Pagination from '@material-ui/core/Pagination';
import { ActionsBlock, CreateBlock } from './styles';
import { Main, MainContent, PaginationMain } from '../../styles/globalStyles';
import SearchBlock from '../../components/SearchBlock/SearchBlock';
import AddButton from '../../components/AddButton/AddButton';
import StaffTable from '../../components/Table/StaffTable/StaffTable';
import Modal from '../../components/Smart/Modal/Modal';
import UserAccountEdit from '../../components/UserAccountEdit/UserAccountEdit';
import ResetPassword from '../../components/ResetPassword/ResetPassword';
import Spinner from '../../components/Smart/Spinner/Spinner';
import { getUsers, deleteUsers, addUser, editUser } from './actions';
import { showToastMeassage } from '../../store/appActions';
import warningAlert from '../../utils/warningAlert';
import SelectOfPagination from '../../components/Smart/SelectOfPagination/SelectForPagination';

let searchVal = '';

function Staff({ getUsers, deleteUsers, users, count, addUser, editUser, showToastMeassage, pending }) {

    const [showModal, setShowModal] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    const [pageSizes, setPageSizes] = useState(10)
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

    const handleChange = debounce(() => {
        getUsers(page, pageSizes, searchVal);
        setPage(1)
    }, 300);

    const search = (e) => {
        searchVal = e.target.value
        handleChange()
    };

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
            <span className={style.dropbtn}>Actions <BsChevronDown size={appState.screenSize < 1100 ? 12 : 20} className='ml-3' /></span>
            {appState.userType === "1" ?
                <div className={style.dropdownContent}>
                    <Link to={`/staff/${list.id}`}>View</Link>
                    <span onClick={() => { onEdit(list) }}>Edit</span>
                    <span onClick={() => { setResetPassword({ id: list.id, name: list.first_name }) }}>Reset password</span>
                    <span onClick={() => {
                        warningAlert(() => {
                            showToastMeassage('seccessfuly deleted', null)
                            deleteUsers(
                                list.id,
                                page,
                                Math.ceil(count / pageSizes),
                                users.length === 1 ? true : false,
                                searchVal)
                        })
                    }}>Delete</span>
                </div> : <div className={style.dropdownContent}>
                    <Link to={`/staff/${list.id}`}>View</Link>
                </div>}
        </div>
    }, [onEdit, appState.userType, users, page, count, searchVal, pageSizes]);/* eslint-disable-line */

    const changePage = (event, page) => {
        getUsers(page, pageSizes, searchVal);
        setPage(page);
    };

    const cancleBtn = () => {
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
    };

    const getButtonsForReset = useCallback(() => {
        return <Row>
            <Col xs={12} className="text-right">
                <button type="button"
                    onClick={() => { setResetPassword(false) }}
                    className="btn btn-light me-3" data-kt-stepper-action="previous">
                    Cancel</button>

                <button type="button" class="btn btn-primary"
                    data-kt-stepper-action="next"
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
                </button>
            </Col>
        </Row>
    }, [validations, resetPassword.id]);/* eslint-disable-line */


    useEffect(() => {
        getUsers(1, 10);
    }, []);/* eslint-disable-line */

    return users && <Main className="pb-4 pt-4">
        <MainContent className={!(appState.screenSize < 800) ? 'pt-5 pb-4 pr-4 pl-5' : 'p-3 pb-4'}>
            <ActionsBlock className='mb-5'>
                <SearchBlock
                    onChange={search}
                />
                {appState.userType === "1" && <CreateBlock>
                    <AddButton clickFunc={(() => { setShowModal('Create') })} title="ADD USER" />
                </CreateBlock>}
            </ActionsBlock>
            {users.length ? <StaffTable
                ActionComponent={ActionComponent}
                titles={['FULL NAME', 'ROLE', 'EMAIL', 'PHONE', 'ACTION']}
                lists={users}
                gridCount={'20% 13% 25% 20% 20%'}
                isMobile={appState.screenSize}
            /> : <div className="p-5 text-center">No results were found for your search.</div>}

            {count > pageSizes && <PaginationMain>
                <div style={{ position: 'relative', width: '60px' }}><SelectOfPagination value={pageSizes} setValues={setPageSizes} /></div>
                <Pagination count={Math.ceil(count / pageSizes)} color="primary" page={page} onChange={changePage} size={appState.screenSize < 450 ? "small" : ""} />
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
            addUser={addUser}
            editUser={editUser}
            setEditAndCreateValues={setEditAndCreateValues}
        />}


        {resetPassword &&
            <Modal
                handleOpen={() => { setResetPassword(false) }}
                title={`Reset ${resetPassword.name} password???`}
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

        {pending && <Spinner />}
    </Main>
}

const mapStateToProps = (state) => {
    return {
        users: state.StaffReducer.users,
        count: state.StaffReducer.count,
        pending: state.StaffReducer.pending
    };
};

const mapDispatchToProps = {
    getUsers,
    deleteUsers,
    addUser,
    editUser,
    showToastMeassage
};

export default connect(mapStateToProps, mapDispatchToProps)(Staff);
// import React, { useCallback, useState, useEffect } from 'react';
// import config from '../../configs.json';
// import { BsChevronDown } from 'react-icons/bs';
// import axios from 'axios'
// import { useSelector, useDispatch } from 'react-redux';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import debounce from 'lodash.debounce';
// import { Row, Col, Button } from 'react-bootstrap';
// import Pagination from '@material-ui/core/Pagination';
// import { ActionsBlock, CreateBlock } from './styles';
// import { Main, MainContent, PaginationMain } from '../../styles/globalStyles';
// import SearchBlock from '../../components/SearchBlock/SearchBlock';
// import AddButton from '../../components/AddButton/AddButton';
// import StaffTable from '../../components/Table/StaffTable/StaffTable';
// import Modal from '../../components/Smart/Modal/Modal';
// import UserAccountEdit from '../../components/UserAccountEdit/UserAccountEdit';
// import ResetPassword from '../../components/ResetPassword/ResetPassword';
// import Spinner from '../../components/Smart/Spinner/Spinner';
// import { getUsers, deleteUsers, addUser, editUser } from './actions';
// import { showToastMeassage } from '../../store/appActions';
// import warningAlert from '../../utils/warningAlert';
// import SelectOfPagination from '../../components/Smart/SelectOfPagination/SelectForPagination';

// let searchVal = '';

// function Staff({ getUsers, deleteUsers, users, count, addUser, editUser, showToastMeassage, pending }) {

//     const [showModal, setShowModal] = useState(false);
//     const [resetPassword, setResetPassword] = useState(false);
//     const [pageSizes, setPageSizes] = useState(10)
//     const [page, setPage] = useState(1);
//     const [editAndCreateValues, setEditAndCreateValues] = useState({
//         first_name: "",
//         last_name: "",
//         username: "",
//         email: "",
//         phone_number: "",
//         role_id: "2 manager",
//         position_id: "1 manager",
//         password: "",
//         confirmPassword: ""
//     });
//     const [validations, setValidations] = useState({
//         passwordLengthVal: false,
//         lowerCaseVal: false,
//         uppercaseVal: false,
//         numberVal: false,
//         password: "",
//         confirmPassword: ""
//     });
//     const [requiredErrors, setRequiredErrors] = useState([false, false, false, false, false, false, false, false, false]);
//     const [requiredValidation, setRequiredValidations] = useState([false, false, false]);
//     const appState = useSelector((state) => state.AppReducer);
//     const dispatch = useDispatch();

//     const handleChange = debounce(() => {
//         getUsers(page, 10, searchVal);
//         setPage(1)
//     }, 300);

//     const search = (e) => {
//         searchVal = e.target.value
//         handleChange()
//     };

//     const onEdit = useCallback((list) => {
//         setEditAndCreateValues({
//             first_name: list.first_name,
//             last_name: list.last_name,
//             email: list.email,
//             phone_number: list.phone_number,
//             role_id: `${list.role.id} ${list.role.name}`,
//             position_id: `${list.position.id} ${list.position.name}`,
//             password: list.password,
//             is_active: true,
//             email_confirmed: false,
//             phone_number_confirmed: true,
//             is_removed: false,
//             confirmPassword: list.confirmPassword,
//             username: list.username
//         });
//         setShowModal(list.id);
//     }, []);

//     const ActionComponent = useCallback((style, list) => {
//         return <div className={style.dropdown}>
//             <span className={style.dropbtn}>Actions <BsChevronDown size={appState.screenSize < 1100 ? 12 : 20} className='ml-3' /></span>
//             {appState.userType === "1" ?
//                 <div className={style.dropdownContent}>
//                     <Link to={`/staff/${list.id}`}>View</Link>
//                     <span onClick={() => { onEdit(list) }}>Edit</span>
//                     <span onClick={() => { setResetPassword({ id: list.id, name: list.first_name }) }}>Reset password</span>
//                     <span onClick={() => {
//                         warningAlert(() => {
//                             showToastMeassage('seccessfuly deleted', null)
//                             deleteUsers(
//                                 list.id,
//                                 page,
//                                 Math.ceil(count / 10),
//                                 users.length === 1 ? true : false,
//                                 searchVal)
//                         })
//                     }}>Delete</span>
//                 </div> : <div className={style.dropdownContent}>
//                     <Link to={`/staff/${list.id}`}>View</Link>
//                 </div>}
//         </div>
//     }, [onEdit, appState.userType, users, page, count, searchVal]);

//     const changePage = (event, page) => {
//         getUsers(page, 10, searchVal);
//         setPage(page);
//     };

//     const cancleBtn = () => {
//         setShowModal(false);
//         setEditAndCreateValues({
//             first_name: "",
//             last_name: "",
//             username: "",
//             email: "",
//             phone_number: "",
//             role_id: "2 manager",
//             position_id: "1 manager",
//             password: "",
//             confirmPassword: ""
//         });
//         setRequiredErrors([false, false, false, false, false, false, false, false, false]);
//     };

//     const getButtonsForReset = useCallback(() => {
//         return <Row>
//             <Col xs={12} className="text-right">
//                 <button type="button"
//                     onClick={() => { setResetPassword(false) }}
//                     className="btn btn-light me-3" data-kt-stepper-action="previous">
//                     Cancel</button>

//                 <button type="button" class="btn btn-primary"
//                     data-kt-stepper-action="next"
//                     onClick={() => {
//                         let cloneRequiredValidation = [...requiredValidation];
//                         cloneRequiredValidation[0] = validations.password ? false : true;
//                         cloneRequiredValidation[1] = validations.confirmPassword ? false : true;
//                         cloneRequiredValidation[2] = validations.password === validations.confirmPassword ? false : true;
//                         if (cloneRequiredValidation.includes(true)) {
//                             setRequiredValidations(cloneRequiredValidation);
//                         }
//                         else {
//                             if (Object.values(validations).includes(false)) {
//                                 return
//                             }
//                             else {
//                                 (async () => {
//                                     try {
//                                         await axios.post(`${config["API"]}api/api/users/${resetPassword.id}/reset-password`, {
//                                             password: validations.password,
//                                             password_confirmation: validations.confirmPassword
//                                         },
//                                             { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` } });

//                                         dispatch({
//                                             type: 'TOAST_MESSAGE',
//                                             successMessage: `Password has been changed`,
//                                             errorMessage: null
//                                         });
//                                         setValidations({
//                                             passwordLengthVal: false,
//                                             lowerCaseVal: false,
//                                             uppercaseVal: false,
//                                             numberVal: false,
//                                             password: "",
//                                             confirmPassword: ""
//                                         });
//                                         setResetPassword(false);
//                                     } catch (err) {
//                                         dispatch({
//                                             type: 'TOAST_MESSAGE',
//                                             successMessage: null,
//                                             errorMessage: 'The given data was invalid.'
//                                         })
//                                     }
//                                 })();
//                             }
//                         }
//                     }}
//                 >Save
//                 </button>
//             </Col>
//         </Row>
//     }, [validations]);


//     useEffect(() => {
//         getUsers(1, 10);
//     }, []);

//     return users && <Main className="pb-4 pt-4">
//         <MainContent className={!(appState.screenSize < 800) ? 'pt-5 pb-4 pr-4 pl-5' : 'p-3 pb-4'}>
//             <ActionsBlock className='mb-5'>
//                 <SearchBlock
//                     onChange={search}
//                 />
//                 {appState.userType === "1" && <CreateBlock>
//                     <AddButton clickFunc={(() => { setShowModal('Create') })} title="ADD USER" />
//                 </CreateBlock>}
//             </ActionsBlock>
//             {users.length ? <StaffTable
//                 ActionComponent={ActionComponent}
//                 titles={['FULL NAME', 'ROLE', 'EMAIL', 'PHONE', 'ACTION']}
//                 lists={users}
//                 gridCount={'20% 13% 25% 20% 20%'}
//                 isMobile={appState.screenSize}
//             /> : <div className="p-5 text-center">No results were found for your search.</div>}

//             {count > 10 && <PaginationMain>
//                 <div style={{ position: 'relative', width: '60px'}}><SelectOfPagination value={pageSizes} setValues={setPageSizes} /></div>
//                 <Pagination count={Math.ceil(count / 10)} color="primary" page={page} onChange={changePage} size={appState.screenSize < 450 ? "small" : ""} />
//             </PaginationMain>}
//         </MainContent>

//         {showModal && <UserAccountEdit
//             showModal={showModal}
//             setShowModal={setShowModal}
//             cancleBtn={cancleBtn}
//             setRequiredErrors={setRequiredErrors}
//             editAndCreateValues={editAndCreateValues}
//             requiredErrors={requiredErrors}
//             userType={appState.userType}
//             addUser={addUser}
//             editUser={editUser}
//             setEditAndCreateValues={setEditAndCreateValues}
//         />}


//         {resetPassword &&
//             <Modal
//                 handleOpen={() => { setResetPassword(false) }}
//                 title={`Reset ${resetPassword.name} password???`}
//                 getButtons={getButtonsForReset}
//             >
//                 <div className="pr-3 pl-3">
//                     <ResetPassword
//                         setValidations={setValidations}
//                         validations={validations}
//                         requiredValidation={requiredValidation}
//                     />
//                 </div>
//             </Modal>}

//         {pending && <Spinner />}
//     </Main>
// }

// const mapStateToProps = (state) => {
//     return {
//         users: state.StaffReducer.users,
//         count: state.StaffReducer.count,
//         pending: state.StaffReducer.pending
//     };
// };

// const mapDispatchToProps = {
//     getUsers,
//     deleteUsers,
//     addUser,
//     editUser,
//     showToastMeassage
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Staff);
