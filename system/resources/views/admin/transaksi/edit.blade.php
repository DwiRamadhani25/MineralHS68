@extends('layouts.app')
@section('title', 'TRANSAKSI')
@section('content')
<style>
	.hilangkan{
		display: none !important;
		opacity: 0 !important;
	}
</style>
<div class="row">
	<div class="col-12">
		<div>
			<h4 class="header-title mb-3">EDIT DATA TRANSAKSI</h4>
		</div>
	</div>
</div>
<!-- end row -->
{{ $list }}
<div class="row">
	<div class="col-12">
		<div class="card-box">
			<form action="{{ url('admin/transaksi/add') }}" method="post" enctype="multipart/form-data">
				@csrf
				<div class="row">
					<div class="col-md-4">
						<div class="form-group">
							<label for="">Pegawai pengantar</label>
							<select name="id_pegawai" id="" class="form-control @error('id_pegawai') is-invalid @enderror">
								<option value="">--- Pilih ---</option>
								@foreach ($pegawai as $peg)
									<option value="{{ $peg->id }}" >{{ $peg->nama }}</option>
								@endforeach
							</select>
							@error('id_pegawai')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label for="">Pelanggan</label>
							<select name="id_pelanggan" id="" class="form-control @error('id_pelanggan') is-invalid @enderror">
								<option value="">--- Pilih ---</option>
								@foreach ($pelanggan as $p)
									<option value="{{ $p->id }}">{{ $p->nama_p }}</option>
								@endforeach
							</select>
							@error('id_pelanggan')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label for="">Produk</label>
							<select name="id_produk" id="pilih" class="form-control @error('id_produk') is-invalid @enderror">
								<option value="">--- Pilih ---</option>
								@foreach ($produk as $prod)
									<option value="{{ $prod->id }}">{{ $prod->nama_produk }}</option>
								@endforeach
							</select>
							@error('id_produk')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label for="">Kategori Produk</label>
							<select name="kategori_produk" id="tampil" class="form-control @error('kategori_produk') is-invalid @enderror">
					
							</select>
							@error('kategori_produk')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label for="">Jumlah</label>
							<input type="number" name="jumlah" id="jumlah" value="{{ old('jumlah') }}" class="form-control @error('jumlah') is-invalid @enderror" placeholder="Jumlah ...">
							@error('jumlah')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label for="">Harga</label>
							<input type="text" id="harga" value="{{ old('photo_transaksi') }}" class="form-control @error('photo_transaksi') is-invalid @enderror" placeholder="Harga ..." readonly>
							@error('photo_transaksi')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>
					
					<div class="col-md-4">
						<div class="form-group">
							<label for="">Total</label>
							<input type="text" name="total_t" id="total" value="{{ old('total') }}" class="form-control @error('total') is-invalid @enderror" placeholder="Total ..." readonly>
							@error('total')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label for="">Tanggal</label>
							<input type="date" name="tanggal_t" value="{{ old('tanggal_t') }}" class="form-control @error('tanggal_t') is-invalid @enderror" placeholder="Tanggal ..." >
							@error('tanggal_t')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label for="">Jam</label>
							<input type="time" name="jam_t" value="{{ old('jam_t') }}" class="form-control @error('jam_t') is-invalid @enderror" placeholder="Jam ..." >
							@error('jam_t')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>
					<div class="col-md-12">
						<div class="form-group" data-toggle="modal" data-target="#openMaps">
							<label for="">Alamat pengantaran</label>
							<input type="text" name="alamat_antar" id="alamat_antar" value="{{ old('alamat_antar') }}" class="form-control @error('alamat_antar') is-invalid @enderror" placeholder="Alamat ..." readonly>
							<input type="hidden" name="lat_antar" id="lat_antar" class="form-control" placeholder="Latitude ..." readonly>
							<input type="hidden" name="lng_antar" id="lng_antar" class="form-control" placeholder="Latitude ..." readonly>
							@error('alamat_antar')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>

					<input type="hidden" id="stok">
					
					<div class="col-md-12">
						<div class="d-flex align-items-center justify-content-end">
							<button class="btn btn-primary readonly" id="btn-simpan">SIMPAN</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<!-- Modal -->
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
<!--end row -->
<script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k&callback=initMap&v=weekly"
      defer
    ></script>
<script src="{{ url('public') }}/assets/js/jquery.min.js"></script>

<script src="{{ url('public') }}/assets/js/tambahTransaksi.js"></script>
<script>
	$('#pilih').on('change', function(){
	const id = $('#pilih').val();

	
	fetch(`{{ url('admin/transaksi/ambilData/${id}') }}`)
    .then(response => response.json())
    .then(data => {
		if (data.status === 200) {

			var dx = data.data;

			
			var isiData = '';
	
			for (const datax of dx) {
				if (datax.nama_produk != 'BOTOL') {
					$('#harga').val(datax.harga_produk)
					$('#stok').val(datax.stock_produk)
				}else{
					isiData +=`
					<option value="${datax.kategori_produk}">${datax.kategori_produk}</option>
					
				`;
				$('#stok').val(datax.stock_produk)
				}
				
			}
			$('#tampil').html(isiData)
		}
    })
    .catch(error => {
      console.error(error);
    });

	
	
  });

  $('#tampil').on('change', function(){
	const id = $('#tampil').val();
	
	fetch(`{{ url('admin/transaksi/ambilKategori/${id}') }}`)
    .then(response => response.json())
    .then(data => {
		if (data.status === 200) {

			var dx = data.data;
			var isiData = '';
			var stok = '';
			for (const datax of dx) {
				
				isiData =  datax.harga_produk;
				stok =  datax.stock_produk;
			}
			$('#harga').val(isiData)

			$('#stok').val(stok)
			
		}
    })
    .catch(error => {
      console.error(error);
    });
});

$("#jumlah").keyup(function(){
	var angka1  = parseInt($("#harga").val());
	var angka2  = parseInt($("#jumlah").val());
	var untukStock  = parseInt($("#stok").val());
	var hasil = angka1 * angka2;
	$("#total").val(hasil);
	

	if (untukStock < angka2) {
		alert('Maaf stok yang anda masukan melebihi jumlah stok yang ada !')
		$('#btn-simpan').addClass("hilangkan");
	}else{
		$('#btn-simpan').removeClass("hilangkan");
	}


});
</script>
@endsection