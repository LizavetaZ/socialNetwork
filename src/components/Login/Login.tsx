import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Dispatch} from "redux";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginCT, logoutCT} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppRootType} from "../../Redux/redux-store";

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

type LoginPropsType = {
    loginCT:(email:string, password:string, rememberMe:boolean) => void
    logoutCT:() => void
    isAuth: boolean
}

const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.loginCT(formData.login, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
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
            <div>
                <Field placeholder={'email'} name={'login'} component = {Input} validate = {[required]}/>
            </div>
            <div>
                <Field placeholder={'password'} name={'password'} component = {Input} validate = {[required]}
                type = {'password'}/>
            </div>
            <div>
                <Field type={"checkbox"} name={'rememberMe'} component = {Input}/>remember me
            </div>
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
