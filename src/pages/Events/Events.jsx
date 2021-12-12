// import React, { useEffect, useCallback, useState } from 'react';
// import { connect } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import debounce from 'lodash.debounce';
// import { Row, Col } from 'react-bootstrap';
// import Pagination from '@material-ui/core/Pagination';
// import { ActionsBlock, CreateBlock } from './styles';
// import { Main, MainContent, PaginationMain } from '../../styles/globalStyles';
// import SelectOfPagination from '../../components/Smart/SelectOfPagination/SelectForPagination';
// import Spinner from '../../components/Smart/Spinner/Spinner';
// import Modal from '../../components/Smart/Modal/Modal';
// import SearchBlock from '../../components/SearchBlock/SearchBlock';
// import AddButton from '../../components/AddButton/AddButton';
// import FilterButton from '../../components/FilterButton/FilterButton';
// import CreateEvents from '../../components/CreateEvents/CreateEvents';
// import Table from '../../components/Table/Table';
// import { getData, createEvent, deleteEvent } from './actions';
// import { getMenu } from '../Settings/actions';

// let searchVal = '';

// function Events({ getData, getMenu, data, count, createEvent, deleteEvent, pending_create, cloneData }) {
//     const [showModal, setShowModal] = useState(false);
//     const [page, setPage] = useState(1);
//     const [pageSizes, setPageSizes] = useState(10)
//     const [deleteModal, setDeleteModal] = useState(false);
//     const isMobile = useSelector((state) => state.AppReducer.screenSize);
//     const dispatch = useDispatch();
//     const [filterValues, setFilterValues] = useState({ status: '', event_type: '', name: '', month: '' });
//     const [sortVal, setSortVal] = useState([false, false, false]);

//     const handleChange = debounce(() => {
//         getData({
//             status: filterValues.status ? filterValues.status.split(' ')[1] : '',
//             event_type: filterValues.event_type ? filterValues.event_type.split(' ')[1] : '',
//             month: filterValues.month ? filterValues.month.split(' ')[1] : '',
//             name: searchVal,
//         })
//         setPage(1);
//         setFilterValues({
//             ...filterValues, name: searchVal
//         })
//     }, 250);

//     const search = (e) => {
//         searchVal = e.target.value
//         handleChange()
//     };


//     const changePage = useCallback((event, page) => {
//         setPage(page);
//     });

//     const ActionComponent = useCallback((style, id, name) => {
//         return <div className={style.dropdown}>
//             <span className={style.dropbtn}>Actions</span>
//             <div className={style.dropdownContent}>
//                 <Link to={`/eventsview/${id}`}>View</Link>
//                 <Link to={`/eventsedit/${id}`}>Edit</Link>
//                 <span onClick={() => { setDeleteModal({ 'name': name, id: id }) }}>Delete</span>
//             </div>
//         </div>
//     }, []);

//     const getButtons = useCallback(() => {
//         return <Row>
//             <Col xs={12} className="text-right">
//                 <button type="button"
//                     onClick={() => { setDeleteModal(false) }}
//                     class="btn btn-light me-3"
//                     data-kt-stepper-action="previous">
//                     cancel</button>

//                 <button type="button" class="btn btn-danger"
//                     data-kt-stepper-action="next"
//                     onClick={() => {
//                         deleteEvent(deleteModal.id, setDeleteModal, page, Math.ceil(count / pageSizes),
//                             Object.values(data).slice(page === 1 ? 0 : (page - 1) * pageSizes, page === 1 ? pageSizes : page * pageSizes).length === 1
//                                 ? true : false, searchVal, setPage);
//                     }}>
//                     Delete
//                 </button>
//             </Col>
//         </Row>
//     }, [
//         deleteModal, page, count, data
//     ]);

//     const onApply = useCallback(() => {
//         getData({
//             status: filterValues.status ? filterValues.status.split(' ')[1] : '',
//             month: filterValues.month ? filterValues.month.split(' ')[1] : '',
//             event_type: filterValues.event_type ? filterValues.event_type.split(' ')[1] : '',
//             name: filterValues.name
//         });
//         setPage(1);
//     }, [filterValues]);

//     const onReset = useCallback(() => {
//         getData({
//             status: '',
//             event_type: '',
//             month: '',
//             name: filterValues.name
//         });
//         setPage(1);
//         setFilterValues({ status: '', event_type: '', name: filterValues.name })
//     }, [filterValues])

//     const sortArray = useCallback((index, category) => {
//         let clonesSortVal = [false, false, false];
//         if (sortVal[index] === 'down') {
//             setSortVal(clonesSortVal);
//             dispatch({
//                 type: 'GET_EVENTS',
//                 payload: [...cloneData]
//             })
//             return;
//         }
//         else {
//             if (sortVal[index]) {
//                 clonesSortVal[index] = 'down';
//             }
//             else {
//                 clonesSortVal[index] = true;
//             }
//         }

//         let array = [...data];


//         if (category === 'event_date') {

//             if (sortVal[index]) {
//                 // array.sort((a, b) => new Date(b[category]) - new Date(a[category]))
//                 array.sort((a, b) => new Date(b[category]) - new Date(a[category])).reverse();
//             }
//             else {
//                 array.sort((a, b) => new Date(b[category]) - new Date(a[category]))
//             }
//         }
//         else {
//             if (sortVal[index]) {
//                 array.sort(function (a, b) {
//                     if (a[category].name > b[category].name) {
//                         return -1;
//                     }
//                     return 0;
//                 });
//             }
//             else {
//                 array.sort(function (a, b) {
//                     if (a[category].name < b[category].name) {
//                         return -1;
//                     }
//                     return 0;
//                 });
//             }
//         }

//         setSortVal(clonesSortVal);
//         dispatch({
//             type: 'GET_EVENTS',
//             payload: array
//         })

//         // dispatch({
//         //     type: 'GET_EVENT',
//         //     payload: array
//         // });

//         // console.log(array);

//     }, [data, sortVal]);

//     useEffect(() => {
//         getData();
//         getMenu();
//     }, [])

//     return data ? <Main className="pb-4">
//         <MainContent className="p-3 pb-4">
//             <ActionsBlock>
//                 <SearchBlock
//                     onChange={search}
//                 />
//                 <CreateBlock>
//                     <div className="text-right">  <FilterButton title="FILTER" state={filterValues} handleChange={(e) => {
//                         setFilterValues({ ...filterValues, [e.target.name]: e.target.value })
//                     }}
//                         onApply={onApply}
//                         onReset={onReset}
//                     /></div>
//                     <div className="text-right"> <AddButton clickFunc={(() => { setShowModal('Create') })} title="ADD EVENT" /> </div>
//                 </CreateBlock>
//             </ActionsBlock>

//             {data.length ? <Table
//                 ActionComponent={ActionComponent}
//                 sortVal={sortVal}
//                 lists={data.slice(page === 1 ? 0 : (page - 1) * pageSizes, page === 1 ? pageSizes - 1 : page * pageSizes)}
//                 // lists={sortVal ? data : Object.values(data).slice(page === 1 ? 0 : (page - 1) * 10, page === 1 ? 9 : page * 10)}
//                 gridCount={'34% 15% 15% 13% 13%'}
//                 isMobile={isMobile}
//                 titles={['NAME', 'TYPE', 'DATE', 'STATUS', 'ACTIONS']}
//                 sortArray={sortArray}
//             /> : <div className="p-5 text-center">No results were found for your search.</div>}

//             {count > pageSizes && <PaginationMain>
//                 <div style={{ position: 'relative', width: '60px' }}><SelectOfPagination value={pageSizes} setValues={setPageSizes} /></div>
//                 <Pagination count={Math.ceil(count / pageSizes)} color="primary" page={page}
//                     onChange={changePage} size={isMobile < 450 ? "small" : ""} />
//             </PaginationMain>}

//         </MainContent>

//         {showModal && <CreateEvents onClose={setShowModal} isMobile={isMobile} createEvent={createEvent}
//             setPage={setPage} pending_create={pending_create} />}
//         {deleteModal &&
//             <Modal
//                 handleOpen={() => { setDeleteModal(false) }}
//                 title={`Do you want to delete event?`}
//                 getButtons={getButtons}
//             ></Modal>}
//     </Main> : <Main> <MainContent style={{ paddingTop: "22%", paddingBottom: "22%" }}>
//         <Spinner width="6em" borderWidth="0.55em" />
//     </MainContent> </Main>
// }

// const mapStateToProps = (state) => {
//     return {
//         data: state.EventsReducer.data,
//         cloneData: state.EventsReducer.cloneData,
//         count: state.EventsReducer.count,
//         pending_create: state.EventsReducer.pending
//     };
// };

// const mapDispatchToProps = {
//     getData,
//     getMenu,
//     createEvent,
//     deleteEvent
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Events);


import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import Pagination from '@material-ui/core/Pagination';
import { ActionsBlock, CreateBlock } from './styles';
import { Main, MainContent, PaginationMain } from '../../styles/globalStyles';
import SelectOfPagination from '../../components/Smart/SelectOfPagination/SelectForPagination';
import Spinner from '../../components/Smart/Spinner/Spinner';
import SearchBlock from '../../components/SearchBlock/SearchBlock';
import AddButton from '../../components/AddButton/AddButton';
import FilterButton from '../../components/FilterButton/FilterButton';
import CreateEvents from '../../components/CreateEvents/CreateEvents';
import Table from '../../components/Table/Table';
import { getData, createEvent, deleteEvent } from './actions';
import { getMenu } from '../Settings/actions';
import warningAlert from '../../utils/warningAlert';
import { BsChevronDown } from 'react-icons/bs';

let searchVal = '';

function Events({ getData, getMenu, data, count, createEvent, deleteEvent, pending_create, cloneData }) {
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSizes, setPageSizes] = useState(10)
    const isMobile = useSelector((state) => state.AppReducer.screenSize);
    const dispatch = useDispatch();
    const [filterValues, setFilterValues] = useState({ status: '', event_type: '', name: '', month: '' });
    const [sortVal, setSortVal] = useState([false, false, false]);

    const handleChange = debounce(() => {
        getData({
            status: filterValues.status ? filterValues.status.split(' ')[1] : '',
            event_type: filterValues.event_type ? filterValues.event_type.split(' ')[1] : '',
            month: filterValues.month ? filterValues.month.split(' ')[1] : '',
            name: searchVal,
        })
        setPage(1);
        setFilterValues({
            ...filterValues, name: searchVal
        })
    }, 250);

    const search = (e) => {
        searchVal = e.target.value
        handleChange()
    };


    const changePage = useCallback((event, page) => {
        setPage(page);
    });

    const ActionComponent = useCallback((style, id, name) => {
        return <div className={style.dropdown}>
            <span className={style.dropbtn}>Actions <BsChevronDown size={20} className='ml-3' /></span>
            <div className={style.dropdownContent}>
                <Link to={`/eventsview/${id}`}>View</Link>
                <Link to={`/eventsedit/${id}`}>Edit</Link>
                <span onClick={() => {
                    warningAlert(() => {
                        deleteEvent(id, page, Math.ceil(count / pageSizes),
                            Object.values(data).slice(page === 1 ? 0 : (page - 1) * pageSizes, page === 1 ? pageSizes : page * pageSizes).length === 1
                                ? true : false, searchVal, setPage);
                    })
                }}>Delete</span>
                {/* <span onClick={() => { setDeleteModal({ 'name': name, id: id }) }}>Delete</span> */}
            </div>
        </div>
    }, [page, data, searchVal, setPage, pageSizes]);

    const onApply = useCallback(() => {
        getData({
            status: filterValues.status ? filterValues.status.split(' ')[1] : '',
            month: filterValues.month ? filterValues.month.split(' ')[1] : '',
            event_type: filterValues.event_type ? filterValues.event_type.split(' ')[1] : '',
            name: filterValues.name
        });
        setPage(1);
    }, [filterValues]);

    const onReset = useCallback(() => {
        getData({
            status: '',
            event_type: '',
            month: '',
            name: filterValues.name
        });
        setPage(1);
        setFilterValues({ status: '', event_type: '', name: filterValues.name })
    }, [filterValues])

    const sortArray = useCallback((index, category) => {
        let clonesSortVal = [false, false, false];
        if (sortVal[index] === 'down') {
            setSortVal(clonesSortVal);
            dispatch({
                type: 'GET_EVENTS',
                payload: [...cloneData]
            })
            return;
        }
        else {
            if (sortVal[index]) {
                clonesSortVal[index] = 'down';
            }
            else {
                clonesSortVal[index] = true;
            }
        }

        let array = [...data];


        if (category === 'event_date') {

            if (sortVal[index]) {
                // array.sort((a, b) => new Date(b[category]) - new Date(a[category]))
                array.sort((a, b) => new Date(b[category]) - new Date(a[category])).reverse();
            }
            else {
                array.sort((a, b) => new Date(b[category]) - new Date(a[category]))
            }
        }
        else {
            if (sortVal[index]) {
                array.sort(function (a, b) {
                    if (a[category].name > b[category].name) {
                        return -1;
                    }
                    return 0;
                });
            }
            else {
                array.sort(function (a, b) {
                    if (a[category].name < b[category].name) {
                        return -1;
                    }
                    return 0;
                });
            }
        }

        setSortVal(clonesSortVal);
        dispatch({
            type: 'GET_EVENTS',
            payload: array
        })

        // dispatch({
        //     type: 'GET_EVENT',
        //     payload: array
        // });

        // console.log(array);

    }, [data, sortVal]);

    useEffect(() => {
        getData();
        getMenu();
    }, [])

    return data ? <Main className="pb-4 pt-4">
        <MainContent className="pt-5 pb-4 pr-4 pl-5">
            <ActionsBlock className='mb-5'>
                <SearchBlock
                    onChange={search}
                />
                <CreateBlock>
                    <div className="text-right mr-3">  <FilterButton title="FILTER" state={filterValues} handleChange={(e) => {
                        setFilterValues({ ...filterValues, [e.target.name]: e.target.value })
                    }}
                        onApply={onApply}
                        onReset={onReset}
                    /></div>
                    <div className="text-right"> <AddButton clickFunc={(() => { setShowModal('Create') })} title="ADD EVENT" /> </div>
                </CreateBlock>
            </ActionsBlock>

            {data.length ? <Table
                ActionComponent={ActionComponent}
                sortVal={sortVal}
                lists={data.slice(page === 1 ? 0 : (page - 1) * pageSizes, page === 1 ? pageSizes - 1 : page * pageSizes)}
                // lists={sortVal ? data : Object.values(data).slice(page === 1 ? 0 : (page - 1) * 10, page === 1 ? 9 : page * 10)}
                gridCount={'27% 17% 17% 17% 14%'}
                gridCountTitle={'27% 17% 18% 18% 12%'}
                isMobile={isMobile}
                titles={['USER', 'TYPE', 'DATE', 'STATUS', 'ACTIONS']}
                sortArray={sortArray}
            /> : <div className="p-5 text-center">No results were found for your search.</div>}

            {count > pageSizes &&
                <PaginationMain>
                    <div style={{ position: 'relative', width: '60px' }}><SelectOfPagination value={pageSizes} setValues={setPageSizes} /></div>
                    <Pagination count={Math.ceil(count / pageSizes)} color="primary" page={page}
                        onChange={changePage} size={isMobile < 450 ? "small" : ""} />
                </PaginationMain>}
        </MainContent>

        {showModal &&
            <CreateEvents
                onClose={setShowModal}
                isMobile={isMobile} createEvent={createEvent}
                setPage={setPage} pending_create={pending_create} />}
    </Main>
        :
        <Main>
            <MainContent style={{ paddingTop: "22%", paddingBottom: "22%" }}>
                <Spinner width="6em" borderWidth="0.55em" />
            </MainContent>
        </Main>
}

const mapStateToProps = (state) => {
    return {
        data: state.EventsReducer.data,
        cloneData: state.EventsReducer.cloneData,
        count: state.EventsReducer.count,
        pending_create: state.EventsReducer.pending
    };
};

const mapDispatchToProps = {
    getData,
    getMenu,
    createEvent,
    deleteEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);