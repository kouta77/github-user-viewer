import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity,} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

 export default userItem = (props) => {
    const item = props.item;     

    return(
     <>
        <View style={styles.cardStyle}>
            <TouchableOpacity onPress={()=> {props.onPress()}} >

            {item?
            <View style={{width: '100%', height: 145}}>
                <Image style={styles.cardImage} source={{uri:item.avatar_url}} />
            </View>
            :
            null
            }

            <View style={styles.nameCard}>
                <View style={{flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={{textAlign:'center', color: 'white'}}>{item.username}</Text>
                </View>
                
            </View>
            </TouchableOpacity>
        </View>
     </>
     );
}

const styles = StyleSheet.create({
cardStyle: {
    //backgroundColor: '#94a6b3',
    width: '50%',
    height: '100%',
    marginVertical: 20,
    paddingHorizontal: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
},
nameCard: {
    width:'100%',
    padding: 10,
    backgroundColor: '#2f495c',
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
},
cardImage: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
},
heart: {
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 6, 
},
likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    padding: 3,
    },
});