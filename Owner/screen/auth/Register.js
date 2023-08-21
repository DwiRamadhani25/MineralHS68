import React, { useState, useEffect } from 'react';
import { View, Text, Image, Modal, StatusBar, TextInput, TouchableOpacity, ScrollView, PermissionsAndroid, Alert } from 'react-native'
import AnimatedLoader from "react-native-animated-loader";
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from "react-native-axios";
const logo = require("./../../assets/logo.png");

import DATA_API from "./../api/dataAPI";

const Login = ({ route, navigation }) => {

	const ImagePicker = require('react-native-image-picker');

	const dAl = route.params != undefined ? route.params.alamat : '';
	const dLat = route.params != undefined ? route.params.lat : '';
	const dLng = route.params != undefined ? route.params.lng : '';

	const [nama, setNama] = useState('');
	const [namaFocus, setNamaFocus] = useState(false);
	const [tlp, setTlp] = useState('');
	const [tlpFocus, setTlpFocus] = useState(false);
	const [alamat, setAlamat] = useState(dAl);
	const [alamatFocus, setAlamatFocus] = useState(false);

	const [gambar, setGambar] = useState('');
	const [gambarFocus, setGambarFocus] = useState(false);
	const [email, setEmail] = useState('');
	const [emailFocus, setEmailFocus] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordFocus, setPasswordFocus] = useState(false);
	const [jk, setJk] = useState('');

	const [showPassword, setShowPassword] = useState(true);
	const [passIcon, setPassIcon] = useState('eye-off');
	
	const [modalVisible, setModalVisible] = useState(false);
	
	const [urlFile, setUri] = useState('');
	const [typeFile, setType] = useState('');
	const [namaFile, setName] = useState('');

	const [loading, setLoading] = useState(false);



	function checkShow() {

		if (showPassword) {
			setShowPassword(false)
			setPassIcon('eye')
		} else {
			setShowPassword(true)
			setPassIcon('eye-off')
		}
	}



	async function bukaGaleri() {
		setModalVisible(false)

		let options = {
			mediaType: 'photo'
		}
		const result = await ImagePicker.launchImageLibrary(options);

		const uri = result.assets[0].uri;
		const type = result.assets[0].type;
		const fileName = result.assets[0].fileName;

		setGambar(fileName);
		setUri(uri)
		setType(type)
		setName(fileName)
		

	}

	async function bukaKamera() {
		setModalVisible(false)

		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.CAMERA,
				{
					title: "App Camera Permission",
					message: "App needs access to your camera ",
					buttonNeutral: "Ask Me Later",
					buttonNegative: "Cancel",
					buttonPositive: "OK"
				}
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				let options = {
					storageOptions: {
						skipBackup: true,
						path: 'images',
					},
					cameraType: 'back'
				};
				await ImagePicker.launchCamera(options, (res) => {


					const uri = res.assets[0].uri;
					const type = res.assets[0].type;
					const fileName = res.assets[0].fileName;

					setGambar(fileName);
					setGambar(fileName);
					setUri(uri)
					setType(type)
					setName(fileName)

				});
			} else {
				console.log("Camera permission denied");
			}
		} catch (err) {
			console.warn(err);
		}




		const uri = result.assets[0].uri;
		const type = result.assets[0].type;
		const fileName = result.assets[0].fileName;

		setGambar(fileName);
		setUri(uri);
		setType(type);
		setName(fileName);

	}

	async function sendRegistrasi() {

		
		const formData = new FormData();
		formData.append('nama_p', nama);
		formData.append('tlp', tlp);
		formData.append('jk_p', jk);
		formData.append('alamat_p', alamat);
		formData.append('lat_p', dLat);
		formData.append('lng_p', dLng);
		formData.append('email', email);
		formData.append('password', password);

		formData.append('photo', {
		    uri: urlFile,
		    name: namaFile,
		    type: typeFile,
		});
		 

		

		if (
		    nama != '' &&
		    jk != '' &&
		    tlp != '' &&
		    password != '' &&
		    alamat != '' &&
		    email != '' &&
		    password != '' &&
		    gambar != ''
		) {
		fetch(`${DATA_API}/registrasi`, {
		    method: 'POST',
		    headers: {
				Accept: 'application/json',
		        'Content-Type': 'multipart/form-data',
		    },
		    body: formData,
		})
		.then(response => response.json())
		.then(data => {
			console.log(data.data)
		    if (data.code === 200) {

		        setTimeout(() => {

		            Alert.alert(`${data.code}`, `${data.message}`, [
		                { text: 'OK', onPress: () => navigation.replace('Login')},
		            ])
		            navigation.replace('Register')
		        }, 2000);
		    } else {
		        Alert.alert(`${data.code}`, `${data.message}`, [
		            { text: 'OK'},
		        ])
				

		    }
		})
		.catch((error) => {

		    //Alert.alert(`405`, `${error.message}`, [
		    //    { text: 'OK'},
		    //])
			console.log(error.message.toString())
		});
		}else{
		    Alert.alert('Peringatan !', "Inputan tidak boleh ada yang kosong !", [
		        { text: 'OK' },
		    ])
		}
	}






	return (
		<ScrollView className="p-6 bg-white">
			<StatusBar barStyle={'dark-content'} backgroundColor="transparent" translucent />
			<TouchableOpacity
				onPress={() => navigation.replace("Login")}
				className="w-[57px] h-[57px] bg-slate-100 first-letter:00 items-center justify-center rounded-md my-6"
			>
				<Icon name="arrow-left" size={24} color="#2563eb" />
			</TouchableOpacity>
			<View className="mb-6">
				<Text className="text-blue-600 font-bold text-3xl">REGISTRASI AKUN</Text>
				<Text className="text-slate-400 font-medium text-base">Silahkan isi data anda dengan benar untuk dapat bergabung bersama kami</Text>
			</View>
			<View className="w-full">
				<TouchableOpacity
					onPress={() => navigation.replace("KonfirmasiALamat")}
					className="mb-6"
				>
					<Text className={`absolute text-slate-400 font-medium text-base bg-white left-10 px-3 z-10 ${alamatFocus === false && alamat.length == 0 ? ('top-[15px]') : ('top-[-12px] text-blue-600')}`}>alamat</Text>
					<View className={`border-2 relative py-[14px]  rounded-md ${alamatFocus == false && alamat == '' ? ('border-slate-300') : ('border-blue-600')}`}>
						<Text className="pl-12 text-slate-500 font-bold text-base">{alamat}</Text>
					</View>
					<View className="absolute h-[49px] w-[49px] items-center justify-center z-50 left-0">
						<Icon name="map" size={20} color={`${alamatFocus == false && alamat.length == 0 ? ('#9ca3af') : ('#2563eb')}`} />
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setModalVisible(true)}
					className="mb-6"
				>
					<Text className={`absolute text-slate-400 font-medium text-base bg-white left-10 px-3 z-10 ${gambarFocus === false && gambar.length == 0 ? ('top-[15px]') : ('top-[-12px] text-blue-600')}`}>Gambar</Text>
					<View className={`border-2 relative py-[14px]  rounded-md ${gambarFocus == false && gambar.length == 0 ? ('border-slate-300') : ('border-blue-600')}`}>
						<Text className="pl-12 pr-6 text-slate-500 font-medium text-base">{gambar}</Text>
					</View>
					<View className="absolute h-[49px] w-[49px] items-center justify-center z-50 left-0">
						<Icon name="image" size={20} color={`${gambarFocus == false && gambar.length == 0 ? ('#9ca3af') : ('#2563eb')}`} />
					</View>
				</TouchableOpacity>
				<View className="mb-6">
					<Text className={`absolute text-slate-400 font-medium text-base bg-white left-10 px-3 z-10 ${namaFocus === false && nama.length == 0 ? ('top-[15px]') : ('top-[-12px] text-blue-600')}`}>Nama</Text>
					<View className={`border-2 relative  rounded-md ${namaFocus == false && nama.length == 0 ? ('border-slate-300') : ('border-blue-600')}`}>
						<TextInput
							className="pl-12 text-slate-500 font-bold text-base"
							onChangeText={(value) => setNama(value)}
							onFocus={() => setNamaFocus(true)}
							onBlur={() => setNamaFocus(false)}
						/>

					</View>
					<View className="absolute h-[49px] w-[49px] items-center justify-center z-50 left-0">
						<Icon name="user" size={20} color={`${namaFocus == false && nama.length == 0 ? ('#9ca3af') : ('#2563eb')}`} />
					</View>
				</View>
				<View className="mb-6">
					<Text className={`relative text-base font-medium text-slate-400 mb-3`}>Jenis Kelamin</Text>
					<View className={`flex flex-row items-center`}>
						<TouchableOpacity 
							onPress={() => setJk('Laki-laki')}
							className={`flex flex-row items-center w-1/2`}
						>
							<FontAwesome name="mars" size={20} color={`${jk == 'Laki-laki' ? ('#2563eb') : ('#9ca3af')}`} />
							<Text className={`${jk == 'Laki-laki' ? ('line-through text-blue-600 ') : ('no-underline text-slate-400 ')} text-base font-medium ml-3`}>Laki-laki</Text>
						</TouchableOpacity>
						<TouchableOpacity 
							onPress={() => setJk('Perempuan')}
							className="flex flex-row items-center w-1/2"
						>
							<FontAwesome name="venus" size={20} color={`${jk == 'Perempuan' ? ('#2563eb') : ('#9ca3af')}`} />
							<Text className={`${jk == 'Perempuan' ? ('line-through text-blue-600 ') : ('no-underline text-slate-400 ')} text-base font-medium ml-3`}>Perempuan</Text>
						</TouchableOpacity>
					</View>
					
				</View>
				<View className="mb-6">
					<Text className={`absolute text-slate-400 font-medium text-base bg-white left-10 px-3 z-10 ${tlpFocus === false && tlp.length == 0 ? ('top-[15px]') : ('top-[-12px] text-blue-600')}`}>No.Telepon</Text>
					<View className={`border-2 relative  rounded-md ${tlpFocus == false && tlp.length == 0 ? ('border-slate-300') : ('border-blue-600')}`}>
						<TextInput
							className="pl-12 text-slate-500 font-bold text-base"
							onChangeText={(value) => setTlp(value)}
							onFocus={() => setTlpFocus(true)}
							onBlur={() => setTlpFocus(false)}
						/>

					</View>
					<View className="absolute h-[49px] w-[49px] items-center justify-center z-50 left-0">
						<Icon name="phone" size={20} color={`${tlpFocus == false && tlp.length == 0 ? ('#9ca3af') : ('#2563eb')}`} />
					</View>
				</View>
				<View className="mb-6">
					<Text className={`absolute text-slate-400 font-medium text-base bg-white left-10 px-3 z-10 ${emailFocus === false && email.length == 0 ? ('top-[15px]') : ('top-[-12px] text-blue-600')}`}>Email</Text>
					<View className={`border-2 relative  rounded-md ${emailFocus == false && email.length == 0 ? ('border-slate-300') : ('border-blue-600')}`}>
						<TextInput
							className="pl-12 text-slate-500 font-bold text-base"
							onChangeText={(value) => setEmail(value)}
							onFocus={() => setEmailFocus(true)}
							onBlur={() => setEmailFocus(false)}
						/>

					</View>
					<View className="absolute h-[49px] w-[49px] items-center justify-center z-50 left-0">
						<Icon name="mail" size={20} color={`${emailFocus == false && email.length == 0 ? ('#9ca3af') : ('#2563eb')}`} />
					</View>
				</View>
				<View className="mb-6">
					<Text className={`absolute text-slate-400 font-medium text-base bg-white left-10 px-3 z-10 ${passwordFocus === false && password.length == 0 ? ('top-[15px]') : ('top-[-12px] text-blue-600')}`}>Password</Text>
					<View className={`border-2 relative  rounded-md ${passwordFocus == false && password.length == 0 ? ('border-slate-300') : ('border-blue-600')}`}>
						<TextInput
							className="pl-12 text-slate-500 font-bold text-base"
							secureTextEntry={showPassword}
							onChangeText={(value) => setPassword(value)}
							onFocus={() => setPasswordFocus(true)}
							onBlur={() => setPasswordFocus(false)}
						/>

					</View>
					<View className="absolute h-[49px] w-[49px] items-center justify-center z-50 left-0">
						<Icon name="lock" size={20} color={`${passwordFocus == false && password.length == 0 ? ('#9ca3af') : ('#2563eb')}`} />
					</View>
					<TouchableOpacity
						onPress={checkShow}
						className="absolute h-[49px] w-[49px] items-center justify-center z-50 right-0"
					>
						<Icon name={passIcon} size={20} color={`${showPassword ? ('#9ca3af') : ('#2563eb')}`} />
					</TouchableOpacity>
				</View>
				<View className="mb-6 mt-6">
					<TouchableOpacity
						onPress={sendRegistrasi}
						className="w-full px-6 py-4 bg-blue-600 items-center justify-center rounded-md"
					>
						<Text className="text-white font-medium text-base text-center uppercase">REGISTRASI</Text>
					</TouchableOpacity>

				</View>

			</View>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
			>
				<View className="flex-1 items-end justify-end p-3" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
					<View className=" w-full rounded-md p-6 gap-3 flex flex-row items-center justify-between bg-white" >
						<TouchableOpacity
							onPress={bukaGaleri}
							className="text-center items-center justify-center p-6 rounded-md bg-slate-100 w-[130px]"
						>
							<Icon name="image" size={30} color="#9ca3af" />
							<Text className="text-base font-medium text-slate-500">GALERI</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={bukaKamera}
							className="text-center items-center justify-center p-6 rounded-md bg-slate-100 w-[130px]"
						>
							<Icon name="camera" size={30} color="#9ca3af" />
							<Text className="text-base font-medium text-slate-500">KAMERA</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

		</ScrollView>
	)
}

export default Login