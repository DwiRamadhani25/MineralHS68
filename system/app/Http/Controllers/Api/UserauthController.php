<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Pelanggan;

class UserauthController extends Controller
{
    function login(Request $request){

 
        if (Auth::guard('pelanggan')->attempt(['email' => $request->email, 'password' => $request->password])) {

            $user = Auth::guard('pelanggan')->user();
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

    function ambilUser($pelanggan){
        $data = Pelanggan::find($pelanggan);
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
    function updateFoto(Request $request, Pelanggan $pelanggan){

      
        $hapusFotoLama = $pelanggan->handleDeleteFoto();
        if ($hapusFotoLama) {
            $pelanggan->handleUploadFoto();
            $pelanggan->update();
            return response()->json([
                'status' => 200,
                'message' => 'Foto berhasil diupdate',
                'data' => $pelanggan,
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Terjadi kesalahan saat mengupdate foto',
                'data' => null,
            ]);
        }
        
        
    }

    function updateAkun(Request $r, Pelanggan $pelanggan){

        if ($r->password != null) {
            $pelanggan->nama_p = $r->nama_p;
            $pelanggan->tlp = $r->tlp;
            $pelanggan->email = $r->email;
            $pelanggan->password = bcrypt($r->password);
            $pelanggan->update();

            return response()->json([
                'status' => 200,
                'message' => 'Akun berhasil diupdate !',
                'data' => $pelanggan,
            ]);
        }else{
            $pelanggan->nama_p = $r->nama_p;
            $pelanggan->tlp = $r->tlp;;
            $pelanggan->email = $r->email;
            $pelanggan->update();

            return response()->json([
                'status' => 200,
                'message' => 'Akun berhasil diupdate !',
                'data' => $pelanggan,
            ]);
        }
          
    }
}
