<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TransaksiController;
use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\PelangganController;

Route::get('/login', [AuthController::class, 'login']);

Route::prefix('admin')->group(function(){
    Route::controller(DashboardController::class)->group(function(){
        Route::get('/dashboard','index');
       
    });
    Route::controller(ProdukController::class)->group(function(){
        Route::get('/produk','index');
        Route::get('/produk/add','add');
        Route::post('/produk/add','aksiTambah');
        Route::get('/produk/edit/{produk}','Edit');
        Route::post('/produk/edit/{produk}','aksiEdit');
        Route::post('/produk/hapus/{produk}','Hapus');
       
    });
    Route::controller(PegawaiController::class)->group(function(){
        Route::get('/pegawai','index');
        Route::get('/pegawai/add','add');
        Route::post('/pegawai/add','aksiTambah');
        Route::get('/pegawai/edit/{pegawai}','Edit');
        Route::post('/pegawai/edit/{pegawai}','aksiEdit');
        Route::post('/pegawai/hapus/{pegawai}','Hapus');
       
    });
    Route::controller(PelangganController::class)->group(function(){
        Route::get('/pelanggan','index');
        Route::get('/pelanggan/add','add');
        Route::post('/pelanggan/add','aksiTambah');
        Route::get('/pelanggan/edit/{pelanggan}','Edit');
        Route::post('/pelanggan/edit/{pelanggan}','aksiEdit');
        Route::post('/pelanggan/hapus/{pelanggan}','Hapus');
       
    });
    Route::controller(TransaksiController::class)->group(function(){
        Route::get('/transaksi','index');
        Route::get('/transaksi/add','add');
        Route::post('/transaksi/add','aksiTambah');
        Route::get('/transaksi/edit/{transaksi}','Edit');
        Route::post('/transaksi/edit/{transaksi}','aksiEdit');
        Route::post('/transaksi/hapus/{transaksi}','Hapus');
        Route::get('/transaksi/ambilData/{produk}','ambilData');
        Route::get('/transaksi/ambilKategori/{produk}','ambilKategori');
       
    });
});



