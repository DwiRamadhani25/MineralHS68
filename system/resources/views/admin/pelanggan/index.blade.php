@extends('layouts.app')
@section('title', 'PEGAWAI')
@section('content')

<style>
	.list-detail{
		list-style: none;
		padding: 0
	}
	.list-detail li{
		margin: 12px 0;
		display: flex;
		align-items: center;
		justify-content: space-between
	}
	
	.list-detail li .title{
		font-size: 14px;
		font-weight: bold;
		color: #8b8b8b;
		
	}
	.li-pass{
		display: flex;
		flex-direction: column;
		align-items: flex-start !important;
		justify-content: flex-start !important
	}
</style>
    <div class="row">
        <div class="col-12">
            <div>
                <h4 class="header-title mb-3">DATA PELANGGAN</h4>
            </div>
        </div>
    </div>
    <!-- end row -->

    <div class="row">
        <div class="col-12">
            <div class="card-box">
                <div class="d-flex align-items center justify-content-end mb-5">
                    <a href="{{ url('admin/pelanggan/add') }}" class="btn btn-success">Tambah data</a>
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
                                <center>Telepon</center>
                            </th>
                            <th>
                                <center>Jenis Kelamin</center>
                            </th>
                            <th>
                                <center>Alamat</center>
                            </th>
                            <th>
                                <center>Action</center>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($list as $pelanggan)
                            <tr>
                                <td>
                                    <center>{{ $loop->iteration }}</center>
                                </td>
                                <td>
                                    <center>{{ $pelanggan->nama_p }}</center>
                                </td>
                                <td>
                                    <center>{{ $pelanggan->tlp }}</center>
                                </td>
                                <td>
                                    <center>{{ $pelanggan->jk_p }}</center>
                                </td>
                                <td>
                                    <center>{{ $pelanggan->alamat_p }}</center>
                                </td>
                              
                                <td>
                                    <center>
                                        <div class="btn-group">
                                            <a href="#detail{{ $pelanggan->id }}" data-toggle="modal"
                                                class="btn btn-warning">Detail</a>
                                            <a href="{{ url('admin/pegawai/edit', $pelanggan->id) }}"
                                                class="btn btn-primary">Edit</a>
												<a href="#hapus{{ $pelanggan->id }}" data-toggle="modal"
													class="btn btn-danger">Hapus</a>
                                        </div>
                                    </center>
                                </td>
                            </tr>
                            {{-- Ini modal hapus --}}
                            <div class="modal fade" id="hapus{{ $pelanggan->id }}" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <form action="{{ url('admin/pegawai/hapus', $pelanggan->id) }}" method="post">
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
                            {{-- Akhir modal hapus  --}}
                            {{-- Ini modal detail --}}
                            <div class="modal fade" id="detail{{ $pelanggan->id }}" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">DETAIL PEGAWAI</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
											<ul class="list-detail">
												<li class="d-flex align-items-center justify-content-center mb-5">
													<span colspan="5" rowspan="2">
														<img src="{{ url('public') }}/{{ $pelanggan->foto }}" alt="" style="width: 200px;height: 250px">
													</span>
												</li>
												<li>
													<span class="title">Nama</span>
													<span class="subtitle">{{ $pelanggan->nama }}</span>
												</li>
												<li>
													<span class="title">Telpon</span>
													<span class="subtitle">{{ $pelanggan->tlp }}</span>
												</li>
												<li>
													<span class="title">Email</span>
													<span class="subtitle">{{ $pelanggan->email }}</span>
												</li>
												<li class="li-pass">
													<span class="title">Alamat</span>
													<span class="subtitle">{{ $pelanggan->alamat }}</span>
												</li>
												
												<li class="li-pass">
													<span class="title">Password</span>
													<span class="subtitle">{{ $pelanggan->password }}</span>
												</li>
											</table>
                                           
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
