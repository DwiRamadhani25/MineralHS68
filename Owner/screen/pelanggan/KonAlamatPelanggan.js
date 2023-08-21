import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


const KonAlamatPelanggan = ({navigation, route}) => {

	const [pelanggan, setPelanggan] = useState(route.params.dataAwal)


	const [location, setLocation] = useState(null);
	const [lat, setLatitude] = useState(null);
	const [lng, setLongitude] = useState(null);
	const [alamat, setAlamat] = useState(null);

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




	return (
		<View className="flex-1">
			{/* <View className="absolute z-50 bg-green-600 mt-[650px] ml-[300px] w-[57px] h-[57px] items-center justify-center rounded-full">
                <TouchableOpacity onPress={() => navigation.navigate("Autocomplete")}>
                    <Icon name="search" size={24} color="#FFF" />
                </TouchableOpacity>
            </View> */}
			<MapView
				className="w-screen h-full"
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
							onPress={() => {
								navigation.replace('PelangganUpdate', {
									newlat: lat,
									newlng: lng,
									alamatBaru: alamat,
									pelanggan
								});
							}}
						>
							<Text className="text-base font-medium text-white">Konfirmasi alamat</Text>
						</TouchableOpacity>
					</View>
				</>
			)}
		</View>
	);

}

export default KonAlamatPelanggan