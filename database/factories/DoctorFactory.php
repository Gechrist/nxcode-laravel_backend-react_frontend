<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $specialtyValues = ['heart','eye','gastric','gyn','ped','tooth','nerve','surg','psy','gland','skin','path'];
        return [
            'name' => fake()->name(),
            'tel'=> fake()->phoneNumber(),
            'specialty' => fake()->randomElement($specialtyValues),
            'fb' => fake()->url(),
            'website' => fake()->domainName()
        ];
    }
}
