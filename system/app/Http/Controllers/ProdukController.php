<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produk;

class ProdukController extends Controller
{
    public function index(){
        $data['list'] = Produk::get();
        return view('admin.produk.index',  $data);
    }
    public function add(){
        return view('admin.produk.add');
    }

    function aksiTambah(Request $r){

        
        $r->validate([
            'nama_produk' => 'required|max:255|min:5',
            'stock_produk' => 'required',
            'photo_produk' => 'required',
            'deskripsi_produk' => 'required',
            'harga_produk' => 'required',
            'kategori_produk' => 'required',
        ]);

        $produk = new Produk;
        $produk->nama_produk = $r->nama_produk;
        $produk->stock_produk = $r->stock_produk;
        $produk->handleUploadFoto();
        $produk->deskripsi_produk = $r->deskripsi_produk;
        $produk->harga_produk = $r->harga_produk;
        $produk->kategori_produk = $r->kategori_produk;
        $simpan = $produk->save();
        if ($simpan == 1) {
            return redirect('admin/produk')->with('sucess', 'Data berhasil ditambahkan');
        }
        return back()->with('danger', 'Data gagal ditambahkan, Coba ulangi kembali !');
    }
    function Edit(Produk $produk){
        $data['list'] = $produk;


        return view('admin.produk.edit',  $data);
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
}
