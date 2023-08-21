<?php

namespace App\Models;
use App\models\model;
use Illuminate\Support\Str;

class Produk extends Model{

	protected $table = "Produk";
	protected $fillable = [
		'id',
		'nama_produk',
		'stock_produk',
		'photo_produk',
		'deskripsi_produk',
		'harga_produk',
		'kategori_produk',
	];

	function handleUploadFoto(){
        if(request()->hasFile('photo_produk')){
            $this->handleDeleteFoto();
            $foto = request()->file('photo_produk');
            $destination = "produk";
            $randomStr = Str::random(5);
            $filename = time()."-".$randomStr.".".$foto->extension();
            $url = $foto->storeAs($destination, $filename);
            $this->photo_produk = "app/".$url;
            $this->save;
        }
    }
    function handleDeleteFoto(){
        $foto= $this->photo_produk;
        if($foto){
            $path = public_path($foto);
            if(file_exists($path)){
                unlink($path);

            }
            return true;
        }
    }


}
