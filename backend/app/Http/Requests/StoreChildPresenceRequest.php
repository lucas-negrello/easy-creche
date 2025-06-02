<?php

namespace App\Http\Requests;

use App\Models\ChildPresence;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class StoreChildPresenceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('create', ChildPresence::class);
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
            'exit'                          => ['nullable', 'date', 'after_or_equal:entrance'],
        ];
    }
}
