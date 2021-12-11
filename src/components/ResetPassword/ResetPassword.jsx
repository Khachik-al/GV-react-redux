import React, { useCallback, memo } from 'react';
import { BsFillCircleFill, BsCheckCircleFill, BsExclamationCircleFill, BsExclamationCircle} from "react-icons/bs";
import Tooltip from "@material-ui/core/Tooltip";
import BlockInputs from '../Smart/InputBlock/InputBlock';
import { ValidationFont } from './styles';
import { RedFont, InputTitle } from '../../styles/globalStyles';

const nonLowercaseLetters = /[a-z]/;
const nonUppercaseLetters = /[A-Z]/;
const nonNumber = /[0-9]/;

function ResetPassword({ validations, setValidations, requiredValidation }) {

    const passwordHandle = useCallback((event) => {
        let cloneValidations = { ...validations, [event.target.name]: event.target.value };
        nonLowercaseLetters.test(event.target.value) ? cloneValidations.lowerCaseVal = true : cloneValidations.lowerCaseVal = false;
        nonUppercaseLetters.test(event.target.value) ? cloneValidations.uppercaseVal = true : cloneValidations.uppercaseVal = false;
        nonNumber.test(event.target.value) ? cloneValidations.numberVal = true : cloneValidations.numberVal = false;
        event.target.value.length > 8 ? cloneValidations.passwordLengthVal = true : cloneValidations.passwordLengthVal = false;
        setValidations(cloneValidations);
    }, [validations, setValidations]);

    const getValidations = useCallback(() => {
        return [{ validationsName: 'lowerCaseVal', title: 'lowercase letter.' }, { validationsName: 'uppercaseVal', title: 'uppercase letter.' },
        { validationsName: 'numberVal', title: 'one number.' }, { validationsName: 'passwordLengthVal', title: 'Length must be at least 8 characters.' }].map((el, i) => {
            return <div className="text-left" key={el.title}>
                <ValidationFont>{validations[el.validationsName] ? <BsCheckCircleFill size={8} color="#5cff5c" className="mr-2" /> :
                    <BsFillCircleFill size={8} className="mr-2" />}
                    Must contain at least {el.title}</ValidationFont>
            </div>
        });
    }, [validations]);

    return <>
        <div className="mb-3"> <InputTitle>Password<RedFont className="mr-1 ml-1">*</RedFont><Tooltip title={getValidations()} placement="top">
            <span><BsExclamationCircleFill size={15} color="grey" /></span>
        </Tooltip></InputTitle>
            <BlockInputs
            title={"Password"}
            require={requiredValidation[0]}
            onChange={passwordHandle} 
            name="password" type="password" 
            placeholder="" value={validations['password']} />
        </div>

        <InputTitle className="mt-4">Confirm password<RedFont>*</RedFont> </InputTitle>
        <BlockInputs
            onChange={({ target }) => { setValidations({ ...validations, [target.name]: target.value }) }}
            name="confirmPassword" type="password" placeholder=""
            title="Confirm password"
            require={requiredValidation[1]}
            value={validations['confirmPassword']}
        />

        <div className="fs-7 text-danger mt-2 mb-3">
            {requiredValidation[2] && <div className='fs-7 text-danger mt-2'>Password and Confirm password must be the same</div>}
        </div>
    </>
}

export default memo(ResetPassword);