<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Patient;
use App\Models\Doctor;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $patients=Patient::factory(10)->create();

        $doctors = Doctor::factory(10)->create();

        $patientsIDS = collect([]);
         $patients->each(function (Patient $patient) use($patientsIDS){
            $id=$patient->id;
            $patientsIDS->push($id);
        });

        $doctors->each(function(Doctor $doctor) use($patientsIDS){
            $doctor->patients()->attach($patientsIDS->random(1,5));
        });
        
    }
}
