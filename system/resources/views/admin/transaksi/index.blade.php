@extends('layouts.app')
@section('title', 'TRANSAKSI')
@section('content')
    <style>
        .list-detail {
            display: flex;
            flex-direction: column;
            padding: 0;
            margin: 0;
            list-style: none
        }
    </style>
    <div class="row">
        <div class="col-12">
            <div>
                <h4 class="header-title mb-3">DATA TRANSAKSI</h4>
            </div>
        </div>
    </div>
    <!-- end row -->

    <div class="row">
        <div class="col-12">
            <div class="card-box">
                <div class="d-flex align-items center justify-content-end mb-5">
                    <a href="{{ url('admin/transaksi/add') }}" class="btn btn-success">Tambah data</a>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>
                                <center>No.</center>
                            </th>
                            <th>
                                <center>Pelanggan</center>
                            </th>
                            <th>
                                <center>Produk</center>
                            </th>
                            <th>
                                <center>Ukuran</center>
                            </th>
                            <th>
                                <center>Waktu</center>
                            </th>
                            <th>
                                <center>Jumlah</center>
                            </th>
                            <th>
                                <center>Total</center>
                            </th>
                            <th>
                                <center>Action</center>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($list as $transaksi)
                            <tr>
                                <td>
                                    <center>{{ $loop->iteration }}</center>
                                </td>
                                <td>
                                    <center>
                                        @if ($transaksi->pelanggan != null)
                                            {{ $transaksi->pelanggan->nama_p }}
                                        @endif

                                    </center>
                                </td>
                                <td>
                                    <center>{{ $transaksi->produk->nama_produk }}</center>
                                </td>
                                <td>
                                    <center>{{ $transaksi->kategori_produk }}</center>
                                </td>
                                <td>
                                    <center>{{ $transaksi->tanggal_t . ' , ' . $transaksi->jam_t }}</center>
                                </td>
                                <td>
                                    <center>{{ $transaksi->jumlah }}</center>
                                </td>
                                <td>
                                    <center>@rupiah($transaksi->total_t)</center>
                                </td>
                                <td>
                                    <center>
                                        <div class="btn-group">
                                            <a href="#detail{{ $transaksi->id }}" data-toggle="modal"
                                                class="btn btn-warning">Detail</a>
                                            <a href="{{ url('admin/transaksi/edit', $transaksi->id) }}"
                                                class="btn btn-primary">Edit</a>
                                            <a href="#hapus{{ $transaksi->id }}" data-toggle="modal"
                                                class="btn btn-danger">Hapus</a>
                                        </div>
                                    </center>
                                </td>
                            </tr>
                            {{-- Ini modal detail --}}
                            <div class="modal fade" id="hapus{{ $transaksi->id }}" tabindex="-1"
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <form action="{{ url('admin/transaksi/hapus', $transaksi->id) }}" method="post">
                                        @csrf
                                        <div class="modal-content">

                                            <div class="modal-body text-center">
                                                <i class="ti-alert"
                                                    style="font-size: 50px;color:red;margin-bottom: 50px !important"></i>
                                                <h5 class="modal-title" id="exampleModalLabel" style="color: red">YAKIN
                                                    INGIN MENGHAPUS DATA INI</h5>
                                                <p>Data yang telah dihapus tidak bisa dikembalikan lagi</p>
                                            </div>
                                            <div class="modal-footer d-flex items-center justify-content-center">
                                                <button type="button" class="btn btn-success"
                                                    data-dismiss="modal">BATAL</button>
                                                <button type="submit" class="btn btn-danger">YAKIN</button>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                            {{-- Akhir modal detail  --}}
                            {{-- Ini modal detail --}}
                            <div class="modal fade" id="detail{{ $transaksi->id }}" tabindex="-1"
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">DETAIL transaksi</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="d-flex align-items-center justify-content-center">
                                                        <img src="{{ url('public') }}/{{ $transaksi->produk->photo_produk }}"
                                                            alt="" style="width: 150px;height: 350px">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <ul class="list-detail">
                                                        <li class="header">PELANGGAN</li>
                                                        @if ($transaksi->pelanggan != null)
                                                            <li>
                                                                <span class="pull-left">Nama</span>
                                                                <span
                                                                    class="float-right">{{ $transaksi->pelanggan->nama_p }}</span>
                                                            </li>
                                                            <li>
                                                                <span class="pull-left">Telepon</span>
                                                                <span
                                                                    class="float-right">{{ $transaksi->pelanggan->tlp }}</span>
                                                            </li>
                                                            <li>
                                                                <span class="pull-left">Alamat</span>
                                                                <span
                                                                    class="float-right">{{ $transaksi->pelanggan->alamat_p }}</span>
                                                            </li>
                                                        @endif
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
