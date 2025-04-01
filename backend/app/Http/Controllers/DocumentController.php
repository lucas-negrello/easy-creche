<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use App\Models\Document;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDocumentRequest $request)
    {
        $file = $request->file('file');
        $path = $file->store('documents', 'public');
        $document = Document::create([
            'name'                  => $file->getClientOriginalName(),
            'file_path'             => $path,
            'mime_type'             => $file->getClientMimeType(),
            'size'                  => $file->getSize(),
            'register_student_id'   => $request->register_student_id
        ]);

        return response()->json([
            'message'       => 'Document created successfully',
            'data'          => $document,
            'success'       => true,
            'status_code'   => 201
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDocumentRequest $request, Document $document)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        //
    }
}
