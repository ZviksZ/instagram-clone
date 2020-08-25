import React                             from 'react';
import ProfilePosts                      from "../../ProfilePosts/ProfilePosts";
import {RouteComponentProps, withRouter} from "react-router";


type RouterProp = { userId: string }
type Props = RouteComponentProps<RouterProp>;
const ProfilePage: React.FC<Props> = ({match}) => {
   return (
      <div className="container">
         <ProfilePosts userId={match.params.userId}/>
      </div>
   );
}

export default withRouter(ProfilePage)

