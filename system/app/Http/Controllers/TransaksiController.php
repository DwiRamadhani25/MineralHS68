<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


use App\Models\Produk;
use App\Models\Pelanggan;
use App\Models\Pegawai;
use App\Models\Transaksi;


class TransaksiController extends Controller
{
    public function index(){
        $data['list'] = Transaksi::with('pelanggan')->with('produk')->get();
   
        return view('admin.transaksi.index',  $data);
    }
    public function add(){
		$data['pelanggan'] = Pelanggan::get();
		$data['pegawai'] = Pegawai::get();
        $data['produk'] = Produk::groupBy('nama_produk')->get();
		
        return view('admin.transaksi.add', $data);
    }

    function aksiTambah(Request $r){

        
        $r->validate([
            'id_pegawai' => 'required',
            'id_pelanggan' => 'required',
            'id_produk' => 'required',
            'jumlah' => 'required',
            'total_t' => 'required',
            'tanggal_t' => 'required',
            'jam_t' => 'required',
            'alamat_antar' => 'required',
            'lat_antar' => 'required',
            'lng_antar' => 'required',
        ]);

        

        $transaksi = new Transaksi;
        $transaksi->id_pegawai = $r->id_pegawai;
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
            return redirect('admin/transaksi')->with('success', 'Data berhasil ditambahkan');
        }
        return back()->with('danger', 'Data gagal ditambahkan, Coba ulangi kembali !');
    }
    function edit(Produk $produk){
        $data['list'] = $produk;
        $data['pegawai'] = Pegawai::all();
        $data['pelanggan'] = Pelanggan::all();
        $data['produk'] = Produk::all();


        return view('admin.transaksi.edit',  $data);
    }
    function aksiEdit(Produk $produk, Request $r){

        if ($r->photo_produk == null) {
            $produk->nama_produk = $r->nama_produk;
            $produk->stock_produk = $r->stock_produk;
            $produk->deskripsi_produk = $r->deskripsi_produk;
            $produk->harga_produk = $r->harga_produk;
            $produk->kategori_produk = $r->kategori_produk;
            $simpan = $produk->update();
            if ($simpan == 1) {
                return redirect('admin/produk')->with('sucess', 'Data berhasil diupdate');
            }
            return back()->with('danger', 'Data gagal diupdate, Coba ulangi kembali !');
        }else{
            $hapusFoto = $produk->handleDeleteFoto();

            if ($hapusFoto) {
                $produk->nama_produk = $r->nama_produk;
                $produk->stock_produk = $r->stock_produk;
                $produk->handleUploadFoto();
                $produk->deskripsi_produk = $r->deskripsi_produk;
                $produk->harga_produk = $r->harga_produk;
                $produk->kategori_produk = $r->kategori_produk;
                $simpan = $produk->update();
                if ($simpan == 1) {
                    return redirect('admin/produk')->with('sucess', 'Data berhasil diupdate');
                }
                return back()->with('danger', 'Data gagal diupdate, Coba ulangi kembali !');
            }
        }


       
    }
    function Hapus(Produk $produk){

        $hapusFoto = $produk->handleDeleteFoto();

        if ($hapusFoto) {
            $simpan = $produk->delete();
            if ($simpan == 1) {
                return redirect('admin/produk')->with('sucess', 'Data berhasil dihapus');
            }
            return back()->with('danger', 'Data gagal dihapus, Coba ulangi kembali !');
        }
       
    }

	public function ambilData(Produk $produk){
		
		$data = DB::table('produk')
                ->where('nama_produk', '=', $produk->nama_produk)
                ->get();
		return response()->json([
			'status' => 200,
			'message' => 'Success',
			'data' => $data,
		]);
		
     
    }
	public function ambilKategori($produk){
		
		$data = DB::table('produk')
                ->where('kategori_produk', '=', $produk)
                ->get();
		return response()->json([
			'status' => 200,
			'message' => 'Success',
			'data' =>  $data,
		]);
		
      
    }
}
