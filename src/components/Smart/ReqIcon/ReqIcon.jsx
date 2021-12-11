import React, { memo } from 'react';
import { IconCont } from '../InputBlock/styles';
import { BsExclamationCircle } from "react-icons/bs";

function RecIcon({ require }) {
    return !!require &&
        <IconCont>
            <BsExclamationCircle size={20} color="red" />
        </IconCont>
}

export default memo(RecIcon);

