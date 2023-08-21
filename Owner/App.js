// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  LoginScreen,
	RegisterScreen,
	KonfirmasiALamatScreen,
	HomeScreen,
	PelangganScreen,
	PelangganDetailScreen,
	PelangganUpdateScreen,
	KonAlamatPelangganScreen,
	PesananScreen,
	DetailpesananScreen,
	AkunScreen,
  Updateakuncreen,
	PesanScreen,
	AlamatantarScreen
 } from "./screen";


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="KonfirmasiALamat" component={KonfirmasiALamatScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Pelanggan" component={PelangganScreen} />
        <Stack.Screen name="PelangganDetail" component={PelangganDetailScreen} />
        <Stack.Screen name="PelangganUpdate" component={PelangganUpdateScreen} />
        <Stack.Screen name="KonAlamatPelanggan" component={KonAlamatPelangganScreen} />
        <Stack.Screen name="Pesanan" component={PesananScreen} />
        <Stack.Screen name="Detailpesanan" component={DetailpesananScreen} />
        <Stack.Screen name="Pesan" component={PesanScreen} />
        <Stack.Screen name="Alamatantar" component={AlamatantarScreen} />
        <Stack.Screen name="Akun" component={AkunScreen} />
        <Stack.Screen name="Updateakun" component={Updateakuncreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;