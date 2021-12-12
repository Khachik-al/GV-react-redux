// import React, { useState, useRef, useCallback, memo } from 'react';
// import useOnClickOutside from '../../../utils/useOnClickOutside'
// import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { DropDownContainer, DropDownHeader, DropDownListContainer, DropDownList, DropDownIcon, ListItem } from './styles';

// function SelectComponenet(props) {
//     const [isOpen, setIsOpen] = useState(false);
//     const ref = useRef();
//     useOnClickOutside(ref, () => setIsOpen(false));
//     const toggling = () => setIsOpen(!isOpen);

//     const onOptionClicked = value => () => {
//         props.setValues({ target: { name: props.name, value: value } })
//         setIsOpen(false);
//     };

//     const paintOptions = useCallback(() => {
//         return <DropDownList>
//             {props.options.map((option, index, arr) => (
//                 <ListItem
//                     onClick={onOptionClicked(option)}
//                     key={Math.random()}
//                     index={index}
//                     lastIndex={arr.length - 1}
//                     active={option === props.value}
//                 >
//                     {option}
//                 </ListItem>
//             ))}
//         </DropDownList>
//     }, [props.options]);

//     return (
//         <DropDownContainer ref={ref}>
//             <DropDownHeader onClick={toggling}>
//                 <DropDownIcon>
//                     <FontAwesomeIcon
//                         icon={isOpen ? faCaretUp : faCaretDown}
//                         size={'lg'}
//                     />
//                 </DropDownIcon>

//                 {props.value}

//             </DropDownHeader>
//             {isOpen && (
//                 <DropDownListContainer>
//                     {paintOptions()}
//                 </DropDownListContainer>
//             )
//             }
//         </DropDownContainer >
//     );
// };

// export default memo(SelectComponenet);


























import React, { useState, useRef, useCallback, memo } from 'react';
import useOnClickOutside from '../../../utils/useOnClickOutside'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DropDownContainer, DropDownHeader, DropDownListContainer, DropDownList, DropDownIcon, ListItem } from './styles';

function SelectComponenet(props) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();
    useOnClickOutside(ref, () => setIsOpen(false));
    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = value => () => {
        props.setValues({ target: { name: props.name, value: value } })
        setIsOpen(false);
    };

    const paintOptions = useCallback(() => {
        return <DropDownList>
            {props.options.map((option, index, arr) => (
                <ListItem
                    onClick={onOptionClicked(option.value)}
                    key={Math.random()}
                    index={index}
                    lastIndex={arr.length - 1}
                    active={option === props.value}
                >
                    {/* {option.title.charAt(0).toUpperCase() + option.title.slice(1)} */}
                    {option.title}
                </ListItem>
            ))}
        </DropDownList>
    }, [props.options]);
    
    return (
        <DropDownContainer ref={ref}>
            <DropDownHeader onClick={props.disabled ? ()=>{} : toggling}>
                <DropDownIcon>
                    <FontAwesomeIcon
                        icon={isOpen ? faCaretUp : faCaretDown}
                        size={'2x'}
                    />
                </DropDownIcon>
                {props.value ? props.value.length > 18 ? `${props.value.slice(0, 18)}...` : props.value : ''}
                {/* {props.value.length > 18 ? `${props.value.slice(0, 18)}...` : props.value} */}

            </DropDownHeader>
            {!!props.require && <div className="fs-7 text-danger mt-2">{props.title} Is required</div>
                // <IconCont>
                //     <BsExclamationCircle size={20} color="red" />
                // </IconCont>
            }
            {isOpen && (
                <DropDownListContainer>
                    {paintOptions()}
                </DropDownListContainer>
            )
            }
        </DropDownContainer >
    );
};

export default memo(SelectComponenet);