import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (loading) return;
    if(!name || !email || !password){
        Alert.alert('Error', 'All fields are required')
        return;
    }
    setLoading(true)
    try {
      const response = await axios.post('https://12d26491-4246-4495-be92-32de5d6d6634.mock.pstmn.io/register', {
        name,
        email,
        password,
      });

      if (response.data.success) {
        Alert.alert('Success', response.data.message);
        console.log(" log messag ",response.data.message);
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An expected error occured';
      Alert.alert('Error', errorMessage)
    } finally{
        setLoading(false)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize='none'
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        autoCapitalize='none'
      />
      <Button 
      title= {loading ? "Registering..." : "Register"}
      onPress={handleRegister} 
      disabled={loading} 
      />
      {loading && <ActivityIndicator style={{marginTop: 10 }} color={"#0000ff"} />}
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Already have an account? <Text style={styles.linkUrl}>Login here </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  link: { marginTop: 20, textAlign: 'center', color: 'blue' },
  linkUrl: {fontSize: 16, fontWeight: '600' }
});

export default RegisterScreen;