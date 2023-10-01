import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Dispatch} from "redux";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

type OwnPropsType = {
    handleSubmit:() => void
}

export type DispatchPropsType = {
    onSubmit:(data: FormDataType, dispatch: Dispatch, props: OwnPropsType) => void
}

type MixFormPropsType = OwnPropsType & DispatchPropsType & InjectedFormProps<FormDataType, OwnPropsType>

export const Login = () => {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
    }
    return (
        <div>
           <h1>Login</h1>
            <LoginReduxForm onSubmit = {onSubmit}/>
        </div>
    );
};


const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'login'} name={'login'} component = {'input'}/>
            </div>
            <div>
                <Field placeholder={'password'} name={'password'} component = {'input'}/>
            </div>
            <div>
                <Field type={"checkbox"} name={'rememberMe'} component = {'input'}/>remember me
            </div>
            <div>
                <button>
                    Log in
                </button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({
   form: 'login'
})(LoginForm)
