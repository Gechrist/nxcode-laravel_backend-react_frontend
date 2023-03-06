<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $genderValues = ['male','female'];
        return [
            'name' => fake()->name(),
            'tel'=> fake()->phoneNumber(),
            'age' => fake()->numberBetween($min = 1, $max = 100),
            'gender'=> fake()->randomElement($genderValues)
        ];
    }
}
