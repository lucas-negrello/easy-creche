<?php

namespace App\Http\Requests;

use App\Models\RegisterStudent;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdateRegisterStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('update', RegisterStudent::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'responsible_id'            => 'nullable|exists:users,id',
            'name'                      => 'required|string',
            'birth_certificate'         => 'required|string',
            'meta.blood_type'           => 'nullable|string',
            'meta.age'                  => 'nullable|string',
            'meta.allergies'            => 'nullable|string',
            'meta.gender'               => 'nullable|string',
            'meta.medical_convenience'  => 'nullable|string',
            'meta.url_documents'        => 'nullable|array',
        ];
    }
}
