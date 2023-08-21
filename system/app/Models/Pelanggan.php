<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;

class Pelanggan extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

	protected $table = 'pelanggan';
	protected $fillable = [
        'nama_p',
        'tlp',
        'jk_p',
        'alamat_p',
        'lat_p',
        'lng_p',
        'email_p',
        'password_p',
        'photo',
    ];

	function handleUploadFoto(){
        if(request()->hasFile('photo')){
            $this->handleDeleteFoto();
            $foto = request()->file('photo');
            $destination = "pelanggan";
            $randomStr = Str::random(5);
            $filename = time()."-".$randomStr.".".$foto->extension();
            $url = $foto->storeAs($destination, $filename);
            $this->photo = "app/".$url;
            $this->save;
        }
    }
    function handleDeleteFoto(){
        $foto= $this->photo;
        if($foto){
            $path = public_path($foto);
            if(file_exists($path)){
                unlink($path);

            }
            return true;
        }
    }
   
}
