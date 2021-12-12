import React, { memo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { SearchBlockRow, InputBlock } from './styles.js'

function SearchBlock({ onChange, width }) {

    return <SearchBlockRow id="parent-wrapper" >
        <BiSearch
            className="input--icon"
            color="#BBC0CE" size={25} />

        <InputBlock
            width={width}
            placeholder="Search"
            onChange={onChange}
        />
    </SearchBlockRow>
}

export default memo(SearchBlock);