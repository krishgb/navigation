import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Button, Image} from 'react-native';
import {useUsers} from '../../UserContext';

export const Profile = ({navigation, route}) => {
  const {users} = useUsers();
  const [user, setUser] = useState({});

  useEffect(() => {
    const {email} = route.params;
    let user = {};
    for (const u of users) {
      if (u.email === email) {
        user = u;
        setUser(user);
        console.log(user)
        return;
      }
    }
  }, []);

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profile}>
        
        <View style={styles.field}>
          <Image source={{uri: user.img}} style={styles.img}/>
        </View>

        <View style={styles.field}>
          <Text style={styles.txt}>Name:</Text>
          <Text style={styles.val}>{user.name}</Text>
        </View>
        
        <View style={styles.field}>
          <Text style={styles.txt}>Email:</Text>
          <Text style={styles.val}>{user.email}</Text>
        </View>
        
        <View style={styles.field}>
          <Text style={styles.txt}>Gender:</Text>
          <Text style={styles.val}>{user.gender}</Text>
        </View>
        
        <View style={styles.field}>
          <Text style={styles.txt}>Phone:</Text>
          <Text style={styles.val}>{user.phone}</Text>
        </View>
        
        <View style={styles.field}>
          <Text style={styles.txt}>DOB:</Text>
          <Text style={styles.val}>{user.dob}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.txt}>Department:</Text>
          <Text style={styles.val}>{user.dept}</Text>
        </View>

        <Button title="Set your schedule" onPress={() => navigation.navigate('Schedule', {schedules: user.schedules, email: user.email})}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  profile: {
    height: 250,
    width: '80%',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 15,
    position: 'relative'
  },
  txt: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontSize: 15
  },
  val: {
    color: 'white',
    textAlign: 'right',
    fontFamily: 'monospace',
    fontSize: 15

  },
  field: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  img: {
    position: 'absolute',
    width: 200, 
    height: 200,
    top: -180,
    left: 45
  }
});
