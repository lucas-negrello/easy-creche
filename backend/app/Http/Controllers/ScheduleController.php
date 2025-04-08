<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreScheduleRequest;
use App\Http\Requests\UpdateScheduleRequest;
use App\Models\Schedule;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Schedule::class);
        $schedules = Schedule::with(['user' => function ($query) {
            $query->select('id', 'name', 'meta');
        }])->get();
        return response()->json([
            'message'           => 'Schedules listed successfully',
            'data'              => $schedules,
            'success'           => true,
            'status_code'       => 200
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreScheduleRequest $request)
    {
        $schedule = $request->validated();
        $schedule['created_by'] = auth()->id();
        Schedule::create($schedule);
        return response()->json([
            'message'           => 'Schedule created successfully',
            'data'              => $schedule,
            'success'           => true,
            'status_code'       => 201,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule)
    {
        $this->authorize('view', $schedule);
        $schedule->load(['user' => function ($query) {
            $query->select('id', 'name', 'meta');
        }]);
        return response()->json([
            'message' => 'Schedule retrieved successfully',
            'data' => $schedule,
            'success' => true,
            'status_code' => 200
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateScheduleRequest $request, Schedule $schedule)
    {
        $schedule->update($request->validated());
        return response()->json([
            'message'           => 'Schedule updated successfully',
            'data'              => $schedule,
            'success'           => true,
            'status_code'       => 200,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        $this->authorize('delete', $schedule);
        $schedule->delete();
        return response()->json([
            'message'           => 'Schedule deleted successfully',
            'data'              => $schedule,
            'success'           => true,
            'status_code'       => 200
        ]);
    }
}
