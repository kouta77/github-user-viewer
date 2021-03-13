import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, ActivityIndicator, Linking} from 'react-native';
import { Button, Overlay, Avatar, Text } from 'react-native-elements';
import { getUserByUserName, getUserRepos } from '../services/apiServices';
import { FlatList } from 'react-native-gesture-handler';


const userInfo = ({ navigation, route}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const [repoInfo, setRepoInfo] = useState(null);
    const [userRepos, setUserRepos] = useState([]);
    const bulletChar = '\u2022 ';

    useEffect(() => {
        getUserByUserName(route.params.user.username).then( info => {
            setUserInfo(info);
        })

        getUserRepos(route.params.user.username).then( info => {
            setUserRepos(info);
        })
    }, [])

    const toggleModal = (visible, repoInfo={}) => {
        setModalVisible(visible);
        if(repoInfo) setRepoInfo(repoInfo);
    }

    return (    
    <>
    <StatusBar style="auto" />
    <SafeAreaView style={{flex: 1}}>

        <FlatList 
            ListHeaderComponent={(
                <View>
                    <View style={styles.topContainer}>
                        <Avatar
                            size="xlarge"
                            rounded
                            title={userInfo?.name}
                            source={{
                                uri:
                                route.params.user.avatar_url
                            }}
                        >
                        </Avatar>
                        <Text h2 style={styles.userName}>{userInfo?.name}</Text>
                        <Text h3 style={styles.loginName}>{userInfo?.login}</Text>

                        <View style={styles.horizontalContainer} >
                            <Text style={styles.userName}>{
                                bulletChar + (userInfo?.email? userInfo.email : 'no email')}</Text>
                            <Text style={styles.userName}>{
                                bulletChar + (userInfo?.location? `location: ${userInfo?.location}` : 'no location')}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            padding: 10
                        }}
                    >
                        <View style={styles.bioContainer} >
                            <Text>{userInfo?.bio || 'no bio added'}</Text>
                        </View>
                        <Text h2 style={styles.userName}>{"Repositories"}</Text>
                    </View>
                    
                </View>
            )}
            data={userRepos}
            keyExtractor={item => item.id}
            renderItem={rep => repoItem(rep, toggleModal)}
            horizontal={false}
            ListFooterComponent={(
                userRepos.length <= 0 && <ActivityIndicator />
            )}
        >
        </FlatList>

    </SafeAreaView>

    <Overlay overlayStyle={{
        width: '80%',
        height: '50%',
        padding: 10
        }} isVisible={modalVisible} onBackdropPress={()=> toggleModal(false)}>

        <View style={{padding: 15}}>
            <Text style={{textAlign: 'center', height: '10%'}} h4>{repoInfo?.name}</Text>
            <View style={{ justifyContent: 'space-between', height: '85%'}}>
                <View style={{...styles.bioContainer, ...{width: '100%', height: '75%'}}}>
                    <Text>{repoInfo?.description || "NO DESCRIPTION"}</Text>
                </View>
                <View>
                    <View style={{marginVertical: 10}}>
                        <Text>{`Language: ${repoInfo?.language || "no language was set"}`}</Text>
                        <Text>{`Followers: ${repoInfo?.watchers_count}`}</Text>
                    </View>

                    <Button onPress={() => Linking.openURL(repoInfo?.html_url)} title="View on Github" />
                </View>
            </View>
        </View>
      </Overlay>
    </>

    );
}

const styles = StyleSheet.create({
container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
topContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
},
avatarEditBtn: {
    right: 20,
    bottom: 10,
    transform: [{ scale: 3 }],
},
userName: {
    marginTop: 10,
},
loginName: {
    color: 'gray'
},
horizontalContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
},
bioContainer: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginHorizontal: 200,
    marginVertical: 10,
    padding: 15,
    alignSelf: 'center'
},
});

export default userInfo;