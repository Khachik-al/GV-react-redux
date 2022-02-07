import React, { memo } from 'react';
import {
    InputBlock,
    // IconCont 
} from './styles';
// import { BsExclamationCircle } from "react-icons/bs";
const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
function BlockInputs({ title,
    type = "text",
    onChange,
    name,
    placeholder,
    value,
    require,
    onKeyPress,
    borderColor,
    disabled = false }) {
    return <div>
        <InputBlock
            type={type}
            aria-describedby="basic-addon3"
            onChange={onChange}
            min="0"
            // inputmode="numeric" pattern="[0-9]*" title="Non-negative integral number"
            name={name}
            onKeyDown={type === 'number' ? blockInvalidChar : () => { }}
            placeholder={placeholder}
            onKeyPress={onKeyPress}
            value={value}
            // require={!!require}
            disabled={disabled}
            borderColor={borderColor}
        />
        {!!require && <div className="fs-7 text-danger mt-2">{title} Is required</div>
            // <IconCont>
            //     <BsExclamationCircle size={20} color="red" />
            // </IconCont>
        }
    </div>
}

export default memo(BlockInputs);

