<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Patient extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'tel',
        'age',
        'gender',
     ];

    public function doctors():BelongsToMany
    {
        return $this->belongsToMany(Doctor::class, 'doctors_patients', 'patients_id', 'doctors_id');
    }
}
