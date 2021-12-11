import React, { memo } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { SearchBlockRow, InputBlock } from './styles.js'

function SearchBlock({ onChange }) {

    return <SearchBlockRow id="parent-wrapper">
        <AiOutlineSearch
            className="input--icon"
            color="#BBC0CE" size={25} />

        <InputBlock
            placeholder="Search..."
            onChange={onChange}
        />
    </SearchBlockRow>
}

export default memo(SearchBlock);