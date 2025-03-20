<?php

namespace App\Http\Requests;

use App\Models\RegisterAdmin;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class StoreRegisterAdminRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('create', RegisterAdmin::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'meta.cpf' => 'nullable|string',
            'meta.address' => 'nullable|string',
            'meta.function' => 'nullable|string',
            'meta.workspace' => 'nullable|string',
            'meta.phone' => 'nullable|string',
        ];
    }
}
