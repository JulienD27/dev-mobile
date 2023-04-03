import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function HomeScreen({settingsText}) {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Home Screen</Text>
            <Text style={styles.text}>{settingsText}</Text>
        </View>
    );
}

function SettingsScreen({setSettingsText}) {
    const [text, setText] = useState('');

    const handlePress = () => {
        setSettingsText(text);
        setText('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Settings Screen</Text>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                placeholder="Enter your text here"
            />
            <Button title="Save" onPress={handlePress}/>
        </View>
    );
}

function App() {
    const [settingsText, setSettingsText] = useState('');

    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: '#007AFF',
                    inactiveTintColor: '#8E8E93',
                    labelStyle: styles.tabLabel,
                    style: styles.tabBar,
                }}
            >
                <Tab.Screen name="Home" options={{title: 'Accueil'}}>
                    {() => <HomeScreen settingsText={settingsText}/>}
                </Tab.Screen>
                <Tab.Screen name="Settings" options={{title: 'Réglages'}}>
                    {() => <SettingsScreen setSettingsText={setSettingsText}/>}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#8E8E93',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    tabBar: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E5EA',
    },
    tabLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
});

export default App;


import * as React from 'react';
import {Button, SliderComponent, Text, TextInput, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  Slider  from '@react-native-community/slider';

function HomeScreen({ navigation }) {
  const [distance, setDistance] = React.useState('');
  const [temps, setTemps] = React.useState('');
  const [pluie, setPluie] = React.useState('');
  const [denivele, setDenivele] = React.useState('');
  const [repas , setRepas] = React.useState('');
  const [agreable, setAgreable] = React.useState(0);
  return (
      <View style={{ flex: 1, justifyContent: 'center',
        alignItems: 'center', borderColor: 'blue', shadowColor: 'blue'}}>
        <h1>Entrez vos données</h1>
        <div>
          <input type="text" value={distance} onChange={e => setDistance(e.target.value)} placeholder="Distance" style={{padding : 8, margin : 5}}></input>
          <input type="text" value={temps} onChange={e => setTemps(e.target.value)} placeholder="Temps" style={{padding : 8, margin : 5}}></input>
          <input type="text" value={pluie} onChange={e => setPluie(e.target.value)} placeholder="Pluie" style={{padding : 8, margin : 5}}></input>
          <input type="text" value={denivele} onChange={e => setDenivele(e.target.value)} placeholder="Dénivelé" style={{padding : 8, margin : 5}}></input>
          <input type="text" value={repas} onChange={e => setRepas(e.target.value)} placeholder="Repas" style={{padding : 8, margin : 5}}></input>
        </div>
        <div>
          <Slider style={{ width: 300, height: 40 }}
                  step={1}
                  maximumValue={5}
                  minimumValue={0}
                  value={agreable}
                  thumbTintColor='rgb(252, 228, 149)'
                  onValueChange={setAgreable}
          />
        </div>
        <Button title="Valider" onPress={
          () => {
            navigation.navigate('Profile', {distance: distance, temps: temps, pluie: pluie, denivele: denivele, repas: repas, agreable: agreable});
          }
        }></Button>
      </View>
  );
}
function ProfileScreen() {
  return (
      <View style={{ flex: 1, justifyContent: 'center',
        alignItems: 'center', borderColor: 'blue', shadowColor: 'blue'}}>
        <Text>Activities</Text>
        <Button
            title="Go to Details..."
            onPress={() =>
                navigation.push('Details')
            }
        />
      </View>

  );
}
const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Profile" component=
              {ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}


