import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastMeassage } from '../../store/appActions';

function Toast({ message, showToastMeassage }) {
    if (message === 'Succses') {
        toast.success(message, {
            onClose: () => { showToastMeassage('') }
        });
    }
    else {
        toast.error(message, {
            onClose: () => { showToastMeassage('') }
        });
    }


    return (
        <>
            <ToastContainer />
        </>
    );
}

const mapDispatchToProps = {
    showToastMeassage
};

export default connect(null, mapDispatchToProps)(Toast);