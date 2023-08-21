import React, { useState, useEffect } from 'react';
import { 
	View, 
	Text,
	StatusBar, 
	TextInput, 
	TouchableOpacity, 
	ScrollView,
	Alert,
	
} from 'react-native'
import AnimatedLoader from "react-native-animated-loader";
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
const animLoading = require("./../../assets/loading.json");

import DATA_API from "./../api/dataAPI";

const Updateakun = ({navigation }) => {

	const [dataUser, setDataUser] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		cekLogin()
	}, [])
	

	
    // Cek apakah user sudah login sebelumnya
    async function cekLogin() {
        try {
            const userLogin = await AsyncStorage.getItem('id')
            if (userLogin != null) {
                fetch(`${DATA_API}/ambilUser/${userLogin}`)
				.then(response => response.json())
				.then(data => {
					setLoading(false)
					setDataUser(data.data)
				})
				.catch((error) => { 
					setLoading(false)
					console.log(error.message)
				});
            }
        } catch (e) {
            // read error
        }
    }



	const [nama, setNama] = useState('');
	const [namaFocus, setNamaFocus] = useState(false);
	const [tlp, setTlp] = useState('');
	const [tlpFocus, setTlpFocus] = useState(false);
	const [email, setEmail] = useState('');
	const [emailFocus, setEmailFocus] = useState('');
	const [password, setPassword] = useState('');
	const [passwordFocus, setPasswordFocus] = useState(false);


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




	async function sendRegistrasi() {
		setLoading(true)
		const formData = new FormData();
		formData.append('nama_p', nama === '' ? dataUser.nama_p : nama);
		formData.append('tlp', tlp === '' ? dataUser.tlp : tlp);
		formData.append('email', email === '' ? dataUser.email : email);
		formData.append('password', password);


		
		fetch(`${DATA_API}/updateAkun/${dataUser.id}`, {
		    method: 'POST',
		    headers: {
				Accept: 'application/json',
		        'Content-Type': 'multipart/form-data',
		    },
		    body: formData,
		})
		.then(response => response.json())
		.then(data => {
			
		    if (data.status === 200) {
				setLoading(false)
				setDataUser(data.data)
				Alert.alert(`${data.status}`, `${data.message}`, [
					{ text: 'OK', onPress: () => navigation.replace("Akun")},
				])
		    } else {
				setLoading(false)
		        Alert.alert(`${data.status}`, `${data.message}`, [
					{ text: 'OK', onPress: () => navigation.replace("Akun")},
		        ])
				

		    }
		})
		.catch((error) => {
			setLoading(false)
		    //Alert.alert(`405`, `${error.message}`, [
		    //    { text: 'OK'},
		    //])
			console.log(error.message.toString())
		});
		
	}

	return(
		loading ? (
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
		) : (
			
			<View className="p-6 bg-white flex-1">
					<StatusBar barStyle={'dark-content'} backgroundColor="transparent" translucent />
					
					<View className="mb-6 flex flex-row items-center">
					<TouchableOpacity
						onPress={() => navigation.replace("Login")}
						className="w-[57px] h-[57px] bg-slate-100 first-letter:00 items-center justify-center rounded-md my-6"
					>
						<Icon name="arrow-left" size={24} color="#2563eb" />
					</TouchableOpacity>
						<Text className="text-blue-600 font-bold text-3xl ml-5">UPDATE AKUN</Text>
					</View>
					<View className="w-full h-screen flex-1  justify-center">
						
						<View className="mb-6">
							<Text className={`absolute text-slate-400 font-medium text-base bg-white left-10 px-3 z-10 top-[-12px] text-blue-600`}>Nama</Text>
							<View className={`border-2 relative  rounded-md ${namaFocus == false && nama == '' ? ('border-slate-300') : ('border-blue-600')}`}>
								<TextInput
									className="pl-12 text-slate-500 font-bold text-base"
									onChangeText={(value) => setNama(value)}
									placeholder={`${dataUser.nama_p}`}
									placeholderTextColor={'#64748b'}
									onFocus={() => setNamaFocus(true)}
									onBlur={() => setNamaFocus(false)}
								/>
		
							</View>
							<View className="absolute h-[49px] w-[49px] items-center justify-center z-50 left-0">
								<Icon name="user" size={20} color={`#2563eb`} />
							</View>
						</View>
						
						<View className="mb-6">
							<Text className={`absolute text-slate-400 font-medium text-base bg-white left-10 px-3 z-10 top-[-12px] text-blue-600`}>No.Telepon</Text>
							<View className={`border-2 relative  rounded-md ${tlpFocus == false && tlp == '' ? ('border-slate-300') : ('border-blue-600')}`}>
								<TextInput
									className="pl-12 text-slate-500 font-bold text-base"
									onChangeText={(value) => setTlp(value)}
									placeholder={`${dataUser.tlp}`}
									placeholderTextColor={'#64748b'}
									onFocus={() => setTlpFocus(true)}
									onBlur={() => setTlpFocus(false)}
								/>
		
							</View>
							<View className="absolute h-[49px] w-[49px] items-center justify-center z-50 left-0">
								<Icon name="phone" size={20} color={`${tlpFocus == false && tlp == '' ? ('#9ca3af') : ('#2563eb')}`} />
							</View>
						</View>
						<View className="mb-6">
							<Text className={`absolute  font-medium text-base bg-white left-10 px-3 z-10 top-[-12px] text-blue-600`}>Email</Text>
							<View className={`border-2 relative  rounded-md ${emailFocus == false && email == '' ? ('border-slate-300') : ('border-blue-600')}`}>
								<TextInput
									className="pl-12 text-slate-500 font-bold text-base"
									onChangeText={(value) => setEmail(value)}
									placeholder={`${dataUser.email}`}
									placeholderTextColor={'#64748b'}
									onFocus={() => setEmailFocus(true)}
									onBlur={() => setEmailFocus(false)}
								/>
		
							</View>
							<View className="absolute h-[49px] w-[49px] items-center justify-center z-50 left-0">
								<Icon name="mail" size={20} color={`${emailFocus == false && email == '' ? ('#9ca3af') : ('#2563eb')}`} />
							</View>
						</View>
						<View className="mb-6">
							<Text className={`absolute text-slate-400 font-medium text-base bg-white left-10 px-3 z-10 ${passwordFocus === false && password == '' ? ('top-[15px]') : ('top-[-12px] text-blue-600')}`}>Password</Text>
							<View className={`border-2 relative  rounded-md ${passwordFocus == false && password == '' ? ('border-slate-300') : ('border-blue-600')}`}>
								<TextInput
									className="pl-12 text-slate-500 font-bold text-base"
									secureTextEntry={showPassword}
									onChangeText={(value) => setPassword(value)}
									onFocus={() => setPasswordFocus(true)}
									onBlur={() => setPasswordFocus(false)}
								/>
		
							</View>
							<View className="absolute h-[49px] w-[49px] items-center justify-center z-50 left-0">
								<Icon name="lock" size={20} color={`${passwordFocus == false && password == '' ? ('#9ca3af') : ('#2563eb')}`} />
							</View>
							<TouchableOpacity
								onPress={checkShow}
								className="absolute h-[49px] w-[49px] items-center justify-center z-50 right-0"
							>
								<Icon name={passIcon} size={20} color={`${showPassword ? ('#9ca3af') : ('#2563eb')}`} />
							</TouchableOpacity>
						</View>
						<View className="mb-6 mt-12">
							<TouchableOpacity
								onPress={sendRegistrasi}
								className="w-full px-6 py-4 bg-blue-600 items-center justify-center rounded-md"
							>
								<Text className="text-white font-medium text-base text-center uppercase">UPDATE AKUN</Text>
							</TouchableOpacity>
		
						</View>
		
					</View>
		
				
		
				</View>
		)
	)
	




	
}

export default Updateakun