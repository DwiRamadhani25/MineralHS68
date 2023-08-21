

$(document).ready(function () {

	var latmap = $('#latmap');
	var lngmap = $('#lngmap');
	var alamatmap = $('#alamatmap');
	var alamat_antar = $('#alamat_antar');
	var lat_antar = $('#lat_antar');
	var lng_antar = $('#lng_antar');

	var latlng = new google.maps.LatLng(-1.8171565, 109.9618637);
	var map = new google.maps.Map(document.getElementById('map'), {
		center: latlng,
		zoom: 11,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	var marker = new google.maps.Marker({
		position: latlng,
		map: map,
		title: 'Set lat/lon values for this property',
		draggable: true
	});

	google.maps.event.addListener(marker, 'dragend', function (event) {
		var newlat = this.getPosition().lat().toFixed(7);
		var newlng = this.getPosition().lng().toFixed(7);
		latmap.val(newlat)
		lngmap.val(newlng)
		lat_antar.val(newlat)
		lng_antar.val(newlng)

		async function ambilAlamat() {
			const response = await fetch(
				'https://maps.googleapis.com/maps/api/geocode/json?address=' + newlat + ',' + newlng + '&key=AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k',
			);
			const json = await response.json();
			alamatmap.val(json.results[0].formatted_address)
			alamat_antar.val(json.results[0].formatted_address)
		}

		ambilAlamat()
	});
})