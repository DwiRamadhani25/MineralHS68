@extends('layouts.app')
@section('title', 'PEGAWAIs')
@section('content')
<div class="row">
	<div class="col-12">
		<div>
			<h4 class="header-title mb-3">EDIT DATA PEGAWAI</h4>
		</div>
	</div>
</div>
<!-- end row -->

<div class="row">
	<div class="col-12">
		<div class="card-box">
			<form action="{{ url('admin/pegawai/edit', $pegawai->id) }}" method="post" enctype="multipart/form-data">
				@csrf
				<div class="row">
					<div class="col-md-4">
						<div class="form-group">
							<label for="">Nama pegawai</label>
							<input type="text" name="nama" value="{{ $pegawai->nama }}" class="form-control @error('nama') is-invalid @enderror" placeholder="Nama pegawai ...">
							@error('nama')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label for="">Telepon</label>
							<input type="text" name="tlp" value="{{ $pegawai->tlp }}" class="form-control @error('tlp') is-invalid @enderror" placeholder="tlp pegawai ...">
							@error('tlp')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label for="">Alamat</label>
							<input type="text" name="alamat" value="{{ $pegawai->alamat }}" class="form-control @error('alamat') is-invalid @enderror" placeholder="alamat pegawai ...">
							@error('alamat')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label for="">Email</label>
							<input type="email" name="email" value="{{ $pegawai->email }}" class="form-control @error('email') is-invalid @enderror" placeholder="email pegawai ...">
							@error('email')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label for="">password</label>
							<input type="text" name="password"  class="form-control @error('password') is-invalid @enderror" placeholder="password pegawai ...">
							@error('password')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label for="">Foto</label>
							<input type="file" name="foto"  class="form-control @error('foto') is-invalid @enderror" placeholder="foto pegawai ...">
							@error('foto')<div class="invalid-feedback">{{ $message }}</div>@enderror
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



@endsection