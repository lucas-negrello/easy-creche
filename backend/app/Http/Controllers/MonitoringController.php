<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMonitoringRequest;
use App\Http\Requests\UpdateMonitoringRequest;
use App\Models\Monitoring;

class MonitoringController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Monitoring::class);
        $monitoring = Monitoring::with(['student' => function ($query) {
            $query->select('id', 'name', 'meta');
        }])->get();
        return response()->json([
            'message'           => 'Monitoring listed successfully',
            'data'              => $monitoring,
            'success'           => true,
            'status_code'       => 200
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMonitoringRequest $request)
    {
        $monitoring = Monitoring::create($request->validated());
        return response()->json([
            'message'           => 'Monitoring created successfully',
            'data'              => $monitoring,
            'success'           => true,
            'status_code'       => 201,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Monitoring $monitoring)
    {
        $this->authorize('view', $monitoring);
        $monitoring->load(['student' => function ($query) {
            $query->select('id', 'name', 'meta');
        }]);
        return response()->json([
            'message' => 'Monitoring retrieved successfully',
            'data' => $monitoring,
            'success' => true,
            'status_code' => 200
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMonitoringRequest $request, Monitoring $monitoring)
    {
        $monitoring->update($request->validated());
        return response()->json([
            'message'           => 'Monitoring updated successfully',
            'data'              => $monitoring,
            'success'           => true,
            'status_code'       => 200,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Monitoring $monitoring)
    {
        $this->authorize('delete', $monitoring);
        $monitoring->delete();
        return response()->json([
            'message'           => 'Monitoring deleted successfully',
            'data'              => $monitoring,
            'success'           => true,
            'status_code'       => 200
        ]);
    }
}
