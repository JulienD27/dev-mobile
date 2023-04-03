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
            <Text>Entrez vos données</Text>
            <input type="text" value={distance} onChange={e => setDistance(e.target.value)} placeholder="Distance" style={{padding : 8, margin : 5}}></input>
            <input type="text" value={temps} onChange={e => setTemps(e.target.value)} placeholder="Temps" style={{padding : 8, margin : 5}}></input>
            <input type="text" value={pluie} onChange={e => setPluie(e.target.value)} placeholder="Pluie" style={{padding : 8, margin : 5}}></input>
            <input type="text" value={denivele} onChange={e => setDenivele(e.target.value)} placeholder="Dénivelé" style={{padding : 8, margin : 5}}></input>
            <input type="text" value={repas} onChange={e => setRepas(e.target.value)} placeholder="Repas" style={{padding : 8, margin : 5}}></input>
            <Slider maximumValue={5} minimumValue={0} value={agreable} onValueChange={(agreable) => setState({agreable})}/>

            <Button title="Valider" onPress={
                () => {
                    navigation.navigate('Profile', {distance: distance, temps: temps, pluie: pluie, denivele: denivele, repas: repas, agreable: agreable});
                }
            }></Button>

            <TextInput></TextInput>
        </View>
    );
}
function ProfileScreen() {
    return (
        <View>
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

