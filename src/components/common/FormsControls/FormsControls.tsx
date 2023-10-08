import React from 'react';
import {WrappedFieldProps} from "redux-form";
import s from './FormsControls.module.css'

const FormControl: React.FC<WrappedFieldProps> = ({input,meta, children, ...props}) => {
    const hasError = meta.error && meta.touched
    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>{children}</div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
        const {input, meta, children, ...restProps} = props
    return (
            <FormControl {...props}><textarea {...props.input} {...restProps}/></FormControl>
    );
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, children, ...restProps} = props
    return (
        <FormControl {...props}><input {...props.input} {...restProps}/></FormControl>
    );
};
