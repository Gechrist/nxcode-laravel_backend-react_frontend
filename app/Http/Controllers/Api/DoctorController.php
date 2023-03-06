<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Http\Requests\StoreDoctorRequest;
use App\Http\Requests\UpdateDoctorRequest;
use App\Http\Resources\DoctorResource;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $doctors = Doctor::with(['patients'])->get();
        return DoctorResource::collection($doctors);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDoctorRequest $request)
    {
        $data = $request ->validated();        
        $doctorPatientInfo = explode(',',$data['patients']);
        $doctorPatientInfo = array_map('intval', $doctorPatientInfo);
        $doctorInfo = Arr::except($data,['patients']);
        $newPatient = Doctor::create($doctorInfo);
        $newPatient->patients()->sync($doctorPatientInfo);
        return response()->json(['message'=>"Ο νέος γιατρός αποθηκεύτηκε με επιτυχία"],status:201);
    
    }  

    /**
     * Display the specified resource.
     */
    public function show(Doctor $doctor)
    {
        $doctor->patients;
        return new DoctorResource($doctor);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDoctorRequest $request, Doctor $doctor)
    {
        $data = $request->validated();
        $doctorPatientInfo = explode(',',$data['patients']);
        $doctorPatientInfo = array_map('intval', $doctorPatientInfo);
        $patientInfo = Arr::except($data,['patients']);
        $doctor->update($patientInfo);
        $doctor->patients()->sync($doctorPatientInfo);
        return response()->json(['message'=>"Οι αλλαγές αποθηκεύτηκαν με επιτυχία"], status:201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Doctor $doctor)
    {
        $doctor->delete();
        return response()->json(['message'=>"Ο γιατρός διαγράφηκε με επιτυχία"], status:201);
    }
        /**
     * Search for specified resource from storage.
     */
    public function search(Request $request)
    {   
        $searchTerm = $request['searchTerm'];
        $doctorSearchResults=Doctor::query()->where('name', 'LIKE', "%{$searchTerm}%")->orWhere('specialty', 'LIKE', "%{$searchTerm}%")->get();
        return response()->json($doctorSearchResults, status:201);
    }
}
