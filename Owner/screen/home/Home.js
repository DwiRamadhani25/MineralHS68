import React, {useState, useEffect} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	FlatList,
	StatusBar,
	ImageBackground,
	Dimensions
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DATA_API from "./../api/dataAPI";
import DATA_IMAGE from "./../api/dataImage";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Home = ({ navigation }) => {

	const [siuser, setsiuser] = useState('');

	useEffect(() => {
        cekLogin()
    }, [])

    // Cek apakah user sudah login sebelumnya

    async function cekLogin() {
        	const userLogin = await AsyncStorage.getItem('id')
            
			if (userLogin != null) {
				fetch(`${DATA_API}/ambilUser/${userLogin}`)
				.then(response => response.json())
				.then(data => {
					setsiuser(data.data)
				})
				.catch((error) => { 
					console.log(error.message)
				});
			}
    }

	const dataCounter = [
		{
			'id': 1,
			'title': 'GALON',
			'icons': require('./../../assets/galon.png'),
			'jumlah': 10,
			'background': 'bg-green-600',
			'link': 'galon',
	
		},
		{
			'id': 2,
			'title': 'DUS BOTOL',
			'icons': require('./../../assets/botol.png'),
			'jumlah': 23,
			'background': 'bg-purple-600',
			'link': 'botol',
			
		},
		{
			'id': 3,
			'title': 'DUS GELAS',
			'icons': require('./../../assets/gelas.png'),
			'jumlah': 25,
			'background': 'bg-sky-600',
			'link': 'gelas'
		},
	]

	function renderItem({ item }) {

		return (
			<TouchableOpacity 
				className={`relative w-[${width}_-_48px] mb-6 ${item.background} p-6 mx-6 flex flex-row rounded`} 
				onPress={() => navigation.navigate("Pesan", {item, siuser})}
			>
				<Image source={item.icons} resizeMode='contain' className="w-[60px] h-[100px]"/>
				
				<View className={`h-full ml-6 w-[210px]`}>
					<Text className="text-3xl font-bold text-white">{item.jumlah}</Text>
					<Text className="text-base font-medium text-white mb-3">{item.title}</Text>
					<Text className="text-sm font-normal text-slate-200">Total pesanan {item.title} selama menggunakan aplikasi kami</Text>
				</View>
			</TouchableOpacity>	
			
		)
	}


	function renderHeader(){
		return(
			<View className="flex flex-row justify-between pt-12 px-6 pb-3 bg-blue-600 mb-6">
				<View className="flex flex-row">
					<Image resizeMode='contain' source={{ uri: `${DATA_IMAGE}/${siuser.photo}`}} className="w-[50px] h-[50px] rounded-full" />
					<View className="px-3">
						<Text className="text-medium text-base text-white">{siuser.nama_p}</Text>
						<Text className="text-medium text-sm text-slate-100">{siuser.email}</Text>
					</View>
				</View>
				<TouchableOpacity
					onPress={() => console.log('Ok')}
					className="relative w-[57px] h-[57px] flex items-center justify-center"
				>
					<Icon name="bell" size={24} color="white" />
					<View className="absolute top-1 right-1 bg-yellow-400 w-5 h-5 flex items-center justify-center rounded-full">
						<Text className="text-sm font-medium text-white">2</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}


	return (
		<View className="bg-white flex-1 relative">
			<StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent />
			
			<FlatList
				data={dataCounter}
				stickyHeaderIndices={[0]}
				renderItem={renderItem}
				ListHeaderComponent={renderHeader}
			/>
			<View className="flex flex-row items-center justify-between fixed bottom-0 w-full bg-slate-50">
				<TouchableOpacity

					className="flex items-center justify-center w-1/3 h-[70px]"
				>
					<Icon name="home" size={20} color={'#3b82f6'} />
					<Text className="text-sm font-medium text-blue-500">Home</Text>
				</TouchableOpacity>
				
				<TouchableOpacity
					onPress={() => navigation.navigate("Pesanan", {siuser})}
					className="flex items-center justify-center w-1/3 h-[70px]"
				>
					<Icon name="archive" size={20} color={'#94a3b8'} />
					<Text className="text-sm font-medium text-slate-400">HISTORY</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate("Akun")}
					className="flex items-center justify-center w-1/3 h-[70px]"
				>
					<Icon name="settings" size={20} color={'#94a3b8'} />
					<Text className="text-sm font-medium text-slate-400">Akun</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default Home