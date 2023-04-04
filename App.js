import * as React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  Slider  from '@react-native-community/slider';
import {useEffect, useState} from "react";

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
        //console.log(nouvelle);
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

const CalculerMoyenne = (tableau) => {
    const somme = tableau.reduce((acc, curr) => {
        for (const key in curr) {
            console.log(curr[key])
            console.log(acc[key])
            if (key in acc) {
                acc[key] += Number(curr[key]);
            } else {
                acc[key] = Number(curr[key]);
            }
        }
        return acc;
    }, {});
    const m = Object.fromEntries(
        Object.entries(somme).map(([key, value]) => [key, value / tableau.length])
    );
    return m;
};

function DataPage(navigation) {
    //creer statistique qui contient les moyennes de chaque attribut de navigation
    const [statistique, setStatistique] = React.useState({
        distanceMoy : CalculerMoyenne(navigation.navigation).Distance_parcourue,
        temperatureMoy : CalculerMoyenne(navigation.navigation).Temperature,
        deniveleMoy : CalculerMoyenne(navigation.navigation).Denivele,
        agreableMoy : CalculerMoyenne(navigation.navigation).Agreable,
    });
    useEffect(() => {
        setStatistique({
            distanceMoy : CalculerMoyenne(navigation.navigation).Distance_parcourue,
            temperatureMoy : CalculerMoyenne(navigation.navigation).Temperature,
            deniveleMoy : CalculerMoyenne(navigation.navigation).Denivele,
            agreableMoy : CalculerMoyenne(navigation.navigation).Agreable,
        })
    }, [navigation.navigation])

    console.log(statistique)
    console.log(navigation.navigation.length)
    console.log(navigation)


    return (
        <View style={{ flex: 1, justifyContent: 'center',
            alignItems: 'center', borderColor: 'blue', shadowColor: 'blue'}}>
            <h1>Rapport</h1>
            <Text>Distance moyenne : {statistique.distanceMoy}</Text><br/>
            <Text>Température moyenne : {statistique.temperatureMoy}</Text><br/>
            <Text>Dénivelé moyen : {statistique.deniveleMoy}</Text><br/>
            <Text>Activité agréable : {statistique.agreableMoy}</Text><br/>
        </View>

    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    const [navigation, setNavigation] = useState([]);


    const addNavigation = (nouvelle) => {
        setNavigation([...navigation, nouvelle]);
        //console.log([...navigation, nouvelle])
        console.log(navigation)
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

