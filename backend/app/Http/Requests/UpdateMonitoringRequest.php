<?php

namespace App\Http\Requests;

use App\Models\Monitoring;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdateMonitoringRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $monitoring = $this->route('monitoring');
        return Gate::allows('update', $monitoring);
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
            "meta.entrance.responsible_id"  => ['nullable', 'exists:users,id'],
            'meta.entrance.responsible'     => ['nullable', 'string', 'max:255'],
            'meta.entrance.responsible_cpf' => ['nullable', 'string', 'max:14', 'min:11'],
            "meta.exit.responsible_id"      => ['nullable', 'exists:users,id'],
            'meta.exit.responsible'         => ['nullable', 'string', 'max:255'],
            'meta.exit.responsible_cpf'     => ['nullable', 'string', 'max:14', 'min:11'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            if (!$this->hasEntranceResponsible()) {
                $validator->errors()->add(
                    'meta.entrance',
                    'meta.entrance.responsible_id or meta.entrance.responsible + meta.entrance.responsible_cpf must be informed'
                );
            }
            if (!$this->hasExitResponsible()) {
                $validator->errors()->add(
                    'meta.exit',
                    'meta.exit.responsible_id or meta.exit.responsible + meta.exit.responsible_cpf must be informed'
                );
            }
        });
    }

    public function hasEntranceResponsible(): bool
    {
        $meta = $this->input('meta', []);
        $entrance = $meta['entrance'] ?? [];
        $hasEntranceId = !empty($entrance['responsible_id']);
        $hasEntranceCpfCombo = !empty($entrance['responsible']) && !empty($entrance['responsible_cpf']);
        return ($hasEntranceId || $hasEntranceCpfCombo);
    }

    public function hasExitResponsible(): bool
    {
        $meta = $this->input('meta', []);
        $exit = $meta['exit'] ?? [];
        $hasExitId = !empty($exit['responsible_id']);
        $hasExitCpfCombo = !empty($exit['responsible']) && !empty($exit['responsible_cpf']);
        return ($hasExitId || $hasExitCpfCombo);
    }
}
