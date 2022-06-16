import React from "react";
import InputMask from "react-input-mask";

//const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');

const Input = ({ value, onChange, name, mask }) =>{


    function handleChange(event) {
        onChange({
          ...event,
          target: {
            ...event.target,
            name,
            //value: onlyNumbers(event.target.value)
          }
        });
      }

    return <InputMask className="form-control" mask={mask} name={name} value={value} onChange={handleChange} />
}

export default Input;