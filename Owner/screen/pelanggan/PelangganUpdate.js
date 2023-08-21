import React, { useState, useEffect } from 'react';
import { View, Text, Image, Modal, StatusBar, TextInput, TouchableOpacity, ScrollView, PermissionsAndroid } from 'react-native'
import AnimatedLoader from "react-native-animated-loader";
import Icon from 'react-native-vector-icons/Feather';

const logo = require("./../../assets/logo.png");
const animLoading = require("./../../assets/loading.json");

const PelangganUpdate = ({ navigation, route }) => {

	

	

	const ImagePicker = require('react-native-image-picker');
	const [dataAwal, setDataAwal] = useState(route.params.pelanggan)

	const [nama, setNama] = useState(dataAwal.nama);
	const [namaFocus, setNamaFocus] = useState(false);
	const [tlp, setTlp] = useState(dataAwal.telepon);
	const [tlpFocus, setTlpFocus] = useState(false);
	const [alamat, setAlamat] = useState(route.params.alamatBaru === undefined ? dataAwal.alamat : route.params.alamatBaru);
	const [alamatFocus, setAlamatFocus] = useState(false);
	const [email, setEmail] = useState(dataAwal.email);
	const [emailFocus, setEmailFocus] = useState(false);
	const [password, setPassword] = useState(dataAwal.password);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(true);
	const [passIcon, setPassIcon] = useState('eye-off');

	function checkShow() {

		if (showPassword) {
			setShowPassword(false)
			setPassIcon('eye')
		} else {
			setShowPassword(true)
			setPassIcon('eye-off')
		}
	}
	
	return (
		<View className="flex flex-1 bg-white">
			<View className="pt-8 w-full bg-blue-600 flex flex-row items-center">
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					className="flex items-center justify-center w-[57px] h-[57px]"
				>
					<Icon name="arrow-left" size={24} color="white" />
				</TouchableOpacity>
				<Text className="font-medium text-xl text-white mx-2">UPDATE DATA PELANGGAN</Text>
			</View>
			<View className="p-6">
				<View className="mb-6">
					<Text className={`absolute text-slate-400 font-medium text-base bg-white left-10 px-3 z-10 ${namaFocus === false && nama.length == 0 ? ('top-[15px]') : ('top-[-12px] text-blue-600')}`}>Nama</Text>
					<View className={`border-2 relative  rounded-md ${namaFocus == false && nama.length == 0 ? ('border-slate-300') : ('border-blue-600')}`}>
						<TextInput
							className="pl-12 text-slate-500 font-bold text-base"
							onChangeText={(value) => setNama(value)}
							value={nama}
							onFocus={() => setNamaFocus(true)}
							onBlur={() => setNamaFocus(false)}
						/>

					</View>
					<View className="absolute h-[49px] w-[49px] items-center justify-center z-50 left-0">
						<Icon name="user" size={20} color={`${namaFocus == false && nama.length == 0 ? ('#9ca3af') : ('#2563eb')}`} />
					</View>
				</View>
				<View className="mb-6">
					<Text className={`absolute text-slate-400 font-medium text-base bg-white left-10 px-3 z-10 ${tlpFocus === false && tlp.length == 0 ? ('top-[15px]') : ('top-[-12px] text-blue-600')}`}>No.Telepon</Text>
					<View className={`border-2 relative  rounded-md ${tlpFocus == false && tlp.length == 0 ? ('border-slate-300') : ('border-blue-600')}`}>
						<TextInput
							className="pl-12 text-slate-500 font-bold text-base"
							onChangeText={(value) => setTlp(value)}
							value={tlp}
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
							value={email}
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
							value={password}
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
				<TouchableOpacity
					onPress={() => navigation.replace("KonAlamatPelanggan",{ dataAwal} )}
					className="mb-6"
				>
					<Text className={`absolute text-slate-400 font-medium text-base bg-white left-10 px-3 z-10 ${alamatFocus === false && alamat.length == 0 ? ('top-[15px]') : ('top-[-12px] text-blue-600')}`}>alamat</Text>
					<View className={`border-2 relative py-[14px]  rounded-md ${alamatFocus == false && alamat.length == 0 ? ('border-slate-300') : ('border-blue-600')}`}>
						<Text className="pl-12 text-slate-500 font-bold text-base">{alamat}</Text>
					</View>
					<View className="absolute h-[49px] w-[49px] items-center justify-center z-50 left-0">
						<Icon name="map" size={20} color={`${alamatFocus == false && alamat.length == 0 ? ('#9ca3af') : ('#2563eb')}`} />
					</View>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default PelangganUpdate
