import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StatusBar,
	Dimensions,
	Modal,
	Alert
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import LinearGradient from 'react-native-linear-gradient';
import CounterInput from "react-native-counter-input";
import MapView, { Marker } from 'react-native-maps';
import AnimatedLoader from "react-native-animated-loader";
const animLoading = require("./../../assets/loading.json");
import DATA_API from "./../api/dataAPI";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Pesan = ({ route, navigation }) => {
	const title = route.params.item.title;
	const idPelanggan = route.params.siuser.id;
	const idProduk = route.params.item.id;

	



	const [alamat, setAlamat] = useState(route.params.siuser.alamat);

	const [alamatFocus, setAlamatFocus] = useState(false);
	const [location, setLocation] = useState(null);
	const [lat, setLatitude] = useState(null);
	const [lng, setLongitude] = useState(null);

	const [jumlah, setjumlah] = useState(1);
	const [hargadasar, sethargadasar] = useState(0);
	const [jenisbotol, setjenisbotol] = useState([]);
	const [aktif, setaktif] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const [loading, setloading] = useState(false);

	const [totalHarga, setTotalHarga] = useState(hargadasar * jumlah)
	var date = new Date().getDate(); //To get the Current Date
	var month = new Date().getMonth() + 1; //To get the Current Month
	var year = new Date().getFullYear(); //To get the Current Year
	var hours = new Date().getHours(); //To get the Current Hours
	var min = new Date().getMinutes(); //To get the Current Minutes
	var sec = new Date().getSeconds(); //To get the Current Seconds

	var tgl = year + '-' + month + '-' + date;
	var jam = hours + ':' + min + ':' + sec;


	async function kirimPesanan() {
		setloading(true);

		const formData = new FormData();

		formData.append('id_pelanggan', idPelanggan);
		formData.append('id_produk', idProduk);
		formData.append('kategori_produk', aktif);
		formData.append('jumlah', jumlah);
		formData.append('total_t', jumlah * hargadasar);
		formData.append('tanggal_t', tgl);
		formData.append('jam_t', jam);
		formData.append('alamat_antar', alamat);
		formData.append('lat_antar', lat);
		formData.append('lng_antar', lng);

		
		fetch(`${DATA_API}/pesanProduk`, {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			body: formData,
		})
		.then(response => response.json())
		.then(async data => {
			setloading(false)

			if (data.status == 200) {
				Alert.alert(`${data.status}`, `${data.message}`, [
					{ text: 'OK', onPress: () => navigation.replace('Pesanan'), },
				])
			}else{
				Alert.alert(`${data.status}`, `${data.message}`, [
					{ text: 'OK' },
				])
			}
			
		})
		.catch((error) => {
			setloading(false)
			Alert.alert(`405`, `${error}`, [
				{ text: 'OK' },
			])
		});
	}


useEffect(() => {
	ambilHargaDasar()

}, [])

function ambilHargaDasar() {
	if (title == 'GALON') {
		sethargadasar(6500)
	}
	if (title == 'DUS BOTOL') {
		setjenisbotol([
			{
				'id': 1,
				'jenis': "1500ml",
				'harga': 5000,
			},
			{
				'id': 2,
				'jenis': "600ml",
				'harga': 2500,
			},
			{
				'id': 3,
				'jenis': "330ml",
				'harga': 1500,
			},
		])
	}
	if (title == 'DUS GELAS') {
		sethargadasar(1500)
	}


}


function kirimData(x, i) {
	
	setaktif(x.jenis)
	sethargadasar(x.harga)
	
}

const numberFormat = (value) =>
	new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR'
	}).format(value);






const handleMarkerDrag = (e) => {
	setLocation({
		latitude: e.nativeEvent.coordinate.latitude,
		longitude: e.nativeEvent.coordinate.longitude,
	});
	setLatitude(e.nativeEvent.coordinate.latitude.toFixed(7))
	setLongitude(e.nativeEvent.coordinate.longitude.toFixed(7))
};

const handleMapClick = (e) => {
	setLocation({
		latitude: e.nativeEvent.coordinate.latitude,
		longitude: e.nativeEvent.coordinate.longitude,
	});

	setLatitude(e.nativeEvent.coordinate.latitude.toFixed(7))
	setLongitude(e.nativeEvent.coordinate.longitude.toFixed(7))
};

useEffect(() => {
	const ambilAlamat = async () => {
		if (lat != null && lng != null) {

			const response = await fetch(
				'https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lng + '&key=AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k',
			);
			const json = await response.json();
			setAlamat(json.results[0].formatted_address)
		} else {
			setAlamat(null)
		}
	}
	ambilAlamat()
},)

if (loading) {
	return (
		<AnimatedLoader
			visible={loading}
			overlayColor="rgba(255,255,255,0.75)"
			source={animLoading}
			className="w-[50px] h-[50px]"
			speed={1}
		>
			<Text>Doing something...</Text>
		</AnimatedLoader>
	);
}

return (
	<View className="bg-white flex-1">
		<StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent />
		<View className="flex flex-row items-center pt-9  bg-blue-600">
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				className="relative w-[57px] h-[57px] flex items-center justify-center"
			>
				<Icon name="arrow-left" size={24} color="white" />
			</TouchableOpacity>
			<Text className="text-white font-medium text-2xl ml-4">BUAT PESANAN {title}</Text>
		</View>
		<View className="p-6">
			<View className="mb-6">
				{
					title == 'DUS BOTOL' ? (
						<View>
							<Text className="text-slate-500 font-bold text-base mb-6">PILIH UKURAN</Text>
							<View className="">

								{
									jenisbotol.map((x, i) => {

										return (
											<TouchableOpacity
												key={i}
												className="w-full flex flex-row items-center  mb-3"
												onPress={() => kirimData(x, i)}
											>
												<View className={`w-[30px] h-[30px] border-2 ${aktif == x.jenis ? ('border-green-600') : ('border-slate-300')} rounded-md`}></View>
												<View className="flex flex-row items-center justify-between" style={{ width: width - 96 }}>
													<Text className={` ${aktif == x.jenis ? ('text-green-600 line-through') : ('text-slate-400')} font-bold text-base ml-6`}>{x.jenis}</Text>
													<Text className={` ${aktif == x.jenis ? ('text-green-600 line-through') : ('text-slate-400')} font-bold text-base ml-6`}>{numberFormat(x.harga)} / DUS</Text>
												</View>
											</TouchableOpacity>
										)
									})
								}

							</View>
						</View>
					) : null
				}
			</View>
			<View className="mb-6">
				<Text className="text-slate-500 font-bold text-base mb-6">JUMLAH</Text>
				<CounterInput
					onChange={(counter) => {
						setjumlah(counter)
					}}
					initial={1}
					horizontal={true}
					min={1}
					reverseCounterButtons={true}
					increaseButtonBackgroundColor={`#22c55e`}
					decreaseButtonBackgroundColor={`#ef4444`}
					className="p-0 m-0 h-[70px] w-[345px] flex items-center justify-between shadow-none rounded-lg bg-slate-200 px-6"
				/>
			</View>
			<View className="mb-6">
				<Text className="text-slate-500 font-bold text-base mb-6">Alamat Tujuan</Text>
				<TouchableOpacity
					onPress={() => setModalVisible(true)}

				>
					<Text className={`absolute text-slate-400 font-medium text-base bg-white left-10 px-3 z-10 ${alamatFocus === false && alamat == '' ? ('top-[15px]') : ('top-[-12px] text-blue-600')}`}>alamat</Text>
					<View className={`border-2 relative py-[24px]  rounded-md ${alamatFocus == false && alamat == '' ? ('border-slate-300') : ('border-blue-600')}`}>
						<Text className="pl-12 text-slate-500 font-bold text-base">{alamat}</Text>
					</View>
					<View className="absolute h-[49px] w-[49px] items-center justify-center z-50 left-0">
						<Icon name="map" size={20} color={`${alamatFocus == false && alamat == '' ? ('#9ca3af') : ('#2563eb')}`} />
					</View>
				</TouchableOpacity>
			</View>
		</View>


		<View className="absolute bottom-12 w-full px-6 py-4 flex flex-row items-center justify-between">
			<View className="flex items-start justify-center">
				<Text className="text-slate-500 font-bold text-base">TOTAL HARGA</Text>
				<Text className="text-blue-500 font-bold text-base">
					{

						jumlah == 1 ? numberFormat(hargadasar) : numberFormat(hargadasar * jumlah)
					}</Text>
			</View>
			<TouchableOpacity
				onPress={kirimPesanan}
				className="flex items-center justify-center px-6 py-4 bg-green-600 rounded-md"
			>
				<Text className="text-white font-medium text-base">KIRIM PESANAN</Text>
			</TouchableOpacity>
		</View>





		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}>
			<View className="flex-1">
				<StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent />
				<MapView
					className="flex-1"
					initialRegion={{
						latitude: -1.8468048,
						longitude: 109.9943111,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
					onPress={handleMapClick}
				>
					{location && (
						<Marker
							draggable
							coordinate={{
								latitude: location.latitude,
								longitude: location.longitude,
							}}
							onDragEnd={handleMarkerDrag}
						/>
					)}
				</MapView>
				{location && (
					<>
						<View className="bg-white bg-opacity-30 w-screen absolute z-30 top-0 p-4">
							<Text className="text-base text-slate-500 font-medium mb-3"> Alamat </Text>
							<Text className="text-sm text-slate-400 font-medium"> {alamat} </Text>
						</View>
						<View className="bg-transparent bg-opacity-30 w-screen absolute z-30 bottom-0 p-4">
							<TouchableOpacity
								className="bg-blue-600 flex items-center justify-center h-14 rounded"
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Text className="text-base font-medium text-white">Konfirmasi alamat</Text>
							</TouchableOpacity>
						</View>
					</>
				)}
			</View>
		</Modal>
	</View>
)
}

export default Pesan