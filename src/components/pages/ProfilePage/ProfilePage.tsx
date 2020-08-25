import React                             from 'react';
import ProfilePosts                      from "../../ProfilePosts/ProfilePosts";
import {RouteComponentProps, withRouter} from "react-router";
import {ProfileForm}                     from "../../ProfileForm/ProfileForm";
import {ProfileModal} from '../../ProfileModal/ProfileModal';


type RouterProp = { userId: string }
type Props = RouteComponentProps<RouterProp>;
const ProfilePage: React.FC<Props> = ({match}) => {
   return (
      <div className="container">
         <ProfilePosts userId={match.params.userId}/>
         <ProfileModal />
      </div>
   );
}

export default withRouter(ProfilePage)

