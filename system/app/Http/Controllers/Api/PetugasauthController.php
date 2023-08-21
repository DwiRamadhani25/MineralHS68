<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Pegawai;
use App\Models\Pelanggan;
use App\Models\Transaksi;

class PetugasauthController extends Controller
{
    function login(Request $request){

 
        if (Auth::guard('pegawai')->attempt(['email' => $request->email, 'password' => $request->password])) {

            $user = Auth::guard('pegawai')->user();
            return response()->json([
                'status' => 200,
                'message' => 'Login sukses',
                'data' => $user,
            ]);
        }
 
        return response()->json([
            'status' => 404,
            'message' => 'Login gagal',
            'data' => null,
        ]);
        
    }
   

    function ambilakun($pegawai){
        $data = Pegawai::find($pegawai);
        if ($data) {
            return response()->json([
                'status' => 200,
                'message' => 'Ok',
                'data' => $data,
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Error',
                'data' => null,
            ]);
        }
        
        
    }
    function updateFoto(Request $request, Pegawai $pegawai){

      
        $hapusFotoLama = $pegawai->handleDeleteFoto();
        if ($hapusFotoLama) {
            $pegawai->handleUploadFoto();
            $pegawai->update();
            return response()->json([
                'status' => 200,
                'message' => 'Foto berhasil diupdate',
                'data' => $pegawai,
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Terjadi kesalahan saat mengupdate foto',
                'data' => null,
            ]);
        }
        
        
    }

    function updateAkun(Request $r, Pegawai $pegawai){

        if ($r->password != null) {
            $pegawai->nama = $r->nama;
            $pegawai->tlp = $r->tlp;
            $pegawai->email = $r->email;
            $pegawai->alamat = $r->alamat;
            $pegawai->password = bcrypt($r->password);
            $pegawai->update();

            return response()->json([
                'status' => 200,
                'message' => 'Akun berhasil diupdate !',
                'data' => $pegawai,
            ]);
        }else{
			$pegawai->nama = $r->nama;
            $pegawai->tlp = $r->tlp;
            $pegawai->email = $r->email;
			$pegawai->alamat = $r->alamat;
            $pegawai->update();

            return response()->json([
                'status' => 200,
                'message' => 'Akun berhasil diupdate !',
                'data' => $pegawai,
            ]);
        }
          
    }


	function cekPesanan($pegawai){
		$data = Transaksi::where('id_pegawai', $pegawai)->where('status', 'Baru')->with('pelanggan')->with('produk')->get();
		if ($data->isEmpty()) {
			return response()->json([
				'status' => 200,
				'message' => 'Belum ada data untuk ditampilkan !',
				'data' => null,
			]);
		} else{
			return response()->json([
				'status' => 200,
				'message' => 'Data sudah ada untuk ditampilkan !',
				'data' => $data,
			]);
		}
		
	}

	function selesaikanPesanan(Request $request, Transaksi $transaksi){
		$transaksi->status = $request->status;
		$update = $transaksi->update();
		if ($update == 1) {
			return response()->json([
				'status' => 200,
				'message' => 'Data pesanan telah di selesaikan',
				'data' => null,
			]);
		} else{
			return response()->json([
				'status' => 404,
				'message' => 'Terjadi kesalahan saat menyelesaikan pesanan, coba ulangi kembali !',
				'data' => null,
			]);
		}
	}
	
}
