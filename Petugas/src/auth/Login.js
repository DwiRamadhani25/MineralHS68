import React, {
	useState,
	useEffect
} from 'react';
import {
	StyleSheet,
	View,
	StatusBar,
	TouchableOpacity,
	Dimensions,
	Alert
} from 'react-native';
import {
	Avatar,
	Text,
	TextInput
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DATA_API from "./../api/dataAPI";
import { MaterialIndicator } from 'react-native-indicators';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Login = ({ navigation }) => {

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(false)
		cekLogin()
	}, [])

	// Cek apakah user sudah login sebelumnya
	async function cekLogin() {
		try {
			const userLogin = await AsyncStorage.getItem('id')


			if (userLogin != null) {
				navigation.replace('Home')
			}
		} catch (e) {
			// read error
		}
	}

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [showPassword, setShowPassword] = useState(false);
	const [passIcon, setPassIcon] = useState('eye-off');

	function checkShow() {

		if (showPassword) {
			setShowPassword(true)
			setPassIcon('eye')
		} else {
			setShowPassword(false)
			setPassIcon('eye-off')
		}
	}

	// Aksi login
	async function aksiLogin() {
		try {
			setShowPassword(true)
			const formData = new FormData();
			formData.append('email', email);
			formData.append('password', password);
			
			if (email != '' && password != '') {
				fetch(`${DATA_API}/login`, {
					method: 'POST',
					headers: {

						'Content-Type': 'multipart/form-data',
					},
					body: formData,
				})
					.then(response => response.json())
					.then(async data => {
						setLoading(false)

						if (data.status === 200) {
							const id = JSON.stringify(data.data.id);
							await AsyncStorage.setItem('id', id)
							Alert.alert(`${data.status}`, `${data.message}`, [
								{ text: 'OK', onPress: () => navigation.replace('Home') },
							]);
							
						} else {
							
							Alert.alert(`${data.status}`, `${data.message}`, [
								{ text: 'OK', onPress: () => navigation.replace('Login') },
							]);

						}
					})
					.catch((error) => {
						setLoading(false)
						Alert.alert(`405`, `${error}`, [
							{ text: 'OK' },
						])
					});
			} else {
				setLoading(false)
				Alert.alert('Peringatan !', "Inputan tidak boleh ada yang kosong !", [
					{ text: 'OK' },
				])
			}
		} catch (error) {
			console.log(error.message)
		}
	}

	// Loading data
	if (loading) {
        return (
            <>
                <StatusBar barStyle={'dark-content'} backgroundColor="transparent" translucent />
                <View style={styles.loadingView}>
					<View style={styles.loadingViewBox}>
						<MaterialIndicator color='#06b6d4' />
						<Text style={styles.loadingViewText}>Loading ...</Text>
					</View>
				</View>
            </>
        )
    }

	return (
		<View style={styles.container}>
			<StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent />
			<View >
				<View style={styles.formHeader}>
					<Text style={styles.cardTitle}>HS</Text>
					<Text >Silahkan Login menggunakan akun anda !</Text>
				</View>
				<View>
					<TextInput
						mode="outlined"
						label="Email"
						value={email}
						onChangeText={text => setEmail(text)}
						left={<TextInput.Icon icon="email" />}
					/>
					<TextInput
						mode="outlined"
						label="Password"
						secureTextEntry={showPassword}
						onChangeText={text => setPassword(text)}
						left={<TextInput.Icon icon="lock" />}
						right={<TextInput.Icon icon={passIcon} onPress={checkShow} />}
						style={{ marginVertical: 32 }}
					/>
				</View>
				<TouchableOpacity
					onPress={aksiLogin}
					style={styles.btnLogin}
				>
					<Text style={styles.btnLoginText}>LOGIN</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default Login

const styles = StyleSheet.create({
	loadingView: { 
		height: windowHeight,
		width: windowWidth,
		display: 'flex-1',
		justifyContent: 'center',
		backgroundColor: '#f8fafc'
	},
	loadingViewBox: {
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'center',
		position: 'relative'
	},
	loadingViewText: {
		position:'absolute',
		top: '40%',
		left: '40%',
		marginTop: '10%',
		fontSize: 18,
		color: '#94a3b8'
	},
	container: {

		paddingHorizontal: 32,
		paddingVertical: 32,
		height: windowHeight,
		width: windowWidth,
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: '#f8fafc'
	},
	btnLogin: {
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'center',
		width: '100%',
		paddingHorizontal: 32,
		paddingVertical: 16,
		backgroundColor: '#0ea5e9',
		borderRadius: 10,
		marginTop: 32,
	},
	btnLoginText: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#FFFFFF'
	},
	cardTitle: {
		fontSize: 50,
		fontWeight: 'bold',
		color: '#0ea5e9'
	},
	formHeader: {
		marginBottom: 50
	}
})