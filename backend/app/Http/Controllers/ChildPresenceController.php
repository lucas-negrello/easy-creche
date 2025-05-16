<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreChildPresenceRequest;
use App\Http\Requests\UpdateChildPresenceRequest;
use App\Models\ChildPresence;

class ChildPresenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', ChildPresence::class);
        $childrenPresence = ChildPresence::with(['student' => function ($query) {
            $query->select('id', 'name', 'meta');
        }])->get();
        return response()->json([
            'message'           => 'Children presence listed successfully',
            'data'              => $childrenPresence,
            'success'           => true,
            'status_code'       => 200
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChildPresenceRequest $request)
    {
        $childPresence = ChildPresence::create($request->validated());
        return response()->json([
            'message'           => 'Child presence created successfully',
            'data'              => $childPresence,
            'success'           => true,
            'status_code'       => 201,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(ChildPresence $childPresence)
    {
        $this->authorize('view', $childPresence);
        $childPresence->load(['student' => function ($query) {
            $query->select('id', 'name', 'meta');
        }]);
        return response()->json([
            'message' => 'Child presence retrieved successfully',
            'data' => $childPresence,
            'success' => true,
            'status_code' => 200
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChildPresenceRequest $request, ChildPresence $childPresence)
    {
        $childPresence->update($request->validated());
        return response()->json([
            'message'           => 'Child presence updated successfully',
            'data'              => $childPresence,
            'success'           => true,
            'status_code'       => 200,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChildPresence $childPresence)
    {
        $this->authorize('delete', $childPresence);
        $childPresence->delete();
        return response()->json([
            'message'           => 'Child presence deleted successfully',
            'data'              => $childPresence,
            'success'           => true,
            'status_code'       => 200
        ]);
    }
}
