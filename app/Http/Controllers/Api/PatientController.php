<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Http\Resources\PatientResource;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        $patients = Patient::with('doctors')->get();
        return PatientResource::collection($patients);

    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(StorePatientRequest $request)
    {
        $data = $request ->validated();        
        $patientDoctorInfo = explode(',',$data['doctors']);
        $patientDoctorInfo = array_map('intval', $patientDoctorInfo);
        $patientInfo = Arr::except($data,['doctors']);
        $newPatient = Patient::create($patientInfo);
        $newPatient->doctors()->sync($patientDoctorInfo);
        return response()->json(['message'=>"Ο νέος ασθενής αποθηκεύτηκε με επιτυχία"],status:201);
    
    }        
    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        $patient->doctors;
        return new PatientResource($patient);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatientRequest $request, Patient $patient)
    {

        $data = $request->validated();
        $patientDoctorInfo = explode(',',$data['doctors']);
        $patientDoctorInfo = array_map('intval', $patientDoctorInfo);
        $patientInfo = Arr::except($data,['doctors']);
        $patient->update($patientInfo);
        $patient->doctors()->sync($patientDoctorInfo);

        return response()->json(['message'=>"Οι αλλαγές αποθηκεύτηκαν με επιτυχία"], status:201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {   
        $patient->delete();
        return response()->json(['message'=>"Ο ασθενής διαγράφηκε με επιτυχία"], status:201);

    }
    /**
     * Search for specified resource from storage.
     */
    public function search(Request $request)
    {   
        $searchTerm = $request['searchTerm'];
        $patientSearchResults=Patient::query()->where('name', 'LIKE', "%{$searchTerm}%")->orWhere('gender', 'LIKE', "%{$searchTerm}%")->get();
        return response()->json($patientSearchResults, status:201);
    }


}
