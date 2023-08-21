@extends('layouts.app')
@section('title', 'PRODUK')
@section('content')
    <div class="row">
        <div class="col-12">
            <div>
                <h4 class="header-title mb-3">DATA PRODUK</h4>
            </div>
        </div>
    </div>
    <!-- end row -->

    <div class="row">
        <div class="col-12">
            <div class="card-box">
                <div class="d-flex align-items center justify-content-end mb-5">
                    <a href="{{ url('admin/produk/add') }}" class="btn btn-success">Tambah data</a>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>
                                <center>No.</center>
                            </th>
                            <th>
                                <center>Nama</center>
                            </th>
                            <th>
                                <center>Kategori</center>
                            </th>
                            <th>
                                <center>Stok</center>
                            </th>
                            <th>
                                <center>Harga</center>
                            </th>
                            <th>
                                <center>Action</center>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($list as $produk)
                            <tr>
                                <td>
                                    <center>{{ $loop->iteration }}</center>
                                </td>
                                <td>
                                    <center>{{ $produk->nama_produk }}</center>
                                </td>
                                <td>
                                    <center>{{ $produk->kategori_produk }}</center>
                                </td>
                                <td>
                                    <center>{{ $produk->stock_produk }}</center>
                                </td>
                                <td>
                                    <center>@rupiah($produk->harga_produk)</center>
                                </td>
                                <td>
                                    <center>
                                        <div class="btn-group">
                                            <a href="#detail{{ $produk->id }}" data-toggle="modal"
                                                class="btn btn-warning">Detail</a>
                                            <a href="{{ url('admin/produk/edit', $produk->id) }}"
                                                class="btn btn-primary">Edit</a>
												<a href="#hapus{{ $produk->id }}" data-toggle="modal"
													class="btn btn-danger">Hapus</a>
                                        </div>
                                    </center>
                                </td>
                            </tr>
                            {{-- Ini modal detail --}}
                            <div class="modal fade" id="hapus{{ $produk->id }}" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <form action="{{ url('admin/produk/hapus', $produk->id) }}" method="post">
										@csrf
										<div class="modal-content">
                                       
											<div class="modal-body text-center">
												<i class="ti-alert" style="font-size: 50px;color:red;margin-bottom: 50px !important"></i>
												<h5 class="modal-title" id="exampleModalLabel" style="color: red">YAKIN INGIN MENGHAPUS DATA INI</h5>
												<p>Data yang telah dihapus tidak bisa dikembalikan lagi</p>
											</div>
											<div class="modal-footer d-flex items-center justify-content-center">
												<button type="button" class="btn btn-success" data-dismiss="modal">BATAL</button>
													<button type="submit" class="btn btn-danger">YAKIN</button>
											  </div>
										   
										</div>
									</form>
                                </div>
                            </div>
                            {{-- Akhir modal detail  --}}
                            {{-- Ini modal detail --}}
                            <div class="modal fade" id="detail{{ $produk->id }}" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">DETAIL PRODUK</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                           <div class="row">
											<div class="col-md-12">
												<div class="d-flex align-items-center justify-content-center">
													<img src="{{ url('public') }}/{{ $produk->photo_produk }}" alt="" style="width: 250px;height: 350px">
												</div>
											</div>
											<div class="col-md-12">
												<ul>
													<li>
														<span class="pull-left">Nama Produk</span>
														<span class="float-right">{{ $produk->nama_produk }}</span>
													</li>
													<li>
														<span class="pull-left">Kategori Produk</span>
														<span class="float-right">{{ $produk->kategori_produk }}</span>
													</li>
													<li>
														<span class="pull-left">Stock Produk</span>
														<span class="float-right">{{ $produk->stock_produk }}</span>
													</li>
													
													<li>
														<span class="pull-left">Harga Produk</span>
														<span class="float-right">@rupiah($produk->harga_produk)</span>
													</li>
													<li>
														<span class="pull-left">Deskripsi Produk</span>
														<span>{!! $produk->deskripsi_produk !!}</span>
													</li>
												</ul>
											</div>
										   </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                            {{-- Akhir modal detail  --}}
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!--end row -->



@endsection
