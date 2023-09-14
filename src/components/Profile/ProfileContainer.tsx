import React from 'react';
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppRootType} from "../../Redux/redux-store";
import {setUserProfile} from "../../Redux/profile-reducer";
import {withRouter} from "react-router-dom";

export type ProfileContainerPropsType = {
    setUserProfile:(profile: null | {}) => void
    profile: null | ProfileType
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram:string
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

class ProfileContainer extends React.Component<any, any>{
    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId) {
            userId = 2
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
                <Profile {...this.props} profile = {this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: AppRootType) => ({
    profile: state.profilePage.profile
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {
    setUserProfile
})(WithUrlDataContainerComponent)