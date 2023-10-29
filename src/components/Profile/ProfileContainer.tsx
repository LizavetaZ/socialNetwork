import React from 'react';
import {Profile} from "../Profile/Profile";
import {connect} from "react-redux";
import {AppRootType} from "../../Redux/redux-store";
import {getUserProfileTC, getUserStatusTC, savePhoto, updateStatusTC} from "../../Redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";


export type PathParamsType = {
    userId?: string
}

export type MapStateToPropsType = {
    profile: null | ProfileType
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

export type MapDispatchToPropsType = {
    getUserProfileTC: (userId: number) => void
    getUserStatusTC: (userId: number) => void
    updateStatusTC: (status: string) => void
    savePhoto: (file: File) => void
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

    refreshProfile () {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId?.toString() || '0';
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfileTC(Number(userId))
        this.props.getUserStatusTC(Number(userId))
    }
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} isOwner = {!this.props.match.params.userId} status = {this.props.status} updateStatus = {this.props.updateStatusTC}
                     savePhoto = {this.props.savePhoto}/>
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
    withRouter, WithAuthRedirect,
    connect(mapStateToProps, {getUserProfileTC, getUserStatusTC, updateStatusTC, savePhoto})
)(ProfileContainer);