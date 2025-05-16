<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdateChildPresenceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $childPresence = $this->route('child_presence');
        return Gate::allows('update', $childPresence);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'register_student_id'           => ['required', 'exists:register_students,id'],
            'entrance'                      => ['required', 'date', 'before_or_equal:now'],
            'exit'                          => ['required', 'date', 'after_or_equal:entrance'],
        ];
    }
}
