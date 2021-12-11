import React, { useState, useRef, useCallback, memo } from 'react';
import useOnClickOutside from '../../../utils/useOnClickOutside'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DropDownContainer, DropDownHeader, DropDownListContainer, DropDownList, DropDownIcon, ListItem } from './styles';

function SelectOfPagination(props) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();
    useOnClickOutside(ref, () => setIsOpen(false));
    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = value => () => {
        props.setValues(value)
        setIsOpen(false);
    };

    const paintOptions = useCallback(() => {
        return <DropDownList>
            {[{title: '10', value: '10'}, {title: '20', value: '20'}, {title: '30', value: '30'}].map((option, index, arr) => (
                <ListItem
                    onClick={onOptionClicked(option.value)}
                    key={Math.random()}
                    index={index}
                    lastIndex={arr.length - 1}
                    active={option === props.value}
                >
                    {option.title}
                </ListItem>
            ))}
        </DropDownList>
    }, []);
    
    return (
        <DropDownContainer ref={ref}>
            <DropDownHeader onClick={props.disabled ? ()=>{} : toggling}>
                <DropDownIcon>
                    <FontAwesomeIcon
                        icon={isOpen ? faChevronUp : faChevronDown}
                        size={'xs'}
                    />
                </DropDownIcon>
                {props.value}

            </DropDownHeader>
            {isOpen && (
                <DropDownListContainer>
                    {paintOptions()}
                </DropDownListContainer>
            )
            }
        </DropDownContainer >
    );
};

export default memo(SelectOfPagination);