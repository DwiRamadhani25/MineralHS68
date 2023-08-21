@extends('layouts.app')
@section('title', 'PELANGGAN')
@section('content')
    <div class="row">
        <div class="col-12">
            <div>
                <h4 class="header-title mb-3">TAMBAH DATA PELANGGAN</h4>
            </div>
        </div>
    </div>
    <!-- end row -->

    <div class="row">
        <div class="col-12">
            <div class="card-box">
                <form action="{{ url('admin/pelanggan/add') }}" method="post" enctype="multipart/form-data">
                    @csrf
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="">Nama</label>
                                <input type="text" name="nama_p" value="{{ old('nama_p') }}"
                                    class="form-control @error('nama_p') is-invalid @enderror"
                                    placeholder="nama ...">
                                @error('nama_p')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="">Telepon</label>
                                <input type="text" name="tlp" value="{{ old('tlp') }}"
                                    class="form-control @error('tlp') is-invalid @enderror" placeholder="tlp ...">
                                @error('tlp')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="">Jenis Kelamin</label>
                                <select name="jk_p" class="form-control">
                                    <option value="">--- Pilih ---</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                                @error('jk_p')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
						<div class="col-md-4">
                            <div class="form-group">
                                <label for="">Email</label>
                                <input type="email" name="email" value="{{ old('email') }}"
                                    class="form-control @error('email') is-invalid @enderror" placeholder="email ...">
                                @error('email')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
						<div class="col-md-4">
                            <div class="form-group">
                                <label for="">Password</label>
                                <input type="text" name="password" value="{{ old('password') }}"
                                    class="form-control @error('password') is-invalid @enderror" placeholder="password ...">
                                @error('password')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
						<div class="col-md-4">
                            <div class="form-group">
                                <label for="">Foto</label>
                                <input type="file" name="photo" value="{{ old('photo') }}"
                                    class="form-control @error('photo') is-invalid @enderror" placeholder="photo ...">
                                @error('photo')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group" data-toggle="modal" data-target="#openMaps">
                                <label for="">Alamat</label>
                                <input type="text" name="alamat_p" id="alamat_p" value="{{ old('alamat_p') }}"
                                    class="form-control @error('alamat_p') is-invalid @enderror" placeholder="Alamat ..."
                                    readonly>
                                <input type="hidden" name="lat_p" id="lat_p" class="form-control"
                                    placeholder="Latitude ..." readonly>
                                <input type="hidden" name="lng_p" id="lng_p" class="form-control"
                                    placeholder="Latitude ..." readonly>
                                @error('alamat_p')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
						
                        <div class="col-md-12">
                            <div class="d-flex align-items-center justify-content-end">
                                <button class="btn btn-primary">SIMPAN</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!--end row -->
    <!-- Modal -->
    <div class="modal fade" id="openMaps" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="row px-3 py-3">
                    <div class="col-md-3">
                        <input type="text" id="latmap" class="form-control" placeholder="Latitude ..." readonly>
                    </div>
                    <div class="col-md-3">
                        <input type="text" id="lngmap" class="form-control" placeholder="Latitude ..." readonly>
                    </div>
                    <div class="col-md-6">
                        <input type="text" id="alamatmap" class="form-control" placeholder="Alamat ..." readonly>

                    </div>
                </div>
                <div class="modal-body">
                    <div class="map" id="map" style="width: 100%;height: 400px"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">KONFIRMASI ALAMAT</button>
                </div>
            </div>
        </div>
    </div>

    <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k&callback=initMap&v=weekly"
        defer></script>
    <script src="{{ url('public') }}/assets/js/jquery.min.js"></script>

    <script>
		$(document).ready(function () {

var latmap = $('#latmap');
var lngmap = $('#lngmap');
var alamatmap = $('#alamatmap');
var alamat_p = $('#alamat_p');
var lat_p = $('#lat_p');
var lng_p = $('#lng_p');

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
	lat_p.val(newlat)
	lng_p.val(newlng)

	async function ambilAlamat() {
		const response = await fetch(
			'https://maps.googleapis.com/maps/api/geocode/json?address=' + newlat + ',' + newlng + '&key=AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k',
		);
		const json = await response.json();
		alamatmap.val(json.results[0].formatted_address)
		alamat_p.val(json.results[0].formatted_address)
	}

	ambilAlamat()
});
})
	</script>

@endsection
