<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pelanggan;

class PelangganController extends Controller
{
    public function index(){
		$data['list'] = Pelanggan::get();
        return view('admin.pelanggan.index', $data);
    }
    public function add(){
        return view('admin.pelanggan.add');
    }
    public function aksiTambah(Request $request){
		$pelanggan = new Pelanggan;
		$pelanggan->nama_p = $request->nama_p;
		$pelanggan->tlp = $request->tlp;
		$pelanggan->jk_p = $request->jk_p;
		$pelanggan->alamat_p = $request->alamat_p;
		$pelanggan->lat_p = $request->lat_p;
		$pelanggan->lng_p = $request->lng_p;
		$pelanggan->email = $request->email;
		$pelanggan->password = bcrypt($request->password);
		$pelanggan->handleUploadFoto();
		$simpan = $pelanggan->save();
		if ($simpan == 1) {
            return redirect('admin/pelanggan')->with('sucess', 'Data berhasil ditambahkan');
        }
        return back()->with('danger', 'Data gagal ditambahkan, Coba ulangi kembali !');
    }
    public function Edit(Pelanggan $pelanggan){
		$data['pelanggan'] = $pelanggan;
		return view('admin.pelanggan.edit', $data);
    }
    public function aksiEdit(Request $request, Pelanggan $pelanggan){

		if ($request->foto == null) {
			if ($request->password == null) {
				$pelanggan->nama = $request->nama;
				$pelanggan->tlp = $request->tlp;
				$pelanggan->alamat = $request->alamat;
				$pelanggan->email = $request->email;
				$update = $pelanggan->update();
				if ($update == 1) {
					return redirect('admin/pelanggan')->with('sucess', 'Data berhasil diupdate');
				}
				return back()->with('danger', 'Data gagal diupdate, Coba ulangi kembali !');
			}else{
				$pelanggan->nama = $request->nama;
				$pelanggan->tlp = $request->tlp;
				$pelanggan->alamat = $request->alamat;
				$pelanggan->email = $request->email;
				$pelanggan->password = bcrypt($request->password);
				$update = $pelanggan->update();
				if ($update == 1) {
					return redirect('admin/pelanggan')->with('sucess', 'Data berhasil diupdate');
				}
				return back()->with('danger', 'Data gagal diupdate, Coba ulangi kembali !');
			}
		}else{
			$hapusFotoLama = $pelanggan->handleDeleteFoto();
			if ($hapusFotoLama) {
				if ($request->password == null) {
					$pelanggan->nama = $request->nama;
					$pelanggan->tlp = $request->tlp;
					$pelanggan->alamat = $request->alamat;
					$pelanggan->email = $request->email;
					$pelanggan->handleUploadFoto();
					$update = $pelanggan->update();
					if ($update == 1) {
						return redirect('admin/pelanggan')->with('sucess', 'Data berhasil diupdate');
					}
					return back()->with('danger', 'Data gagal diupdate, Coba ulangi kembali !');
				}else{
					$pelanggan->nama = $request->nama;
					$pelanggan->tlp = $request->tlp;
					$pelanggan->alamat = $request->alamat;
					$pelanggan->email = $request->email;
					$pelanggan->password = bcrypt($request->password);
					$pelanggan->handleUploadFoto();
					$update = $pelanggan->update();
					if ($update == 1) {
						return redirect('admin/pelanggan')->with('sucess', 'Data berhasil diupdate');
					}
					return back()->with('danger', 'Data gagal diupdate, Coba ulangi kembali !');
				}
			} else {
				return back()->with('danger', 'Data gagal diupdate, Coba ulangi kembali !');
			}
			
			
		}

    }
    public function Hapus(Pelanggan $pelanggan){

		$hapusFotoLama = $pelanggan->handleDeleteFoto();
			if ($hapusFotoLama) {
				$pelanggan->delete();
				return redirect('admin/pelanggan')->with('sucess', 'Data berhasil dihapus');
			} else {
				return back()->with('danger', 'Data gagal dihapus, Coba ulangi kembali !');
			}

    }
	
}
