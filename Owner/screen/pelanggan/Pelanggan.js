import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	FlatList,
	StatusBar
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import LinearGradient from 'react-native-linear-gradient';

const Pelanggan = ({ navigation }) => {
	const dataPelanggan = [
		{
		  'id':1,
		  'nama':"John Doe",
		  'telepon':"081234567890",
		  'jk':"Laki-laki",
		  'alamat':"Jl. Contoh No. 1, Kota A",
		  'email': "John Doe@gmail.com",
		  'password': '12345',
		},
		{
		  'id':2,
		  'nama':"Jane Smith",
		  'telepon':"089876543210",
		  'jk':"Perempuan",
		  'alamat':"Jl. Contoh No. 2, Kota B",
		  'email': "Jane Smith@gmail.com",
		  'password': '12345',
		},
		{
		  'id':3,
		  'nama':"Michael Johnson",
		  'telepon':"087654321098",
		  'jk':"Laki-laki",
		  'alamat':"Jl. Contoh No. 3, Kota C",
		  'email': "Michael Johnson@gmail.com",
		  'password': '12345',
		},
		{
		  'id':4,
		  'nama':"Emily Davis",
		  'telepon':"081234567891",
		  'jk':"Perempuan",
		  'alamat':"Jl. Contoh No. 4, Kota D",
		  'email': "Emily Davis@gmail.com",
		  'password': '12345',
		},
		{
		  'id':5,
		  'nama':"Sarah Anderson",
		  'telepon':"082345678901",
		  'jk':"Perempuan",
		  'alamat':"Jl. Contoh No. 50, Kota E",
		  'email': "Sarah Anderson@gmail.com",
		  'password': '12345',
		},
		{
		  'id':6,
		  'nama':"John Doe",
		  'telepon':"081234567890",
		  'jk':"Laki-laki",
		  'alamat':"Jl. Contoh No. 1, Kota A",
		  'email': "John Doe@gmail.com",
		  'password': '12345',
		},
		{
		  'id':7,
		  'nama':"Jane Smith",
		  'telepon':"089876543210",
		  'jk':"Perempuan",
		  'alamat':"Jl. Contoh No. 2, Kota B",
		  'email': "Emily Davis@gmail.com",
		  'password': '12345',
		},
		{
		  'id':8,
		  'nama':"Michael Johnson",
		  'telepon':"087654321098",
		  'jk':"Laki-laki",
		  'alamat':"Jl. Contoh No. 3, Kota C",
		  'email': "Emily Davis@gmail.com",
		  'password': '12345',
		},
		{
		  'id':9,
		  'nama':"Emily Davis",
		  'telepon':"081234567891",
		  'jk':"Perempuan",
		  'alamat':"Jl. Contoh No. 4, Kota D",
		  'email': "Emily Davis@gmail.com",
		  'password': '12345',
		},
		{
		  'id':10,
		  'nama':"Sarah Anderson",
		  'telepon':"082345678901",
		  'jk':"Perempuan",
		  'alamat':"Jl. Contoh No. 50, Kota E",
		  'email': "Emily Davis@gmail.com",
		  'password': '12345',
		}
	  ];


	  function renderItem({ item }) {

		return (
			<View className="w-full p-4 flex flex-row justify-between rounded-md bg-slate-50 border-b-2 border-b-slate-200">
				<View className="flex flex-row">
					<View className="flex items-center justify-center w-[45px] h-[45px] bg-slate-300 rounded-full">
						<Icon name={`users`} size={20} color="grey" />
					</View>
					<View className="px-6">
						<Text className="text-base font-medium text-slate-500">{item.nama}</Text>
						<Text className="text-sm font-medium text-slate-400  ">{item.telepon}</Text>
					</View>
				</View>
				<TouchableOpacity
					onPress={() => navigation.navigate("PelangganDetail", {item})}
					className=" w-[50px] flex items-center justify-center"
				>
					<Icon name="chevron-right" size={24} color="#94a3b8" />
				</TouchableOpacity>
			</View>
		)
	}
	return (
		<View className="bg-white flex-1 relative">
			<StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent />
			<View className="flex flex-row items-center justify-between pt-8 pb-2 bg-blue-600">
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					className="relative w-[57px] h-[57px] flex items-center justify-center"
				>
					<Icon name="arrow-left" size={24} color="white" />
				</TouchableOpacity>
				<Text className="block font-medium text-xl text-white mx-8">DATA PELANGGAN</Text>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					className="relative w-[57px] h-[57px] flex items-center justify-center"
				>
					<Icon name="plus" size={24} color="white" />
				</TouchableOpacity>
			</View>

			<FlatList
				data={dataPelanggan}
				renderItem={renderItem}
			/>
			
		</View>
	)
}

export default Pelanggan