<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Doctor extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'tel',
        'specialty',
        'fb',
        'website',
     ];
    public function Patients() :BelongsToMany
    {
        return $this->belongsToMany(Patient::class, 'doctors_patients', 'doctors_id', 'patients_id');
    }
}
