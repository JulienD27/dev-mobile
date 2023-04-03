import * as React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  Slider  from '@react-native-community/slider';
import {useState} from "react";

function HomeScreen({ addNavigation }) {
    const [text, setText] = React.useState({});
    const [id, setId] = React.useState(0);

    const [distance, setDistance] = React.useState('');
    const [temperature, setTemperature] = React.useState('');
    const [pluie, setPluie] = React.useState('');
    const [denivele, setDenivele] = React.useState('');
    const [repas , setRepas] = React.useState('');
    const [agreable, setAgreable] = React.useState(0);

    const handlePress = () => {
        const nouvelle = {
            Activite: id,
            Distance_parcourue :  distance,
            Temperature : temperature,
            Pluie : pluie,
            Denivele : denivele,
            Repas : repas,
            Agreable : agreable,
        };
        setText(nouvelle);
        console.log(nouvelle);
        addNavigation(nouvelle);
        setId(id + 1);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center',
            alignItems: 'center', borderColor: 'blue', shadowColor: 'blue'}}>
            <h1>Entrez vos données</h1>
            <div>
                <TextInput type="text" value={distance} onChange={e => setDistance(e.target.value)} placeholder="Distance" style={{padding : 8, margin : 5}}></TextInput>
                <TextInput type="text" value={temperature} onChange={e => setTemperature(e.target.value)} placeholder="Température" style={{padding : 8, margin : 5}}></TextInput>
                <TextInput type="text" value={pluie} onChange={e => setPluie(e.target.value)} placeholder="Pluie" style={{padding : 8, margin : 5}}></TextInput>
                <TextInput type="text" value={denivele} onChange={e => setDenivele(e.target.value)} placeholder="Dénivelé" style={{padding : 8, margin : 5}}></TextInput>
                <TextInput type="text" value={repas} onChange={e => setRepas(e.target.value)} placeholder="Repas" style={{padding : 8, margin : 5}}></TextInput>
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
            <Button title="Save" onPress={handlePress}/>
        </View>
    );
}
function ProfileScreen({navigation}) {
    const dislpay = [];
    for (let i = 0; i < navigation.length; i++) {
        dislpay.push(
            <div>
                <Text>Activité n° {navigation[i].Activite}</Text><br/>
                <Text>Distance parcourue : {navigation[i].Distance_parcourue}</Text><br/>
                <Text>Température : {navigation[i].Temperature}</Text><br/>
                <Text>Pluie : {navigation[i].Pluie}</Text><br/>
                <Text>Dénivelé : {navigation[i].Denivele}</Text><br/>
                <Text>Repas : {navigation[i].Repas}</Text><br/>
                <Text>Agréable : {navigation[i].Agreable}</Text><br/>
            </div>,
            <br></br>
        )
    }
    console.log(dislpay)
    return (
        <View style={{ flex: 1, justifyContent: 'center',
            alignItems: 'center', borderColor: 'blue', shadowColor: 'blue'}}>
            <h1>Activités</h1>
            <Text>{dislpay}</Text>
        </View>

    );
}

function DataPage(navigation) {
    const calculeDistanceMoyenne = () => {
        let distance = 0;
        navigation.forEach((item) => {
            distance += item.distance.valueOf();
        });
        return setDistanceMoyenne(distance / navigation.length);
    }

    const calculeTemperatureMoyenne = () => {
        let temperature = 0;
        navigation.forEach((item) => {
            temperature += item.temperature.valueOf();
        });
        return setTemperatureMoyenne(temperature / navigation.length);
    }

    const calculeDeniveleMoyenne = () => {
        let denivele = 0;
        navigation.forEach((item) => {
            denivele += item.denivele;
        });
        return setDeniveleMoyenne(denivele / navigation.length);
    }

    const calculeAgreableMoyenne = () => {
        let agreable = 0;
        navigation.forEach((item) => {
            agreable += item.agreable;
        });
        return setAgreableMoyenne(agreable / navigation.length);
    }

    const distanceMoyenne = calculeDistanceMoyenne();
    const temperatureMoyenne = calculeTemperatureMoyenne();
    const deniveleMoyenne = calculeDeniveleMoyenne();
    const agreableMoyenne = calculeAgreableMoyenne();
    return (
        <View style={{ flex: 1, justifyContent: 'center',
            alignItems: 'center', borderColor: 'blue', shadowColor: 'blue'}}>
            <h1>Rapport</h1>
            <Text>Distance moyenne : {distanceMoyenne}</Text><br/>
            <Text>Température moyenne : {temperatureMoyenne}</Text><br/>
        </View>

    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    const [navigation, setNavigation] = useState([]);
    const [distanceMoyenne, setDistanceMoyenne] = useState(0);
    const [temperatureMoyenne, setTemperatureMoyenne] = useState(0);


    const addNavigation = (nouvelle) => {
        setNavigation([...navigation, nouvelle]);
        console.log([...navigation, nouvelle])
    }


  return (
      <NavigationContainer>
          <Tab.Navigator>
              <Tab.Screen name="Home"  initialParams={{distance : 0, temperature : 0, pluie : "Non", denivele : "Oui", repas : "", agreable : 0}}>
                    {() => <HomeScreen addNavigation={addNavigation} />}
                </Tab.Screen>
              <Tab.Screen name="Profile"  >
                    {() => <ProfileScreen navigation={navigation}/>}
              </Tab.Screen>
              <Tab.Screen name="Moyennes"  >
                    {() => <DataPage navigation={navigation}/>}
              </Tab.Screen>
          </Tab.Navigator>
      </NavigationContainer>
  );
}

