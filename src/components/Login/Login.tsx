import React, { FC } from 'react';
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Dispatch } from "redux";
import { Input, createField } from "../common/FormsControls/FormsControls";
import { required } from "utils/validators/validators";
import { connect } from "react-redux";
import { loginCT, logoutCT } from "Redux/auth-reducer";
import { Redirect } from "react-router-dom";
import { AppRootType } from "Redux/redux-store";
import style from '../common/FormsControls/FormsControls.module.css';

type FormDataType = {
    login: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
};

type LoginPropsType = {
    loginCT: (email: string, password: string, rememberMe: boolean, captcha: string) => void;
    logoutCT: () => void;
    isAuth: boolean;
    captchaUrl: string | null;
};

const Login: FC<LoginPropsType> = ({ loginCT, logoutCT, isAuth, captchaUrl }) => {
    const onSubmit = (formData: FormDataType) => {
        loginCT(formData.login, formData.password, formData.rememberMe, formData.captcha);
    };

    if (isAuth) {
        return <Redirect to={'/profile'} />;
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    );
};

type OwnPropsType = {
    captchaUrl: string | null;
};

type LoginFormProps = InjectedFormProps<FormDataType, OwnPropsType> & {
    captchaUrl: string | null;
};

const LoginForm: React.FC<LoginFormProps> = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField({
                placeholder: 'email',
                name: 'login',
                validators: [required],
                component: Input,
            })}
            {createField({
                placeholder: 'password',
                name: 'password',
                validators: [required],
                component: Input,
                type: 'password',
            })}
            {createField({
                placeholder: '',
                name: 'rememberMe',
                validators: [],
                component: Input,
                type: 'checkbox',
                text: 'remember me',
            })}
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl &&
                createField({
                    placeholder: 'Symbols from image',
                    name: 'captcha',
                    validators: [required],
                    component: Input,
                })}
            {error && <div className={style.formSummaryError}>{error}</div>}
            <div>
                <button type="submit">Log in</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType, OwnPropsType>({ form: 'login' })(LoginForm);

let mapStateToProps = (state: AppRootType) => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth,
    };
};

export default connect(mapStateToProps, { loginCT, logoutCT })(Login);