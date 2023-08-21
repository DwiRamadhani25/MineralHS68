import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	FlatList,
	StatusBar,
	ScrollView,
	SafeAreaView,
	LayoutAnimation,
	Alert
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
	SwipeableFlatList,
	SwipeableQuickActionButton,
	SwipeableQuickActions,
} from 'react-native-swipe-list';
import AnimatedLoader from "react-native-animated-loader";
const animLoading = require("./../../assets/loading.json");
import AsyncStorage from '@react-native-async-storage/async-storage';
import DATA_API from "./../api/dataAPI";

const Pesanan = ({ navigation, route }) => {

	const [dataUser, setDataUser] = useState('');



	const [data, setData] = useState('')
	const [loading, setloading] = useState(true);



	useEffect(() => {
		ambilData()

	}, [])





	async function ambilData() {
		setloading(true)
		try {
			const userLogin = await AsyncStorage.getItem('id')

			if (userLogin != null) {
				await fetch(`${DATA_API}/semuaTransaksi/${userLogin}`)
					.then(response => response.json())
					.then(async data => {
						setloading(false)
						if (data.status == 200) {
							setData(data.data)

						}

					})
					.catch((error) => {
						setloading(false)
						Alert.alert(`405`, `${error.message}`, [
							{ text: 'OK' },
						])

					});
			}
		} catch (e) {
			// read error
		}


	}






	function renderItem({ item }) {



		return (
			<TouchableOpacity
				onPress={() => navigation.navigate("Detailpesanan", item)}
				className="w-full p-4 flex flex-row rounded-md bg-slate-50 border-b-2 border-b-slate-200 justify-between"
			>
				<View className="flex flex-row">
					<View className="flex items-center justify-center w-[45px] h-[45px] rounded-full">
						{item.status == 'Baru' ? (<Icon name={`info`} size={20} color="#fb923c" />) : null}
						{item.status == 'Proses' ? (<Icon name={`alert-circle`} size={20} color="#0ea5e9" />) : null}
						{item.status == 'Selesai' ? (<Icon name={`check-circle`} size={20} color="#16a34a" />) : null}
						{item.status == 'Batal' ? (<Icon name={`x`} size={20} color="#dc2626" />) : null}

					</View>
					<View className="px-6">
						<View className="mb-2">
							<Text className="text-base font-medium text-slate-500  ">{item.produk.nama_produk}</Text>
							<Text className="text-sm font-medium text-slate-400">Kategori : {item.kategori_produk == null ? '-' : item.kategori_produk}</Text>
						</View>
						<View className="flex flex-row items-center">
							<Icon name="calendar" size={12} color={'#94a3b8'} />
							<Text className="text-sm font-normal text-slate-400 ml-2">{item.tanggal_t + ',' + item.jam_t}</Text>
						</View>
					</View>
				</View>
				<View className="px-6">
					<View className="mb-2">
						{item.status == 'Baru' ? (<Text className="text-base font-medium text-yellow-500">{item.status}</Text>) : null}
						{item.status == 'Proses' ? (<Text className="text-base font-medium text-blue-500">{item.status}</Text>) : null}
						{item.status == 'Selesai' ? (<Text className="text-base font-medium text-green-500">{item.status}</Text>) : null}
						{item.status == 'Batal' ? (<Text className="text-base font-medium text-red-500">{item.status}</Text>) : null}
						
					</View>
					
				</View>
			</TouchableOpacity>
		)
	}

	if (loading) {
		return (
			<>
				<StatusBar barStyle={'dark-content'} backgroundColor="transparent" translucent />
				<AnimatedLoader
					visible={true}
					overlayColor="rgba(255,255,255,0.75)"
					source={animLoading}
					animationStyle={{
						width: 200,
						height: 200,
					}}
					speed={2}
					loop={true}
				>
					<Text>Sedang memuat data ...</Text>
				</AnimatedLoader>
			</>
		)
	}

	function listHeader() {
		return (
			<View className="flex flex-row items-center pt-8 pb-2 bg-blue-600">
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					className="relative w-[57px] h-[57px] flex items-center justify-center"
				>
					<Icon name="arrow-left" size={24} color="white" />
				</TouchableOpacity>
				<Text className="block font-medium text-xl text-white mx-8">DATA PESANAN</Text>
			</View>
		)
	}

	return (
		<GestureHandlerRootView className="bg-slate-50 flex-1 relative">
			<StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent />

			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={index => index.id}
				ListHeaderComponent={listHeader}

			/>



		</GestureHandlerRootView  >
	)
}

export default Pesanan