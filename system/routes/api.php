<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// Pelanggan
use App\Http\Controllers\Api\UserauthController;
use App\Http\Controllers\Api\UserTransaksiController;
//Petugas
use App\Http\Controllers\Api\PetugasauthController;


// Pelanggan
Route::prefix('pelanggan')->group(function(){
    Route::controller(UserauthController::class)->group(function(){
        Route::post('/registrasi','registrasi');
        Route::get('/ambilData','ambilData');
        Route::post('/login','login');
        Route::get('/ambilUser/{pelanggan}','ambilUser');
        Route::post('/updateFoto/{pelanggan}','updateFoto');
        Route::post('/updateAkun/{pelanggan}','updateAkun');
       
    });
    Route::controller(UserTransaksiController::class)->group(function(){
        Route::post('/pesanProduk','pesanProduk');
        Route::get('/semuaTransaksi/{id}','semuaTransaksi');
        Route::get('/detailTransaksi/{id}','detailTransaksi');
        Route::get('/batalTransaksi/{id}','batalTransaksi');
        Route::get('/baruTransaksi/{id}','baruTransaksi');
       
    });
    
});

// Petugas
Route::prefix('petugas')->group(function(){
    Route::controller(PetugasauthController::class)->group(function(){
        Route::post('/login','login');
        Route::get('/ambilakun/{pegawai}','ambilakun');
        Route::post('/updateFoto/{pegawai}','updateFoto');
        Route::post('/updateAkun/{pegawai}','updateAkun');

        //Olah data pesanan
        Route::get('/cekPesanan/{pegawai}','cekPesanan');
        Route::post('/selesaikanPesanan/{transaksi}','selesaikanPesanan');
       
    });
    
    
});


