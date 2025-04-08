<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRegisterStudentRequest;
use App\Http\Requests\UpdateRegisterStudentRequest;
use App\Models\RegisterStudent;
use Illuminate\Support\Facades\Gate;

class RegisterStudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', RegisterStudent::class);
        $registerStudents = RegisterStudent::with(['responsible' => function ($query) {
            $query->select('id', 'name', 'meta');
        }])->get();
        return response()->json([
            'message'           => 'Students listed successfully',
            'data'              => $registerStudents,
            'success'           => true,
            'status_code'       => 200
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRegisterStudentRequest $request)
    {
        $registerStudent = RegisterStudent::create($request->validated());
        return response()->json([
            'message'           => 'Student created successfully',
            'data'              => $registerStudent,
            'success'           => true,
            'status_code'       => 201,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(RegisterStudent $registerStudent)
    {
        $this->authorize('view', $registerStudent);
        $registerStudent->load(['responsible' => function ($query) {
            $query->select('id', 'name', 'meta');
        }]);
        return response()->json([
            'message'           => 'Student retrieved successfully',
            'data'              => $registerStudent,
            'success'           => true,
            'status_code'       => 200
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRegisterStudentRequest $request, RegisterStudent $registerStudent)
    {
        $registerStudent->update($request->validated());
        return response()->json([
            'message'           => 'Student updated successfully',
            'data'              => $registerStudent,
            'success'           => true,
            'status_code'       => 200,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RegisterStudent $registerStudent)
    {
        $this->authorize('delete', $registerStudent);
        $registerStudent->delete();

        return response()->json([
            'message'           => 'Student deleted successfully',
            'data'              => $registerStudent,
            'success'           => true,
            'status_code'       => 200
        ]);
    }
}
