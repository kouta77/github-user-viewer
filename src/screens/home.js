
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { listItem } from '../components'; //GRID VIEW ITEMS
import { getUsers } from '../services/apiServices';


const home = ({ navigation, route }) => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortedUserData, setSortedData] = useState([]);
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        getUsers().then(newData => {
            setUserData(newData); 
        });
    }, []);


    const openUserDetails = (visible, item=null) => {
        if(item){
            navigation.navigate('userInfo', { user: item })
        }
    }

    useEffect(()=>{
        changeOrder();
    }, [userData]);

    const changeOrder = () => {
        let temp = [...userData];
        switch(sortDirection){
            case 'asc':
                setSortDirection('desc');
                temp.sort(sortByName);
                setSortedData(temp);
            break;
            case 'desc':
                setSortDirection('asc');
                temp.sort(sortByName);
                setSortedData(temp);
            break;

        }
    }

  const loadMoreData = () => {
    if(!loading){
        setLoading(true);
        getUsers(userData[userData.length-1].id)
        .then(newData => {
            setUserData(prevState => [...prevState, ...newData]);
            setLoading(false);
            }
        );
    }

  }

  return (
    <>
    <StatusBar style="auto" />
    <SafeAreaView >
        <Button title={`Order: ${sortDirection}`} onPress={()=> changeOrder()}/>

        <FlatList
            data={sortedUserData}
            renderItem = {curr => listItem(curr.item, openUserDetails)}
            keyExtractor={item => item.id}
            horizontal={false}
            contentContainerStyle={styles.flatlistContainer}
            onEndReachedThreshold={0.7}
            onEndReached={loadMoreData}
            ListFooterComponent={(
                userData.length <= 0 && <ActivityIndicator />
            )}
        /> 
    </SafeAreaView>
    </>
  );


  function sortByName(a, b) {
  // Use toUpperCase() to ignore character casing
  const nameA = a.username.toUpperCase();
  const nameB = b.username.toUpperCase();

  let comparison = 0;

  if(sortDirection === 'desc'){
    if (nameA > nameB) {
        comparison = 1;
    } else if (nameA < nameB) {
        comparison = -1;
    }} else 
  if(sortDirection === 'asc') {
    if (nameA < nameB) {
        comparison = 1;
    } else if (nameA > nameB) {
        comparison = -1;
    }
    }

  return comparison;
}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textBox: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  flatlistContainer: {
    // backgroundColor: 'grey',
    paddingBottom: 70,
    justifyContent: 'space-evenly'
  },
  filterBar: {
      height: 55,
      backgroundColor: 'cadetblue',
  }
});


export default home;