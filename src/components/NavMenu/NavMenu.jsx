import React, { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BiCalendarStar, BiCalendar, BiUserCircle, BiChart, BiBarChart } from "react-icons/bi";
import { AiOutlineClose, AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFilterCircleFill, BsFillPeopleFill } from 'react-icons/bs';
import { FaCubes } from 'react-icons/fa';
import { GiCubes } from 'react-icons/gi';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { MenuListUl, MenuListLi, AsideWrapper, AsideHeader, AsideBody, LogoBlock } from './styles';
import StyleConstants from '../../styles/StyleConstants';
import grandLogo from './grandvenue.jpg';

const NavMenu = ({
    isMobileView,
    isOpen,
    setIsOpen,
    userType
}) => {
    const [scrollBarHeight, setScrollBarHeight] = useState(null);

    const paintSections = useCallback(() => {
        return <MenuListUl className="every-menu-list" isOpen={isOpen}>
            {[{ path: '/', title: 'Dashboard', icon: <BiChart size={20} className="menu-list-icon" /> },
            { path: '/events', title: 'Booked', icon: <BiCalendarStar size={20} className="menu-list-icon" /> },
            { path: '/calendar', title: 'Appointments', icon: <BiCalendar size={20} className="menu-list-icon" /> }
            ].map((el) => {
                return <li className="list-item" key={el.title} onClick={() => { isMobileView < 801 && setIsOpen(false) }}>
                    <NavLink
                        exact
                        to={el.path}
                        activeClassName="selected-nav-link">
                        <a> {el.icon}</a>
                        <span style={{ fontSize: '18px' }}>
                            {el.title}
                        </span>
                    </NavLink>
                </li>
            })}

            {userType !== 'user' && <li className="list-item" onClick={() => { isMobileView < 801 && setIsOpen(false) }}>
                <NavLink
                    exact
                    to={'/staff'}
                    activeClassName="selected-nav-link">
                    <a><BiUserCircle size={20} className="menu-list-icon" /></a>
                    <span style={{ fontSize: '18px' }}>
                        Staff
                    </span>
                </NavLink>
            </li>}

            {[
                { path: '/customers', title: 'Customers', icon: <BsFillPeopleFill size={20} className="menu-list-icon" /> },
                { path: '/event', title: 'Finance Event', icon: <GiCubes size={20} className="menu-list-icon" /> },
                { path: '/vendor', title: 'Finance Vendor', icon: <FaCubes size={20} className="menu-list-icon" /> },
            { path: '/reports', title: 'Reports', icon: <BiBarChart size={20} className="menu-list-icon" /> },
            { path: '/catering', title: 'Catering', icon: <BsFilterCircleFill size={20} className="menu-list-icon" /> }].map((el => {
                return <MenuListLi className="list-item" key={el.title} onClick={() => { isMobileView < 801 && setIsOpen(false) }}>
                    <NavLink
                        activeClassName="selected-nav-link"
                        exact
                        to={el.path}
                        activeClassName="selected-nav-link">
                        <a> {el.icon}</a>
                        <span style={{ fontSize: '18px' }}>
                            {el.title}
                        </span>
                    </NavLink>
                </MenuListLi>
            }))}
        </MenuListUl>
    }, [isOpen])

    useEffect(() => {
        const asideBarHeaderHeight = +StyleConstants.ASIDE_HEADER_HEIGHT.split('px')[0];
        setScrollBarHeight(window.innerHeight - asideBarHeaderHeight);
    }, [isMobileView]);

    return (
        <AsideWrapper 
        isOpen={isOpen}
        className={isOpen ? 'aside-is--open' : ''} 
        mobileView={isMobileView < 801}>
            {isMobileView < 801 && 
            <AsideHeader className="aside-header mb-4 pl-2" isOpen={isOpen} mobileView={isMobileView < 801}>
                <div onClick={() => setIsOpen(!isOpen)} className="logo-area">
                    {!isOpen ? <AiOutlineUnorderedList className="aside-close-icon" onClick={() => setIsOpen(!isOpen)} /> :
                        <AiOutlineClose className="aside-close-icon" onClick={() => setIsOpen(!isOpen)} />}
                </div>
                {isOpen && !(isMobileView < 801) ? <img src={grandLogo} alt="logo" className="main-logo" /> : ''}
            </AsideHeader>}
            <AsideBody isOpen={isOpen} mobileView={isMobileView < 801}>
                {!(isMobileView < 801) && <LogoBlock className='mb-5'>
                    <NavLink to="/"> <img src={grandLogo} height="55px" /> </NavLink>
                </LogoBlock>}
                {scrollBarHeight ? <SimpleBar style={{ maxHeight: scrollBarHeight }}>
                    {paintSections()}
                </SimpleBar> : ''}
            </AsideBody>
        </AsideWrapper>
    );
};

export default React.memo(NavMenu);

// import React, { useCallback, useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { BiCalendarStar, BiCalendar, BiUserCircle, BiChart, BiBarChart } from "react-icons/bi";
// import { AiOutlineClose, AiOutlineUnorderedList } from 'react-icons/ai';
// import { BsFilterCircleFill, BsFillPeopleFill } from 'react-icons/bs';
// import SimpleBar from 'simplebar-react';
// import 'simplebar/dist/simplebar.min.css';
// import { MenuListUl, MenuListLi, AsideWrapper, AsideHeader, AsideBody } from './styles';
// import StyleConstants from '../../styles/StyleConstants';
// import grandLogo from './grandvenue.jpg';

// const NavMenu = ({
//     isMobileView,
//     isOpen,
//     setIsOpen,
//     userType
// }) => {
//     const [scrollBarHeight, setScrollBarHeight] = useState(null);

//     const paintSections = useCallback(() => {
//         return <MenuListUl className="every-menu-list" isOpen={isOpen}>
//             {[{ path: '/', title: 'Dashboard', icon: <BiChart size={20} className="menu-list-icon" /> },
//             { path: '/events', title: 'Booked', icon: <BiCalendarStar size={20} className="menu-list-icon" /> },
//             { path: '/calendar', title: 'Appointments', icon: <BiCalendar size={20} className="menu-list-icon" /> }
//             ].map((el) => {
//                 return <li className="list-item" key={el.title} onClick={()=>{isMobileView < 801 && setIsOpen(false)}}>
//                     <NavLink
//                         exact
//                         to={el.path}
//                         activeClassName="selected-nav-link">
//                         <a> {el.icon}</a>
//                         <span>
//                             {el.title}
//                         </span>
//                     </NavLink>
//                 </li>
//             })}

//             {userType !== 'user' && <li className="list-item" onClick={()=>{isMobileView < 801 && setIsOpen(false)}}>
//                 <NavLink
//                     exact
//                     to={'/staff'}
//                     activeClassName="selected-nav-link">
//                     <a> <BiUserCircle size={20} className="menu-list-icon" /></a>
//                     <span>
//                         Staff
//                     </span>
//                 </NavLink>
//             </li>}

//             {[{ path: '/customers', title: 'Customers', icon: <BsFillPeopleFill size={20} className="menu-list-icon" /> },
//             { path: '/reports', title: 'Reports', icon: <BiBarChart size={20} className="menu-list-icon" /> },
//             { path: '/catering', title: 'Catering', icon: <BsFilterCircleFill size={20} className="menu-list-icon" /> }].map((el => {
//                 return <MenuListLi className="list-item" key={el.title} onClick={()=>{isMobileView < 801 && setIsOpen(false)}}>
//                     <NavLink
//                         activeClassName="selected-nav-link"
//                         exact
//                         to={el.path}
//                         activeClassName="selected-nav-link">
//                         <a> {el.icon}</a>
//                         <span>
//                             {el.title}
//                         </span>
//                     </NavLink>
//                 </MenuListLi>
//             }))}
//         </MenuListUl>
//     }, [isOpen])

//     useEffect(() => {
//         const asideBarHeaderHeight = +StyleConstants.ASIDE_HEADER_HEIGHT.split('px')[0];
//         setScrollBarHeight(window.innerHeight - asideBarHeaderHeight);
//     }, [isMobileView]);

//     return (
//         <AsideWrapper isOpen={isOpen} className={isOpen ? 'aside-is--open' : ''} mobileView={isMobileView < 801}>
//             {isMobileView < 801 && <AsideHeader className="aside-header mb-4 pl-2" isOpen={isOpen} mobileView={isMobileView < 801}>
//                 <div onClick={() => setIsOpen(!isOpen)} className="logo-area">
//                     {!isOpen ? <AiOutlineUnorderedList className="aside-close-icon" onClick={() => setIsOpen(!isOpen)} /> :
//                         <AiOutlineClose className="aside-close-icon" onClick={() => setIsOpen(!isOpen)} />}
//                 </div>
//                 {isOpen && !(isMobileView < 801) ? <img src={grandLogo} alt="logo" className="main-logo" /> : ''}
//             </AsideHeader>}
//             <AsideBody isOpen={isOpen} mobileView={isMobileView < 801}>
//                 {scrollBarHeight ? <SimpleBar style={{ maxHeight: scrollBarHeight }}>
//                     {paintSections()}
//                 </SimpleBar> : ''}
//             </AsideBody>
//         </AsideWrapper>
//     );
// };

// export default React.memo(NavMenu);

