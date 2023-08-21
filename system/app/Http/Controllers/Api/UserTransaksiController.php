<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Produk;
use App\Models\Pelanggan;
use App\Models\Transaksi;


class UserTransaksiController extends Controller
{
    function semuaTransaksi($id){
        $pesanan = $data['list'] = Transaksi::with('pelanggan')->with('produk')->with('pegawai')->where('id_pelanggan', $id)->get();
        if (count($pesanan) != 0) {
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' => $pesanan,
            ]);
        }
		return response()->json([
			'status' => 404,
			'message' => 'Belum ada data untuk ditampilkan',
			'data' => null,
		]);
    }
    function baruTransaksi($id){
        $pesanan = $data['list'] = Transaksi::with('pelanggan')->with('produk')->with('pegawai')->where('id_pelanggan', $id)->where('status', 'Baru')->get();
        if (count($pesanan) != 0) {
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' => $pesanan,
            ]);
        }
		return response()->json([
			'status' => 404,
			'message' => 'Belum ada data untuk ditampilkan',
			'data' => null,
		]);
    }
    function detailTransaksi($id){
        $pesanan = $data['list'] = Transaksi::with('pelanggan')->with('produk')->with('pegawai')->where('id', $id)->get();
        if (count($pesanan) != 0) {
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' => $pesanan,
            ]);
        }
		return response()->json([
			'status' => 404,
			'message' => 'Belum ada data untuk ditampilkan',
			'data' => null,
		]);
    }
	function pesanProduk(Request $r){

        

        $transaksi = new Transaksi;
        $transaksi->id_pegawai = 0;
        $transaksi->id_pelanggan = $r->id_pelanggan;
        $transaksi->id_produk = $r->id_produk;
        $transaksi->kategori_produk = $r->kategori_produk;
        $transaksi->jumlah = $r->jumlah;
        $transaksi->total_t = $r->total_t;
        $transaksi->tanggal_t = $r->tanggal_t;
        $transaksi->jam_t = $r->jam_t;
        $transaksi->alamat_antar = $r->alamat_antar;
        $transaksi->lat_antar = $r->lat_antar;
        $transaksi->lng_antar = $r->lng_antar;
        $transaksi->status = "Baru";
        $simpan = $transaksi->save();
        if ($simpan == 1) {
            return response()->json([
                'status' => 200,
                'message' => 'Pesanan berhasil dikirim !',
                'data' => $simpan,
            ]);
        }
		return response()->json([
			'status' => 404,
			'message' => 'Terjadi kesalahan saat melakukan pesanan, coba ulangi kembali',
			'data' => null,
		]);
    }

    function batalTransaksi(Transaksi $id){
        $pesanan = $id;
        $pesanan->status = 'Batal';
        $cek = $pesanan->update();

        if ($cek == 1) {
            return response()->json([
                'status' => 200,
                'message' => 'Pesanan berhasil dibatalkan',
                'data' => $pesanan,
            ]);  
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Pesanan gagal dibatalkan, coba ulangi kembali',
                'data' => null,
            ]);
        }
		
    }

    function registrasi(Request $r){

      
        $pelanggan = new Pelanggan;
        $pelanggan->nama_p = $r->nama_p;
        $pelanggan->tlp = $r->tlp;
        $pelanggan->jk_p = $r->jk_p;
        $pelanggan->alamat_p = $r->alamat_p;
        $pelanggan->lat_p = $r->lat_p;
        $pelanggan->lng_p = $r->lng_p;
        $pelanggan->email = $r->email;
        $pelanggan->password = bcrypt($r->password);
        $pelanggan->handleUploadFoto();
        $simpan = $pelanggan->save();

        if ($simpan == 1) {
            return response()->json([
                'status' => 200,
                'message' => 'Registrasi berhasil, silahkan login !',
                'data' => $pelanggan,
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Terjadi kesalahan, coba ulangi kembali',
                'data' => null,
            ]);
        }
    }
   
}
