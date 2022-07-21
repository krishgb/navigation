import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ToastAndroid,
} from 'react-native';
import {useUsers} from '../../UserContext';

export const Form = ({navigation}) => {
  const users = useUsers();
  const [credentials, setCredentials] = useState({email: '', password: ''});

  const login = () => {
    const verify = users.verifyUser(credentials.email, credentials.password);
    if (verify)
      navigation.navigate('Profile', {
        email: credentials.email,
      });
    else {
      ToastAndroid.show('Wrong Credentials', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.heading}>Employee Login</Text>

      <View style={styles.form}>
        <TextInput
          placeholderTextColor="#aaa"
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          nativeID="email"
          onChange={e =>
            setCredentials({...credentials, email: e.nativeEvent.text})
          }
        />
        <TextInput
          placeholderTextColor="#aaa"
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          nativeID="password"
          onChange={e =>
            setCredentials({...credentials, password: e.nativeEvent.text})
          }
        />

        <View style={styles.btns}>
          <Pressable
            style={styles.signInBtn}
            onPress={() => navigation.navigate('Employee Signup Form')}>
            <Text style={styles.btnTxt}>Sign up</Text>
          </Pressable>

          <Pressable style={styles.btn} onPress={login}>
            <Text style={styles.btnTxt}>Log in</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  heading: {
    color: 'black',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    position: 'absolute',
    top: 50,
  },
  form: {
    backgroundColor: '#ffffff',
    width: '80%',
    borderRadius: 2,
    elevation: 100,
    shadowColor: '#000',
    marginTop: '55%',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
  },
  input: {
    color: 'black',
    borderColor: '#166fe5',
    borderWidth: 2,
    width: '100%',
    margin: 15,
    borderRadius: 3,
    paddingLeft: 15,
    fontSize: 15,
    fontWeight: 'bold',
  },
  btns: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
  },
  btn: {
    color: 'black',
    backgroundColor: '#166fe5',
    padding: 10,
    borderRadius: 2,
    paddingHorizontal: 15,
    elevation: 10,
  },
  btnTxt: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
  },
});

styles.signInBtn = {
  ...styles.btn,
  backgroundColor: '#000',
};

const styl = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    margin: 20,
    backgroundColor: 'black',
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  input: {
    borderColor: 'white',
    borderWidth: 2,
    width: '80%',
    color: 'white',
    paddingLeft: 20,
    fontSize: 18,
    borderRadius: 3,
    margin: 5,
  },
  btns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '50%',
    margin: 5,
  },
  btn: {
    color: 'white',
    backgroundColor: 'rgb(89, 54, 146)',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  btnTxt: {
    fontSize: 18,
  },
  heading: {
    fontSize: 30,
    textAlign: 'left',
    width: '80%',
    color: 'white',
    marginBottom: 15,
  },
});
