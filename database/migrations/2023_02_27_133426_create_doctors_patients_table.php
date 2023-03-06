<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('doctors_patients', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('doctors_id')->unsigned();
        $table->unsignedBigInteger('patients_id')->unsigned();

        $table->foreign('doctors_id')->references('id')
             ->on('doctors')->onDelete('cascade');
        $table->foreign('patients_id')->references('id')
            ->on('patients')->onDelete('cascade');

    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctors_patients');
    }
};
