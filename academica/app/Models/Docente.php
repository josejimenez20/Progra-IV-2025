<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    use HasFactory;

    protected $Fillable = [
        'codigo',
        'nombre',
        'uv',
        'codigo_transaccion',
        'hash'
    ];
}
