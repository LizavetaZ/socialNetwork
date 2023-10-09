import React from 'react';
import {Profile} from "../Profile/Profile";
import {connect} from "react-redux";
import {AppRootType} from "../../Redux/redux-store";
import {getUserProfileTC, getUserStatusTC, updateStatusTC} from "../../Redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";


export type PathParamsType = {
    userId?: string
}

export type MapStateToPropsType = {
    profile: null | ProfileType
    status: string
    authorizedUserId:number
    isAuth: boolean
}

export type MapDispatchToPropsType = {
    getUserProfileTC: (userId: number) => void
    getUserStatusTC: (userId: number) => void
    updateStatusTC: (status: string) => void
}

type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType

export type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & OwnPropsType


export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small?: string | null,
        large?: string | null
    }
}

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId.toString()
        }

        this.props.getUserProfileTC(Number(userId))
        this.props.getUserStatusTC(Number(userId))
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status = {this.props.status} updateStatus = {this.props.updateStatusTC}/>
        )
    }
}


let mapStateToProps = (state: AppRootType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId:state.auth.userId,
    isAuth: state.auth.isAuth
})


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfileTC, getUserStatusTC, updateStatusTC}),
    withRouter,
    // WithAuthRedirect
)(ProfileContainer)