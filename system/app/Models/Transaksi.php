<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;

class Transaksi extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

	protected $table = 'transaksi';

	public function pegawai(){
		return $this->belongsTo(Pegawai::class, 'id_pegawai', 'id');
	}

	public function pelanggan(){
		return $this->belongsTo(Pelanggan::class, 'id_pelanggan', 'id');
	}

	public function produk(){
		return $this->belongsTo(Produk::class, 'id_produk', 'id');
	}
   
}
