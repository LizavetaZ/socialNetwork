import React from 'react';
import {Header, HeaderPropsType} from './Header';
import {connect} from 'react-redux';
import {AnyAction, bindActionCreators} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {getAuthUserDataCT, logoutCT} from '../../Redux/auth-reducer';
import {AppRootType} from '../../Redux/redux-store';

class HeaderContainer extends React.Component<any, any> {
    componentDidMount() {
        this.props.getAuthUserDataCT();
    }

    render() {
        return <Header {...this.props as HeaderPropsType} />;
    }
}

const mapStateToProps = (state: AppRootType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppRootType, unknown, AnyAction>) => {
    return bindActionCreators(
        {
            getAuthUserDataCT,
            logoutCT,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);