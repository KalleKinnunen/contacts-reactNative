import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts'


export default function App() {
  const [contacts, setContacts] = useState([])

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(data)
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={contacts}
        renderItem={({item}) => {
          return (
            <View>
            <Text>{`${item.name}, ${item.phoneNumbers ? item.phoneNumbers[0].number : ''}`}</Text>
            </View>
          )
        }}
      />
    <TouchableOpacity style={styles.button} onPress={() => getContacts()}><Text style={{ fontSize: 18 }}>Contacts</Text></TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  button: {
    borderColor: 'red',
    borderWidth: 10,
    padding: 100,
    borderRadius: 500,
    backgroundColor: 'white'

  }
});
