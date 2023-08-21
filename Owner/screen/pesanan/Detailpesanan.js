import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StatusBar,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	Alert
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import AnimatedLoader from "react-native-animated-loader";
const animLoading = require("./../../assets/loading.json");
import AsyncStorage from '@react-native-async-storage/async-storage';
import DATA_API from "./../api/dataAPI";
const Width = Dimensions.get('window').width;

const Detailpesanan = ({ navigation, route }) => {

	useEffect(() => {
		ambilData()

	}, [])
	
	const [data, setdata] = useState('')
	const [loading, setloading] = useState(true);
	const [ids, setids] = useState(route.params.id);


	{console.log(ids)}


	async function ambilData() {
		setloading(true)
		try {

			await fetch(`${DATA_API}/detailTransaksi/${ids}`)
			.then(response => response.json())
			.then(async data => {
				setloading(false)
				if (data.status == 200) {
					setdata(data.data[0])

				}

			})
			.catch((error) => {
				setloading(false)
				Alert.alert(`405`, `${error.message}`, [
					{ text: 'OK' },
				])
			
			});
		} catch (e) {
			// read error
		}


	}



	const origin = { latitude: -1.8148841, longitude: 109.9668331 };
	const destination = { latitude: -1.8720606, longitude:  109.9859638 };
	const GOOGLE_MAPS_APIKEY = 'AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k';

	async function aksiTerima(){
		
	}

	async function aksiBatal(item){
		
		setloading(true)
		try {

			await fetch(`${DATA_API}/batalTransaksi/${item}`)
			.then(response => response.json())
			.then(async data => {
				setloading(false)
				if (data.status == 200) {
					var id = data.data;

					Alert.alert(`${data.status}`, `${data.message}`)
					setTimeout(() => {
						navigation.navigate("Pesanan")
					}, 2000);
				}else{
					Alert.alert(`${data.status}`, `${data.message}`, [
						{ 
							text: 'OK',
						}
						
					])
				}

			})
			.catch((error) => {
				setloading(false)
				Alert.alert(`405`, `${error.message}`, [
					{ text: 'OK' },
				])
			
			});
		} catch (e) {
			// read error
		}
	}

	function konfirmasiBatal(item){
		
		const dx = item;
		Alert.alert(`Notifikasi !`, `Yakin membatalkan pesanan ini ?`, [
			{ 
				text: 'YAKIN', 
				onPress: () => aksiBatal(dx),
			},
			{
				text: 'BATAL',
				style: 'cancel',
			}
			
		])
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
	
	return (
		<View className="flex-1 bg-slate-100">
			<StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent />
			<View className="flex flex-row items-center pt-8 pb-2 bg-blue-600">
				<TouchableOpacity
					onPress={() => navigation.navigate("Pesanan")}
					className="relative w-[57px] h-[57px] flex items-center justify-center"
				>
					<Icon name="arrow-left" size={24} color="white" />
				</TouchableOpacity>
				<Text className="block font-medium text-xl text-white mx-3">DETAIL PESANAN</Text>
			</View>
			
			<ScrollView>
				<MapView
					className="w-screen h-[250px]"
					initialRegion={{
						...origin,
						latitudeDelta: 0.0930,
						longitudeDelta: 0.0931,
					}}
				>
					<MapViewDirections
						origin={origin}
						destination={destination}
						apikey={GOOGLE_MAPS_APIKEY}
						strokeWidth={5}
						strokeColor="#0ea5e9"
					/>
					
					<>
						<Marker
							coordinate={{
								latitude: origin.latitude,
								longitude: origin.longitude,
							}}
						/>
						<Marker
							coordinate={{
								latitude: destination.latitude,
								longitude: destination.longitude,
							}}
						/>
						
					</>
				</MapView>
				{

					data.produk != undefined ? (
						<View className="p-6">
						<View className="p-6 bottom-0 z-50 bg-white w-full rounded-md mb-6">
							<View className="flex flex-row items-center justify-between">
								<Text className="text-base font-medium text-slate-600">Waktu</Text>
								<Text className="text-base font-medium text-slate-600">{data.tanggal_t + ',' + data.jam_t}</Text>
							</View>
							<View className="flex flex-col mt-3">
								<Text className="text-base font-medium text-slate-600 mb-3">Alamat pengantaran</Text>
								<Text className="text-base font-normal text-slate-500">{data.alamat_antar}</Text>
							</View>
						</View>
						<View className="p-6 bottom-0 z-50 bg-white w-full rounded-md mb-6">
							<Text className="text-xl font-medium text-slate-600 mb-6">Pesanan</Text>
							<View className="flex flex-row items-center justify-between mb-3">
								<Text className="text-base font-medium text-slate-600">Produk</Text>
								<Text className="text-base font-medium text-slate-600">{data.produk.nama_produk == undefined ? '-' : data.produk.nama_produk}</Text>
							</View>
							<View className="flex flex-row items-center justify-between mb-3">
								<Text className="text-base font-medium text-slate-600">Jenis</Text>
								<Text className="text-base font-medium text-slate-600">{data.produk.kategori_produk == undefined ? '-' : data.produk.kategori_produk}</Text>
							</View>
							<View className="flex flex-row items-center justify-between mb-3">
								<Text className="text-base font-medium text-slate-600">Harga Satuan</Text>
								<Text className="text-base font-medium text-slate-600">{data.produk.harga_produk == undefined ? '-' : data.produk.harga_produk}</Text>
							</View>
							<View className="flex flex-row items-center justify-between mb-3">
								<Text className="text-base font-medium text-slate-600">Harga Satuan</Text>
								<Text className="text-base font-medium text-slate-600">{data.produk.harga_produk == undefined ? '-' : data.produk.harga_produk}</Text>
							</View>
						</View>
						
					</View>
					) : null
				}
				
			</ScrollView>
			<View className="p-6 bottom-0 z-50 bg-white w-fullrounded-md">
						{
							data.status === 'Baru' ? (
								<>
									<Text className="text-base font-medium text-yellow-600 text-center">Menunggu untuk diantar ...</Text>
									<TouchableOpacity
										onPress={() => konfirmasiBatal(data.id)}
										className="flex items-center justify-center px-6 py-4 bg-red-600 rounded-md mt-6"
									>
										<Text className="text-base text-white">BATALKAN PESANAN</Text>
									</TouchableOpacity>
								</>
							) : (
								data.status === 'Proses' ? (
									<>
										<Text className="text-base font-medium text-sky-600 text-center">Sedang diproses ...</Text>
										
									</>
								) : (
									data.status === 'Selesai' ? (
										<>
											<Text className="text-base font-medium text-green-600 text-center">Sedang diproses ...</Text>
										</>
									) : (
										data.status === 'Batal' ? (
											<>
												<Text className="text-base font-medium text-danger-600 text-center">Sedang diproses ...</Text>
											</>
										) : null
									)
								)
							)
						}
					</View>
		</View>
	)
}

export default Detailpesanan