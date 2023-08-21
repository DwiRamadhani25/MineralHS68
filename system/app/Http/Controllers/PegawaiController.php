<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pegawai;

class PegawaiController extends Controller
{
    public function index(){
		$data['list'] = Pegawai::get();
        return view('admin.pegawai.index', $data);
    }
    public function add(){
        return view('admin.pegawai.add');
    }
    public function aksiTambah(Request $request){
		$pegawai = new Pegawai;
		$pegawai->nama = $request->nama;
		$pegawai->tlp = $request->tlp;
		$pegawai->alamat = $request->alamat;
		$pegawai->email = $request->email;
		$pegawai->password = bcrypt($request->password);
		$pegawai->handleUploadFoto();
		$simpan = $pegawai->save();
		if ($simpan == 1) {
            return redirect('admin/pegawai')->with('sucess', 'Data berhasil ditambahkan');
        }
        return back()->with('danger', 'Data gagal ditambahkan, Coba ulangi kembali !');
    }
    public function Edit(Pegawai $pegawai){
		$data['pegawai'] = $pegawai;
		return view('admin.pegawai.edit', $data);
    }
    public function aksiEdit(Request $request, Pegawai $pegawai){

		if ($request->foto == null) {
			if ($request->password == null) {
				$pegawai->nama = $request->nama;
				$pegawai->tlp = $request->tlp;
				$pegawai->alamat = $request->alamat;
				$pegawai->email = $request->email;
				$update = $pegawai->update();
				if ($update == 1) {
					return redirect('admin/pegawai')->with('sucess', 'Data berhasil diupdate');
				}
				return back()->with('danger', 'Data gagal diupdate, Coba ulangi kembali !');
			}else{
				$pegawai->nama = $request->nama;
				$pegawai->tlp = $request->tlp;
				$pegawai->alamat = $request->alamat;
				$pegawai->email = $request->email;
				$pegawai->password = bcrypt($request->password);
				$update = $pegawai->update();
				if ($update == 1) {
					return redirect('admin/pegawai')->with('sucess', 'Data berhasil diupdate');
				}
				return back()->with('danger', 'Data gagal diupdate, Coba ulangi kembali !');
			}
		}else{
			$hapusFotoLama = $pegawai->handleDeleteFoto();
			if ($hapusFotoLama) {
				if ($request->password == null) {
					$pegawai->nama = $request->nama;
					$pegawai->tlp = $request->tlp;
					$pegawai->alamat = $request->alamat;
					$pegawai->email = $request->email;
					$pegawai->handleUploadFoto();
					$update = $pegawai->update();
					if ($update == 1) {
						return redirect('admin/pegawai')->with('sucess', 'Data berhasil diupdate');
					}
					return back()->with('danger', 'Data gagal diupdate, Coba ulangi kembali !');
				}else{
					$pegawai->nama = $request->nama;
					$pegawai->tlp = $request->tlp;
					$pegawai->alamat = $request->alamat;
					$pegawai->email = $request->email;
					$pegawai->password = bcrypt($request->password);
					$pegawai->handleUploadFoto();
					$update = $pegawai->update();
					if ($update == 1) {
						return redirect('admin/pegawai')->with('sucess', 'Data berhasil diupdate');
					}
					return back()->with('danger', 'Data gagal diupdate, Coba ulangi kembali !');
				}
			} else {
				return back()->with('danger', 'Data gagal diupdate, Coba ulangi kembali !');
			}
			
			
		}

    }
    public function Hapus(Pegawai $pegawai){

		$hapusFotoLama = $pegawai->handleDeleteFoto();
			if ($hapusFotoLama) {
				$pegawai->delete();
				return redirect('admin/pegawai')->with('sucess', 'Data berhasil dihapus');
			} else {
				return back()->with('danger', 'Data gagal dihapus, Coba ulangi kembali !');
			}

    }
	
}
