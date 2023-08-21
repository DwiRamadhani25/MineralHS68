import React, {
	useState,
	useEffect
} from 'react';
import {
	StyleSheet,
	View,
	Dimensions,
	StatusBar,
	Image,
	TouchableOpacity,
	ScrollView,
	PermissionsAndroid,
	Alert
} from 'react-native';
import {
	Appbar,
	Text,
	TextInput
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIndicator } from 'react-native-indicators';
import Icons from "react-native-vector-icons/Feather";
import DATA_API from "./../api/dataAPI";
import DATA_IMAGE from "./../api/dataImage";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Editprofile = ({navigation}) => {

	const [loading, setLoading] = useState(true);
	const [pegawai, setpegawai] = useState("");

	

	useEffect(() => {
		ambilDataPegawai();
	}, [])

	async function ambilDataPegawai() {
		let idPegawai = await AsyncStorage.getItem('id');
		fetch(`${DATA_API}/ambilakun/${idPegawai}`)
			.then(response => response.json())
			.then(async res => {
				setLoading(false)
				if (res.status == 200) {
					setpegawai(res.data)
				} else {
					console.log('Terjadi kesalahan saat mengambil data !')
				}
			})
	}




	const [nama, setnama] = useState(pegawai.nama);
	const [tlp, settlp] = useState(pegawai.tlp);
	const [email, setemail] = useState(pegawai.email);
	const [password, setpassword] = useState('');
	const [alamat, setalamat] = useState(pegawai.alamat);

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

	

	async function aksiUpdate() {
		const ids = await AsyncStorage.getItem('id')
		{console.log(`${DATA_API}/updateAkun/${ids}`)}
			let dataForm = {
				'nama': nama != undefined ? nama : pegawai.nama,
				'tlp':	tlp != undefined ? tlp : pegawai.tlp,
				'alamat': alamat != undefined ? alamat : pegawai.alamat,
				'email': email != undefined ? email : pegawai.email,
				'password': password,
			}
			
			fetch(`${DATA_API}/updateAkun/${ids}`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				  },
				  body: JSON.stringify(dataForm),
			})
				.then(response => response.json())
				.then(async data => {
					setLoading(false)

					if (data.status === 200) {
						
						Alert.alert(`${data.status}`, `${data.message}`, [
							{ text: 'OK', onPress: () => navigation.replace('Profile') },
						]);
						
					} else {
						
						Alert.alert(`${data.status}`, `${data.message}`, [
							{ text: 'OK', onPress: () => navigation.replace('Editprofile') },
						]);

					}
				})
				.catch((error) => {
					setLoading(false)
					Alert.alert(`405`, `${error}`, [
						{ text: 'OK' },
					])
				});
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
		<View style={{ width: windowWidth, height: windowHeight, backgroundColor: '#FFFFFF' }}>
			<StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent />
			<Appbar.Header>
				<Appbar.BackAction onPress={() => navigation.replace("Profile")} />
				<Appbar.Content title="UPDATE PROFILE" />
			</Appbar.Header>
			
			<View style={{ padding: 24 }}>
				<TextInput
					mode="outlined"
					label="Nama"
					value={nama}
					onChangeText={text => setnama(text)}
					left={<TextInput.Icon icon="bag-personal" />}
					style={{ marginBottom: 24 }}
				/>
				<TextInput
					mode="outlined"
					label="Telepon"
					value={tlp}
					onChangeText={text => settlp(text)}
					left={<TextInput.Icon icon="cellphone" />}
					style={{ marginBottom: 24 }}
				/>
				<TextInput
					mode="outlined"
					label="Alamat"
					value={alamat}
					onChangeText={text => setalamat(text)}
					left={<TextInput.Icon icon="google-maps" />}
					style={{ marginBottom: 24 }}
				/>
				<TextInput
					mode="outlined"
					label="Email"
					value={email}
					onChangeText={text => setemail(text)}
					left={<TextInput.Icon icon="mail" />}
					style={{ marginBottom: 24 }}
				/>
				<TextInput
					mode="outlined"
					label="Password"
					secureTextEntry={showPassword}
					onChangeText={text => setpassword(text)}
					left={<TextInput.Icon icon="lock" />}
					right={<TextInput.Icon icon={passIcon} onPress={checkShow} />}
					style={{ marginBottom: 24 }}
				/>
			</View>
			<View style={styles.footerBtn}>
				<TouchableOpacity
					onPress={aksiUpdate}
					style={styles.btnUpdate}
				>
					<Text style={styles.btnText}>UPDATE PROFILE</Text>
				</TouchableOpacity>
				
			</View>
		</View>
	)
}

export default Editprofile


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
		position: 'absolute',
		top: '40%',
		left: '40%',
		marginTop: '10%',
		fontSize: 18,
		color: '#94a3b8'
	},
	body: {
		padding: 24,
		backgroundColor: '#FFFFFF',
	},
	boxImage: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		padding: 24
	},
	boxImageitem: {
		width: 150,
		height: 150,
		borderRadius: '50%',
		position: 'relative'
	},
	boxImageitemImage: {
		width: '100%',
		height: '100%',
		borderRadius: 150
	},
	btnOpenCamera: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		width: 48,
		height: 48,
		display: 'flex',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 48,
		borderWidth: 2,
		borderColor: '#94a3b8',
		backgroundColor: '#ffffff'
	},
	listItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 24,
		borderBottomWidth: 1.1,
		borderBottomColor: '#cbd5e1'
	},
	listItemTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#475569'
	},
	listItemSubTitle: {
		fontSize: 16,
		fontWeight: '500',
		color: '#475569'
	},
	footerBtn: {
		position: 'absolute',
		bottom: -30,
		backgroundColor: '#FFFFFF',
		padding: 24,
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	btnUpdate: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 18,
		paddingHorizontal: 32,
		borderWidth: 1.2,
		borderRadius: 10,
		borderColor: '#06b6d4',
		width: windowWidth - 64,
	},
	btnLogout: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 18,
		paddingHorizontal: 32,
		borderWidth: 1.2,
		borderRadius: 10,
		borderColor: '#f43f5e',
		width: windowWidth / 2.5,
	},
	btnText: {
		fontSize: 14,
		fontWeight: 'bold',
		textTransform: 'uppercase'
	}
})