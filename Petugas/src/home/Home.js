import React, {
	useState,
	useEffect
} from 'react';
import {
	View,
	TouchableOpacity,
	StatusBar,
	FlatList,
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	Appbar,
	Text,
	Button,
	Menu,
	Divider,
	PaperProvider
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIndicator } from 'react-native-indicators';
import DATA_API from "./../api/dataAPI";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({navigation}) => {

	const [loading, setLoading] = useState(true);
	const [pegawai, setpegawai] = useState("");
	const [antaran, setantaran] = useState("");

	useEffect(() => {
		ambilDataPegawai();
		ambilDataAntaran();
	}, [])
	
	async function ambilDataPegawai(){
		let idPegawai = await AsyncStorage.getItem('id');
		fetch(`${DATA_API}/ambilakun/${idPegawai}`)
		.then(response => response.json())
		.then(async res => {
			setLoading(false)
			if (res.status == 200) {
				setpegawai(res.data)
			}else{
				console.log('Terjadi kesalahan saat mengambil data !')
			}
		})
	}
	async function ambilDataAntaran(){
		let idPegawai = await AsyncStorage.getItem('id');
		
		fetch(`${DATA_API}/cekPesanan/${idPegawai}`)
		.then(response => response.json())
		.then(async res => {
			setLoading(false)
			if (res.data != null) {
			
				setantaran(res.data)
			}else{
				console.log('Data')
			}
		})
	}



	
	

	function renderItem({ item }) {

		return (
			<TouchableOpacity
				onPress={()=>navigation.replace("Antardetail", { item })}
				style={styles.listContent}
			>
				<View style={styles.listItem}>
					<Text style={styles.listItemTitle}>Produk</Text>
					<Text>{item.produk.nama_produk}</Text>
				</View>
				<View style={styles.listItem}>
					<Text style={styles.listItemTitle}>Ukuran</Text>
					<Text>{item.produk.kategori_produk}</Text>
				</View>
				<View style={styles.listItem}>
					<Text style={styles.listItemTitle}>Pelanggan</Text>
					<Text>{item.pelanggan.nama_p}</Text>
				</View>
				<View style={styles.listItem}>
					<Text style={styles.listItemTitle}>Telepon</Text>
					<Text>{item.pelanggan.tlp}</Text>
				</View>
				<View style={styles.listItemAlamat}>
					<Text style={styles.listItemTitle}>Alamat Pengantaran</Text>
					<Text>{item.pelanggan.alamat_p}</Text>
				</View>
			</TouchableOpacity>
		)
	}

	return (
		<>
			<StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent />
			<Appbar.Header style={{ marginBottom: 24 }} elevated={true}>
				<Appbar.Content title={pegawai.nama} />
				<Appbar.Action icon="dots-vertical" onPress={() => navigation.replace("Profile")} />
			</Appbar.Header>
			<Text
				style={{ 
					fontSize: 20,
					color: '#64748b',
					fontWeight: '500',
					marginVertical: 24,
					marginHorizontal: 24
				 }}
			>
				LIST ANTARAN ANDA !
			</Text>
			{
				loading ? (
					<View style={styles.loadingView}>
						<View style={styles.loadingViewBox}>
							<MaterialIndicator color='#06b6d4' />
							<Text style={styles.loadingViewText}>Loading ...</Text>
						</View>
					</View>
				) : null
			}
			{
				antaran != "" ? (
					<FlatList
						data={antaran}
						renderItem={renderItem}
						
					/>
				) : (
					<View style={styles.nullContainer}>
						<Text style={styles.listItemTitle}>BELUM ADA ANTARAN UNTUK ANDA !</Text>
					</View>
				)
			}
			
		</>
	)
}

export default Home

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
	nullContainer: {
		height: windowHeight - 90,
		width: windowWidth,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f8fafc'
	},
	listContent: {
		paddingHorizontal: 24,
		paddingVertical: 24,
		backgroundColor: '#FFFFFF',
		marginBottom: 12
	},
	listItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 12
	},
	listItemAlamat: {
		display: 'flex',
		flexDirection: 'cols',
	},
	listItemTitle: {
		fontSize: 16,
		fontWeight: '500',
		color: '#64748b',
		marginBottom: 12
	}
})