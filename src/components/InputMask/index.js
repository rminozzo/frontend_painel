import React from "react";

import InputMask from "react-input-mask";
//import {Form} from 'react-bootstrap';

const Input = ({value, onChange}) =>{

    return <InputMask mask="99/99/9999" value={value} onChange={onChange}/>
}

export default Input;