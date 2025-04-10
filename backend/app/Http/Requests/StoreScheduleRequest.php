<?php

namespace App\Http\Requests;

use App\Models\Schedule;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class StoreScheduleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('create', Schedule::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'event_name'            => ['required', 'string', 'max:255'],
            'event_date'            => ['required', 'date', 'after_or_equal:now'],
            'meta.event_description'=> ['nullable', 'string', 'max:500'],
            'meta.event_type'       => ['nullable', 'string', 'max:255'],
            'meta.event_location'   => ['nullable', 'string', 'max:255'],
            'meta.event_duration'   => ['nullable', 'string', 'max:255'],
            'meta.event_urgency'    => ['nullable', 'string', 'max:255'],
            'meta.event_user_ids'   => ['nullable', 'array'],
            'meta.event_user_ids.*' => ['nullable', 'integer', 'exists:users,id'],
        ];
    }
}
