import React, { useState, useEffect } from 'react';
import { 
	View, 
	Text, 
	Image, 
	Modal, 
	StatusBar, 
	TextInput, 
	TouchableOpacity, 
	ScrollView, 
	PermissionsAndroid,
	Alert
} from 'react-native'
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import DATA_API from "./../api/dataAPI";
import DATA_IMAGE from "./../api/dataImage";
const logo = require("./../../assets/logo.png");
const animLoading = require("./../../assets/loading.json");

const Akun = ({navigation}) => {
	const ImagePicker = require('react-native-image-picker');

	const [gambar, setGambar] = useState(null);
	const [loading, setloading] = useState(true);

	const [siuser, setsiuser] = useState('');

	useEffect(() => {
		cekPermissionAndroid();
        cekLogin()
    }, [])

	// Cek perrmision akses kamera
	async function cekPermissionAndroid(){
		try {
			const granted = await PermissionsAndroid.request(
			  PermissionsAndroid.PERMISSIONS.CAMERA,
			  {
				title: 'Cool Photo App Camera Permission',
				message:
				  'Cool Photo App needs access to your camera ' +
				  'so you can take awesome pictures.',
				buttonNeutral: 'Ask Me Later',
				buttonNegative: 'Cancel',
				buttonPositive: 'OK',
			  },
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			  console.log('You can use the camera');
			} else {
			  console.log('Camera permission denied');
			}
		  } catch (err) {
			console.warn(err);
		  }

	}

    // Cek apakah user sudah login sebelumnya

    async function cekLogin() {
        	const userLogin = await AsyncStorage.getItem('id')
            
			if (userLogin != null) {
				setloading(false)
				fetch(`${DATA_API}/ambilUser/${userLogin}`)
				.then(response => response.json())
				.then(data => {
					setsiuser(data.data)
				})
				.catch((error) => { 
					setloading(false)
					console.log(error.message)
				});
			}
    }

	function konfirmasiLogout(){
		Alert.alert(`Notifikasi`, `Yakin ingin logout dari aplikasi ini ?!`, [
			{ text: 'YAKIN', onPress: () => aksiLogout()},
			{ text: 'TIDAK'},
		])
	}

	async function aksiLogout(){
		await AsyncStorage.removeItem('id')
		navigation.replace("Login")
	}

	async function bukaKamera() {

		let options = {
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
			cameraType: 'back'
		};
		await ImagePicker.launchCamera(options, async (res) => {

			const formData = new FormData();
			formData.append('photo', {
				uri: res.assets[0].uri,
				name: 'photo.jpg', // Set an appropriate name for the file
				type: 'image/jpeg', // Set the correct MIME type
			});

			await fetch(`${DATA_API}/updateFoto/${siuser.id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				body: formData,
			})
			.then(response => response.json())
			.then(data => {
				setloading(false)
	
				if (data.status == 200) {
					Alert.alert(`${data.status}`, `${data.message}`, [
						{ text: 'OK', onPress: () => navigation.navigate('Akun'), },
					])
				}else{
					Alert.alert(`${data.status}`, `${data.message}`, [
						{ text: 'OK' },
					])
				}
				
			})
			.catch((error) => {
				setloading(false)
				Alert.alert(`405`, `${error}`, [
					{ text: 'OK' },
				])
			});

		});

	}

	return (
		loading ? (
			<AnimatedLoader
				visible={loading}
				overlayColor="rgba(255,255,255,0.75)"
				source={animLoading}
				className="w-[50px] h-[50px]"
				speed={1}
			>
				<Text>Doing something...</Text>
			</AnimatedLoader>
		) : (
			<View>
			<View className="bg-slate-200 w-full h-[300px] flex items-center justify-center p-6">
				<View className="">
					<Image	
						source={{ uri: `${DATA_IMAGE}/${siuser.photo}`}} 
						className="w-[200px] h-[200px]"
						resizeMode='contain'
					/>
					<TouchableOpacity
						onPress={bukaKamera}
						className="w-[40px] h-[40px] bg-slate-50 flex items-center justify-center rounded-full absolute top-[80%] right-3"
					>
						<Icon name="camera" size={20} color="blue" />
					</TouchableOpacity>
				</View>
			</View>
			<View className="p-6">
				<View className="border-b-2 border-b-slate-200 pb-3">
					<View className="flex flex-row items-center mb-2">
						<Icon name="user" size={20} color="grey" />
						<Text className="text-xl font-medium mx-4 text-slate-400">Nama</Text>
					</View>
					<Text className="text-xl font-medium mx-4 text-slate-600 ml-9">{siuser.nama_p}</Text>
				</View>
				<View className="border-b-2 border-b-slate-200 pb-3">
					<View className="flex flex-row items-center mb-2">
						<Icon name="phone" size={20} color="grey" />
						<Text className="text-xl font-medium mx-4 text-slate-400">Telepon</Text>
					</View>
					<Text className="text-xl font-medium mx-4 text-slate-600 ml-9">{siuser.tlp}</Text>
				</View>
				<View className="border-b-2 border-b-slate-200 pb-3">
					<View className="flex flex-row items-center mb-2">
						<Icon name="mail" size={20} color="grey" />
						<Text className="text-xl font-medium mx-4 text-slate-400">Email</Text>
					</View>
					<Text className="text-xl font-medium mx-4 text-slate-600 ml-9">{siuser.email}</Text>
				</View>
				<View className="border-b-2 border-b-slate-200 pb-3">
					<View className="flex flex-row items-center mb-2">
						<Icon name="lock" size={20} color="grey" />
						<Text className="text-xl font-medium mx-4 text-slate-400">Password</Text>
					</View>
					<Text className="text-xl font-medium mx-4 text-slate-600 ml-9">*******</Text>
				</View>
				<View className="flex flex-row items-center gap-3 mt-12">
				<TouchableOpacity
					onPress={() => navigation.navigate("Updateakun")}
					className="w-[170px] bg-blue-600 flex items-center justify-center rounded-md mt-9 px-6 py-6"
				>
					<Text className="text-white font-medium text-base uppercase">Update Akun</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={konfirmasiLogout}
					className="w-[170px] bg-red-600 flex items-center justify-center rounded-md mt-9 px-6 py-6"
				>
					<Text className="text-white font-medium text-base uppercase">LOGOUT</Text>
				</TouchableOpacity>
				</View>
			</View>
		</View>
		)
	)

	

	
}

export default Akun