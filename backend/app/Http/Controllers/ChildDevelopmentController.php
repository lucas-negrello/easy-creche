<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreChildDevelopmentRequest;
use App\Http\Requests\UpdateChildDevelopmentRequest;
use App\Models\ChildDevelopment;

class ChildDevelopmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', ChildDevelopment::class);
        $childrenDevelopment = ChildDevelopment::with(['student' => function ($query) {
            $query->select('id', 'name')->without(['documents']);
        }])->with(['registerAdmin' => function ($query) {
            $query->select('id', 'name')->without(['students']);
        }])->get();
        return response()->json([
            'message'           => 'Children development listed successfully',
            'data'              => $childrenDevelopment,
            'success'           => true,
            'status_code'       => 200
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChildDevelopmentRequest $request)
    {
        $childDevelopment = $request->validated();
        $childDevelopment['created_by'] = auth()->id();
        ChildDevelopment::create($childDevelopment);
        return response()->json([
            'message'           => 'Child development created successfully',
            'data'              => $childDevelopment,
            'success'           => true,
            'status_code'       => 201,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(ChildDevelopment $childDevelopment)
    {
        $this->authorize('view', $childDevelopment);
        $childDevelopment->load(['student' => function ($query) {
            $query->select('id', 'name')->without(['documents']);
        }])->load(['registerAdmin' => function ($query) {
            $query->select('id', 'name')->without(['students']);
        }]);
        return response()->json([
            'message' => 'Child development retrieved successfully',
            'data' => $childDevelopment,
            'success' => true,
            'status_code' => 200
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChildDevelopmentRequest $request, ChildDevelopment $childDevelopment)
    {
        $childDevelopment->update($request->validated());
        return response()->json([
            'message'           => 'Child development updated successfully',
            'data'              => $childDevelopment,
            'success'           => true,
            'status_code'       => 200,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChildDevelopment $childDevelopment)
    {
        $this->authorize('delete', $childDevelopment);
        $childDevelopment->delete();
        return response()->json([
            'message'           => 'Child development deleted successfully',
            'data'              => $childDevelopment,
            'success'           => true,
            'status_code'       => 200
        ]);
    }
}
