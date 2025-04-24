<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdateStudentProgressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $studentProgress = $this->route('student_progress');
        return Gate::allows('update', $studentProgress);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'student_id'            => ['required', 'exists:register_students,id'],
            'description'           => ['required', 'string', 'max:5000'],
            'meta'                  => ['nullable', 'array'],
        ];
    }
}
