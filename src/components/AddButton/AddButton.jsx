import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo } from 'react';
import { AddBut } from './styles';

function AddButton({ title, clickFunc, withoutPlus }) {
    return <AddBut onClick={clickFunc}> 
    {!withoutPlus && <FontAwesomeIcon icon={faPlus} size='lg' className="mr-2" style={{fontWeight:'100'}}/>} 
    {title} </AddBut>
}

export default memo(AddButton);