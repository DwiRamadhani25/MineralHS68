import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from "react-native-vector-icons/Feather";

const PelangganDetail = ({ navigation, route }) => {

	const [pelanggan, setPelanggan] = useState(route.params.item);
	

	const confirmHapus = () =>
		Alert.alert('Hapus Akun', 'Yakin ingin menghapus akun pelanggan ini ?', [
			{
				text: 'BATAL',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{ text: 'YAKIN', onPress: () => console.log('OK Pressed') },
		]);

	return (
		<View className="flex flex-1 bg-white">
			<View className="pt-8 w-full bg-blue-600 flex flex-row items-center">
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					className="flex items-center justify-center w-[57px] h-[57px]"
				>
					<Icon name="arrow-left" size={24} color="white" />
				</TouchableOpacity>
				<Text className="font-medium text-xl text-white mx-6">DETAIL PELANGGAN</Text>
			</View>
			<View className="p-6">
				<View className="border-b-2 border-b-slate-200 py-2">
					<View className="flex flex-row items-center">
						<Icon name="user" size={18} color="grey" />
						<Text className="text-base font-medium mx-2">Nama</Text>
					</View>
					<Text className="text-base  ml-6 text-slate-400">{pelanggan.nama}</Text>
				</View>
				<View className="border-b-2 border-b-slate-200 py-2">
					<View className="flex flex-row items-center">
						<Icon name="mail" size={18} color="grey" />
						<Text className="text-base font-medium mx-2">Email</Text>
					</View>
					<Text className="text-base  ml-6 text-slate-400">{pelanggan.email}</Text>
				</View>
				<View className="border-b-2 border-b-slate-200 py-2">
					<View className="flex flex-row items-center">
						<Icon name="lock" size={18} color="grey" />
						<Text className="text-base font-medium mx-2">Password</Text>
					</View>
					<Text className="text-base  ml-6 text-slate-400">{pelanggan.password}</Text>
				</View>
				<View className="border-b-2 border-b-slate-200 py-2">
					<View className="flex flex-row items-center">
						<Icon name="phone" size={18} color="grey" />
						<Text className="text-base font-medium mx-2">Jenis Kelamin</Text>
					</View>
					<Text className="text-base  ml-6 text-slate-400">{pelanggan.jk}</Text>
				</View>
				<View className="border-b-2 border-b-slate-200 py-2">
					<View className="flex flex-row items-center">
						<Icon name="phone" size={18} color="grey" />
						<Text className="text-base font-medium mx-2">Telepon</Text>
					</View>
					<Text className="text-base  ml-6 text-slate-400">{pelanggan.telepon}</Text>
				</View>
				<View className="border-b-2 border-b-slate-200 py-2">
					<View className="flex flex-row items-center">
						<Icon name="mail" size={18} color="grey" />
						<Text className="text-base font-medium mx-2">Alamat</Text>
					</View>
					<Text className="text-base  ml-6 text-slate-400">{pelanggan.alamat}</Text>
				</View>

				<View className="flex flex-row items-center justify-center gap-3 mt-5">
					<TouchableOpacity 
					onPress={() => navigation.navigate("PelangganUpdate", {pelanggan})}
						className=" bg-blue-600 flex items-center justify-center rounded-md mt-9 px-6 py-3">
						<Text className="text-white font-medium">Update Akun</Text>
					</TouchableOpacity>
					<TouchableOpacity 
						onPress={confirmHapus}
						className=" bg-red-600 flex items-center justify-center rounded-md mt-9 px-6 py-3"
					>
						<Text className="text-white font-medium">Hapus Akun</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

export default PelangganDetail
