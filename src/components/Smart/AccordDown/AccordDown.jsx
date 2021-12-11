import React, { memo } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

function AccordDown({ title, children, onClickAS }) {
    return (
        <div>
            <Accordion style={{ boxShadow: 'none' }} className="pl-0">
                <AccordionSummary
                    onClick={onClickAS}
                    className="pl-0"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails className="p-0">
                    {children}
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default memo(AccordDown);