import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {AuthEnterType, getAuthUserDataCT} from "../../Redux/auth-reducer";
import {AppRootType} from "../../Redux/redux-store";

class HeaderContainer extends React.Component<any, any> {
    componentDidMount() {
        this.props.getAuthUserDataCT()
    }

    render() {
        return <Header {...this.props as AuthEnterType}/>
    }
}

const mapStateToProps = (state:AppRootType) => ({
    isAuth: state.auth.isAuth,
        login: state.auth.login
})

export default connect(mapStateToProps, {
    getAuthUserDataCT
})(HeaderContainer)