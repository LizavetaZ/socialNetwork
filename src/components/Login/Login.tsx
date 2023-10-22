import React, {FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Dispatch} from "redux";
import {Input, createField} from "../common/FormsControls/FormsControls";
import {required} from "utils/validators/validators";
import {connect} from "react-redux";
import {loginCT, logoutCT} from "Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppRootType} from "Redux/redux-store";
import s from '../common/FormsControls/FormsControls.module.css'

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
    error?: string
}

type OwnPropsType = {
    handleSubmit:() => void
}

export type DispatchPropsType = {
    onSubmit:(data: FormDataType, dispatch: Dispatch, props: OwnPropsType) => void
}


type LoginPropsType = {
    loginCT:(email:string, password:string, rememberMe:boolean) => void
    logoutCT:() => void
    isAuth: boolean
}

const Login: FC<LoginPropsType> = ({loginCT, isAuth }) => {
    const onSubmit = (formData: FormDataType) => {
        loginCT(formData.login, formData.password, formData.rememberMe);
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
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
                {createField({
                    placeholder: 'email',
                    name: 'login',
                    validators: [required],
                    component: Input
                })}
                {createField({
                    placeholder: 'password',
                    name: 'password',
                    validators: [required],
                    component: Input,
                    type: 'password'
                })}
                {createField({
                    placeholder: 'password',
                    name: 'rememberMe',
                    validators: [],
                    component: Input,
                    type: 'checkbox',
                    text: 'remember me'
                })}
            {props.error && <div className={s.formSummeryError}>
                {props.error}
            </div>}
            <div>
                <button>
                    Log in
                </button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)


let mapStateToProps = (state: AppRootType) => {  //данные из стейта
    return {
        isAuth: state.auth.isAuth
    }
}
export default connect(mapStateToProps,{loginCT, logoutCT})(Login)


