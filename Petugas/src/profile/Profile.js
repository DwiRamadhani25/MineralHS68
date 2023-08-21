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
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIndicator } from 'react-native-indicators';
import Icons from "react-native-vector-icons/Feather";
import DATA_API from "./../api/dataAPI";
import DATA_IMAGE from "./../api/dataImage";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Profile = ({ navigation }) => {

	const ImagePicker = require('react-native-image-picker');

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

	// openCamera
	async function openCamera(){
		
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
					setLoading(true)
					const uri = res.assets[0].uri;
					const type = res.assets[0].type;
					const Name = res.assets[0].fileName;

					const formData = new FormData();
					formData.append('foto', {
						uri: uri,
						name: Name,
						type: type,
					});

					fetch(`${DATA_API}/updateFoto/${pegawai.id}`, {
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'multipart/form-data',
						},
						body: formData,
					})
					.then(response => response.json())
					.then(async data => {
						setLoading(false)
						if (data.status == 200) {
							Alert.alert(`${data.status}`, `${data.message}`, [
								{ text: 'OK' },
							]);
						}else{
							Alert.alert(`${data.status}`, `${data.message}`, [
								{ text: 'OK', onPress: () => navigation.replace('Profile') },
							]);
						}
					})

					

				});
			} else {
				console.log("Camera permission denied");
			}
		} catch (err) {
			console.log(err);
		}
	}

	async function aksiLogout(){
		await AsyncStorage.removeItem('id');
		navigation.replace('Login')
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
		<View  style={{ position: 'relative', height: windowHeight }}>
			<StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent />
			<Appbar.Header>
				<Appbar.BackAction onPress={() => navigation.replace("Home")} />
				<Appbar.Content title="PROFILE" />
			</Appbar.Header>

			<ScrollView>
				<View style={[styles.body, { marginBottom: 100}]}>
					<View style={styles.boxImage}>
						<View style={styles.boxImageitem}>
							<Image
								source={{ uri: `${DATA_IMAGE}/${pegawai.foto}` }}
								resizeMode='contain'
								style={styles.boxImageitemImage}
							/>
							<TouchableOpacity
								onPress={openCamera}
								style={styles.btnOpenCamera}
							>
								<Icons name="camera" size={24} color={'#94a3b8'} />
							</TouchableOpacity>
						</View>
					</View>
					<View>
						<View style={styles.listItem}>
							<Text style={styles.listItemTitle}>Nama</Text>
							<Text style={styles.listItemSubTitle}>{pegawai.nama}</Text>
						</View>
						<View style={styles.listItem}>
							<Text style={styles.listItemTitle}>Telepon</Text>
							<Text style={styles.listItemSubTitle}>{pegawai.tlp}</Text>
						</View>
						<View style={styles.listItem}>
							<Text style={styles.listItemTitle}>Email</Text>
							<Text style={styles.listItemSubTitle}>{pegawai.email}</Text>
						</View>
						<View style={[styles.listItem, { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }]}>
							<Text style={[styles.listItemTitle, { marginBottom: 12 }]}>Password</Text>
							<Text style={[styles.listItemSubTitle]}>{pegawai.password}</Text>
						</View>
						<View style={[styles.listItem, { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }]}>
							<Text style={[styles.listItemTitle, { marginBottom: 12 }]}>Alamat</Text>
							<Text style={[styles.listItemSubTitle]}>{pegawai.alamat}</Text>
						</View>
					</View>
				</View>
				
			</ScrollView>
			<View style={styles.footerBtn}>
				<TouchableOpacity
					onPress={()=> navigation.navigate('Editprofile', {pegawai})}
					style={styles.btnUpdate}
				>
					<Text style={styles.btnText}>EDIT PROFILE</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={aksiLogout}
					style={styles.btnLogout}
				>
					<Text style={styles.btnText}>LOGOUT</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default Profile

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
		width: windowWidth / 2.5,
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