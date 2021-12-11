import React, { memo, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BiBell } from 'react-icons/bi';
import { BiCaretDown } from "react-icons/bi";
import { history } from '../../utils/history';
import { NavLink } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { MainContent, ContentIcons, DropItem, BellButton, IconsText, SearchMainBlock } from './style';
import SearchBlock from '../../components/SearchBlock/SearchBlock';
import { logout } from '../../utils/auth';
import logo from '../NavMenu/grandvenue.jpg';

function MenuHeader() {
    const appState = useSelector((state) => state.AppReducer);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const logOut = useCallback(() => {
        logout();
        dispatch({ type: 'saveToken', token: '' });
    });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const viewProfile = useCallback(() => {
        history.push(`/account/${appState.userId}`);
    }, [appState]);

    const viewSettings = useCallback(() => {
        history.push(`/settings`)
    }, []);

    const paintModal = useCallback(() => {
        return <Dialog
            fullWidth={false}
            open={true}
            onClose={() => { setShowModal(false) }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Are you sure you want to log out?</DialogTitle>
            <DialogContent className="text-center pt-3">
                <Button variant="outline-danger" className="mr-2" onClick={() => { setShowModal(false) }}>Cancel</Button>{' '}
                <Button variant="outline-primary" className="ml-2" onClick={logOut}>Log out</Button>{' '}
            </DialogContent>
        </Dialog>
    }, []);

    return <MainContent className="text-right">
        <Container fluid>
            <Row>
                {appState.screenSize > 600 && <Col xs={1}>
                    {/* <NavLink to="/"> <img src={logo} height="40px" /> </NavLink> */}
                </Col>}

                <Col xs={appState.screenSize > 600 ? 8 : 6} className={`${appState.screenSize > 500 ? 'pl-5' : 'pl-4'}`}>
                    <SearchMainBlock style={{ width: appState.screenSize > 500 ? '200px' : appState.screenSize > 350 ? '150px' : '100px' }}>
                        <SearchBlock />
                    </SearchMainBlock>
                </Col>

                <Col xs={appState.screenSize > 600 ? 3 : 6} className="text-right pr-0">
                    <ContentIcons>
                        <BellButton className="downIcMen">
                            <BiBell size={20} color="grey" />
                        </BellButton>
                    </ContentIcons>


                    <ContentIcons className="ml-2">
                        <div>
                            <ContentIcons aria-describedby={id} onClick={handleClick}>
                                <BellButton className="downIcMen">
                                    <BiCaretDown size={20} color="grey" />
                                </BellButton>
                            </ContentIcons>

                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <Typography sx={{ p: 1 }}>

                                    <DropItem onClick={viewProfile}>
                                        <IconsText>
                                            My Profile
                                        </IconsText>
                                    </DropItem>

                                    {appState.userType === "1" && <DropItem onClick={viewSettings}>
                                        <IconsText>
                                            Settings
                                        </IconsText>
                                    </DropItem>}

                                    <DropItem onClick={() => { setShowModal(true) }}>
                                        <IconsText>
                                            Log Out</IconsText>
                                    </DropItem>

                                </Typography>
                            </Popover>
                        </div>
                    </ContentIcons>
                </Col>
            </Row>
        </Container>
        {showModal && paintModal()}
    </MainContent>
}

export default memo(MenuHeader);