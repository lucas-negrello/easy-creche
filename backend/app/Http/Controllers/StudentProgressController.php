<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentProgressRequest;
use App\Http\Requests\UpdateStudentProgressRequest;
use App\Models\StudentProgress;

class StudentProgressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', StudentProgress::class);
        $studentProgresses = StudentProgress::with(['student' => function ($query) {
            $query->select('id', 'name')->without(['documents']);
        }])->with(['registerAdmin' => function ($query) {
            $query->select('id', 'name')->without(['students']);
        }])->get();
        return response()->json([
            'message'           => 'Student progress listed successfully',
            'data'              => $studentProgresses,
            'success'           => true,
            'status_code'       => 200
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentProgressRequest $request)
    {
        $studentProgress = $request->validated();
        $studentProgress['created_by'] = auth()->id();
        StudentProgress::create($studentProgress);
        return response()->json([
            'message'           => 'Student progress created successfully',
            'data'              => $studentProgress,
            'success'           => true,
            'status_code'       => 201,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(StudentProgress $studentProgress)
    {
        $this->authorize('view', $studentProgress);
        $studentProgress->load(['student' => function ($query) {
            $query->select('id', 'name')->without(['documents']);
        }])->load(['registerAdmin' => function ($query) {
            $query->select('id', 'name')->without(['students']);
        }]);
        return response()->json([
            'message' => 'Student progress retrieved successfully',
            'data' => $studentProgress,
            'success' => true,
            'status_code' => 200
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentProgressRequest $request, StudentProgress $studentProgress)
    {
        $studentProgress->update($request->validated());
        return response()->json([
            'message'           => 'Student progress updated successfully',
            'data'              => $studentProgress,
            'success'           => true,
            'status_code'       => 200,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentProgress $studentProgress)
    {
        $this->authorize('delete', $studentProgress);
        $studentProgress->delete();
        return response()->json([
            'message'           => 'Student progress deleted successfully',
            'data'              => $studentProgress,
            'success'           => true,
            'status_code'       => 200
        ]);
    }
}
