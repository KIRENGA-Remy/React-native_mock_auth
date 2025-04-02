import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if(loading) return;
    if(!email || !password) {
        Alert.alert('Error', 'All fields are required')
        return;
    }
    setLoading(true)
    try {
      const response = await axios.post('https://<mock-server-id>.mock.pstmn.io/login', {
        email,
        password,
      });

      if (response.data.success) {
        Alert.alert('Success', response.data.message);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An expected error occured';
      Alert.alert('Error', errorMessage)
    } finally {
        setLoading(false)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      title={ loading ? "Logging in..." : "Login"}
      onPress={handleLogin} 
      disabled={loading}
      />
      { loading && <ActivityIndicator style={{ marginTop: 10}} color={"#0000ff"} />}
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Don't have an account? <Text style={styles.linkUrl}> Register here </Text>
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

export default LoginScreen;