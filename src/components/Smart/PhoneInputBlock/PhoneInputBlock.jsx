import React, { memo } from 'react';
import { PhoneBlock } from './styles';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import './css-for-phone.css'

function PhoneInputBlock({ value, onChange }) {

    return <PhoneBlock
        require={!!require}>
        <PhoneInput
            className='phone'
            international={true}
            defaultCountry='US'
            placeholder="Enter phone number"
            value={value}
            onChange={onChange} />
    </PhoneBlock>
}

export default memo(PhoneInputBlock);