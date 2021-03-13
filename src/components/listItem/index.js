import React from 'react'; 
import { TouchableHighlight} from 'react-native';
import {
    ListItem,
    Avatar
    } from 'react-native-elements';

export default listItem = (item, callback) => (
<ListItem
        onPress={() => callback(true, item)}
        bottomDivider
        component={TouchableHighlight}
        >
    <Avatar rounded title={item.username} source={item.avatar_url && { uri: item.avatar_url }}/>
    <ListItem.Content>
    <ListItem.Title>{item.username}</ListItem.Title>
    <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
    </ListItem.Content>
    <ListItem.Chevron />
</ListItem>
)