import React from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

// for contact page
const ListExampleChat = () => (
  <div class="col-sm-offset-5">
    <List>
      <ListItem
        primaryText="Nguyen Huu Hong - K59CA - UET"
        leftAvatar={<Avatar src="images/avatar.png" />}
        rightIcon={<CommunicationChatBubble />}
      />
    </List>
    </div>
);

export default ListExampleChat;