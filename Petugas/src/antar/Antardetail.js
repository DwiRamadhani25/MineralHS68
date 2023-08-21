import React, {
	useState,
	useCallback
} from 'react'
import {
	View,
	StatusBar,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Alert
} from 'react-native'
import {
	List,
	MD3Colors,
	Appbar,
	Text
} from 'react-native-paper';
import { MaterialIndicator } from 'react-native-indicators';
import DATA_API from "./../api/dataAPI";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Antardetail = ({ navigation, route }) => {

	const data = route.params.item;
	const [loading, setLoading] = useState(false);


	async function selesaikanOrderan(){
		setLoading(true)
		const formData = new FormData();
		formData.append('status', 'Selesai');
		fetch(`${DATA_API}/selesaikanPesanan/${data.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			body: formData,
		})
		.then(response => response.json())
		.then(async data => {
			setLoading(false)
			if (data.status == 200) {
				Alert.alert(`${data.status}`, `${data.message}`, [
					{ text: 'OK', onPress: () => navigation.replace('Home') },
				]);
			}else{
				Alert.alert(`${data.status}`, `${data.message}`, [
					{ text: 'OK' },
				]);
			}
		})
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
		<>
			<ScrollView>
				<StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent />
				<Appbar.Header>
					<Appbar.BackAction onPress={() => navigation.replace("Home")} />
					<Appbar.Content title="DETAIL ANTARAN" />
				</Appbar.Header>
				<View>
					<View style={styles.containerList}>
						<Text style={styles.containerTitle}>
							PELANGGAN
						</Text>
						<View style={styles.list}>
							<Text style={styles.listTitle}>Nama</Text>
							<Text>{data.pelanggan.nama_p}</Text>
						</View>
						<View style={styles.list}>
							<Text style={styles.listTitle}>Telepon</Text>
							<Text>{data.pelanggan.tlp}</Text>
						</View>
						<View style={styles.list}>
							<Text style={styles.listTitle}>Alamat</Text>
							<Text>{data.pelanggan.alamat_p}</Text>
						</View>
					</View>
					<View style={[styles.containerList, { marginBottom: 124 }]}>
						<Text style={styles.containerTitle}>
							PRODUK
						</Text>
						<View style={styles.list}>
							<Text style={styles.listTitle}>Nama</Text>
							<Text>{data.produk.nama_produk}</Text>
						</View>
						<View style={styles.list}>
							<Text style={styles.listTitle}>Ukuran</Text>
							<Text>{data.produk.kategori_produk}</Text>
						</View>
						<View style={styles.list}>
							<Text style={styles.listTitle}>Jumlah</Text>
							<Text>{data.jumlah}</Text>
						</View>
					</View>

				</View>

			</ScrollView>
			<View style={styles.containerButton}>
				<TouchableOpacity
				onPress={selesaikanOrderan}
					style={styles.Button}
				>
					<Text style={{ fontSize: 16, fontWeight: '500', color: '#FFFFFF' }}>SELESAIKAN ANTARAN</Text>
				</TouchableOpacity>
			</View>
		</>
	)
}

export default Antardetail
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
	containerList: {
		padding: 24,
		margin: 24,
		backgroundColor: '#FFFFFF',
		borderRadius: 10
	},
	containerTitle: {
		fontSize: 20,
		marginBottom: 12
	},
	list: {
		marginBottom: 12,
		borderBottomWidth: 2,
		borderBottomColor: '#cbd5e1',
		paddingBottom: 12
	},
	listTitle: {
		fontSize: 16,
		marginBottom: 6,
		fontWeight: '500'
	},
	containerButton: {
		position: 'absolute',
		bottom: 0,
		paddingVertical: 24,
		paddingHorizontal: 16,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: windowWidth,
	},
	Button: {
		paddingVertical: 24,
		paddingHorizontal: 16,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#22c55e',
		width: windowWidth - 64,
		borderRadius: 10
	}
})