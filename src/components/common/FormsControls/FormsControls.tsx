import React from 'react';
import {Field, WrappedFieldProps} from "redux-form";
import s from './FormsControls.module.css'

const FormControl: React.FC<WrappedFieldProps> = ({input, meta:{error, touched}, children, ...props}) => {
    const hasError = error && touched
    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>{children}</div>
            {hasError && <span>{error}</span>}
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


type ValidatorType = (value: string) => string | undefined;

type CreateFieldType = {
    placeholder: string;
    name: string;
    validators: ValidatorType[];
    component: React.ComponentType<any>;
    type?: 'password' | 'checkbox';
    text?: string
};

export const createField = ({
                                placeholder,
                                name,
                                validators,
                                component: Component,
                                type, text
                            }: CreateFieldType): JSX.Element => {
    return (
        <div>
            <Field
                placeholder={placeholder}
                name={name}
                component={Component}
                validate={validators}
                type={type}
            />{text}
        </div>
    );
};
