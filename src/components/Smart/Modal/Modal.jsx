import React from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container, Row, Col } from 'react-bootstrap';
import {RowHeader} from './styles';

function Modal({ handleOpen, children, title, getButtons }) {
  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={true}
        onClose={handleOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <RowHeader>
            <h3>{title}</h3>
            <div> <AiOutlineClose size={20} onClick={handleOpen} className="cursorPointer" /> </div>
          </RowHeader>

          {/* <hr style={{ height: '0px' }} /> */}
        </DialogTitle>
        <DialogContent className="pl-3 pr-3">
          {children}

        </DialogContent>
        <DialogActions>
          <Container>
            <Row>
              <Col xs={12}>
                {getButtons()}
              </Col>
            </Row>
          </Container>
          {/* {getButtons()} */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default React.memo(Modal);