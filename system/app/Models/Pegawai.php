<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;

class Pegawai extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

	protected $table = 'pegawai';
	protected $fillable = [
        'nama',
        'tlp',
        'alamat',
        'email',
        'password',
        'foto',
    ];

	function handleUploadFoto(){
        if(request()->hasFile('foto')){
            $this->handleDeleteFoto();
            $foto = request()->file('foto');
            $destination = "pegawai";
            $randomStr = Str::random(5);
            $filename = time()."-".$randomStr.".".$foto->extension();
            $url = $foto->storeAs($destination, $filename);
            $this->foto = "app/".$url;
            $this->save;
        }
    }
    function handleDeleteFoto(){
        $foto= $this->foto;
        if($foto){
            $path = public_path($foto);
            if(file_exists($path)){
                unlink($path);

            }
            return true;
        }
    }
   
}
