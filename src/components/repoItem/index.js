import React from 'react'; 
import { TouchableHighlight} from 'react-native';
import {
    ListItem
} from 'react-native-elements';

export default repoItem = ({ item }, callback) => (
    <ListItem
        onPress={() => callback(true, item)}
        bottomDivider
        component={TouchableHighlight}
    >
        <ListItem.Content>
        <ListItem.Title>{item.full_name}</ListItem.Title>
        <ListItem.Subtitle style={{color: 'grey'}}>{`Followers: ${item.watchers_count}`}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
    </ListItem>
)