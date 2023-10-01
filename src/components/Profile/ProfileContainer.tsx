import React from 'react';
import {Profile} from "../Profile/Profile";
import {connect} from "react-redux";
import {AppRootType} from "../../Redux/redux-store";
import {getUserProfileCT} from "../../Redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";


export type PathParamsType = {
    userId?: string
}

export type MapStateToPropsType = {
    profile: null | ProfileType
}

export type MapDispatchToPropsType = {
    getUserProfileCT: (userId: number) => void
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
        debugger
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }

        this.props.getUserProfileCT(Number(userId))
    }

    render() {
        debugger
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}


let mapStateToProps = (state: AppRootType) => ({
    profile: state.profilePage.profile
})


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfileCT}),
    withRouter,
    // WithAuthRedirect
)(ProfileContainer)