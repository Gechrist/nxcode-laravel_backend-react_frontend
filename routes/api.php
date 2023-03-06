<?php

use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\PatientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::apiResource('/doctors',DoctorController::class);
Route::apiResource('/patients',PatientController::class);
Route::post('/patients',[PatientController::class,'search']);
Route::post('/doctors',[DoctorController::class,'search']);

Route::post(
    '/patients/{patient}',
    [PatientController::class, 'update']
);

Route::post(
    '/doctors/{doctor}',
    [DoctorController::class, 'update']
);
