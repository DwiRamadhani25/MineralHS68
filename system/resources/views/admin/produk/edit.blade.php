@extends('layouts.app')
@section('title', 'PRODUK')
@section('content')
<div class="row">
	<div class="col-12">
		<div>
			<h4 class="header-title mb-3">EDIT PRODUK</h4>
		</div>
	</div>
</div>
<!-- end row -->

<div class="row">
	<div class="col-12">
		<div class="card-box">
			<form action="{{ url('admin/produk/edit', $list->id) }}" method="post" enctype="multipart/form-data">
				@csrf
				<div class="row">
					<div class="col-md-3">
						<div class="form-group">
							<label for="">Nama Produk</label>
							<input type="text" name="nama_produk" value="{{ $list->nama_produk }}" class="form-control @error('nama_produk') is-invalid @enderror" placeholder="Nama produk ...">
							@error('nama_produk')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label for="">Stok Produk</label>
							<input type="number" name="stock_produk"  value="{{ $list->stock_produk }}" class="form-control @error('stock_produk') is-invalid @enderror" placeholder="Stok produk ...">
							@error('stock_produk')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label for="">Update Foto Produk</label>
							<input type="file" name="photo_produk" value="{{ old('photo_produk') }}" class="form-control @error('photo_produk') is-invalid @enderror" placeholder="Foto produk ...">
							@error('photo_produk')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label for="">Harga Produk</label>
							<input type="number" name="harga_produk" value="{{ $list->harga_produk }}" class="form-control @error('harga_produk') is-invalid @enderror" placeholder="Harga produk ...">
							@error('harga_produk')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>
					<div class="col-md-12">
						<div class="form-group">
							<label for="">Kategori Produk</label>
							<select name="kategori_produk" id="" class="form-control">
								<option value="">--- Pilih ---</option>
								<option value="-" @if ($list->kategori_produk == '-')
									selected
								@endif>-</option>
								<option value="Galon" @if ($list->kategori_produk == 'Galon')
									selected
								@endif>Galon</option>
								<option value="Gelas" @if ($list->kategori_produk == 'Gelas')
									selected
								@endif>Gelas</option>
								<option value="Botol" @if ($list->kategori_produk == 'Botol')
									selected
								@endif>Botol</option>
							</select>
							@error('deskripsi_produk')<div class="invalid-feedback">{{ $message }}</div>@enderror
						</div>
					</div>
					<div class="col-md-12">
						<div class="form-group">
							<label for="">Deskripsi Produk</label>
							<textarea name="deskripsi_produk" id="editor" class="form-control @error('deskripsi_produk') is-invalid @enderror" placeholder="Deskripsi produk ...">{{ $list->deskripsi_produk }}</textarea>
							@error('deskripsi_produk')<div class="invalid-feedback">{{ $message }}</div>@enderror
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