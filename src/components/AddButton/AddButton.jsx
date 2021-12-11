import React, { memo } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { AddBut } from './styles';

function AddButton({ title, clickFunc, withoutPlus }) {
    return <AddBut onClick={clickFunc}> 
    {!withoutPlus && <AiOutlinePlus size={15} className="mr-1"/>} 
    {title} </AddBut>
}

export default memo(AddButton);