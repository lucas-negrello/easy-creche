<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use App\Models\Document;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Document::class);
        $documents = Document::all();

        return response()->json([
            'message'       => 'Documents retrieved successfully',
            'data'          => $documents,
            'success'       => true,
            'status_code'   => 200
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function upload(StoreDocumentRequest $request)
    {
        $this->authorize('create', Document::class);
        $file = $request->file('file');
        $path = $file->store('documents', 'public');
        $document = Document::create([
            'name'                  => $request->name,
            'original_name'         => $file->getClientOriginalName(),
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
     * Download the specified resource.
     */
    public function download(Document $document)
    {
        $this->authorize('view', $document);
        $filePath = Storage::disk('public')->path($document->file_path);
        if(!Storage::disk('public')->exists($document->file_path)) {
            return response([
                'message'           => 'File not found',
                'success'           => false,
                'status_code'       => 404,
            ], 404);
        }
        return response()->download($filePath, $document->original_name);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDocumentRequest $request, Document $document)
    {
        $this->authorize('update', $document);

        if (Storage::disk('public')->exists($document->file_path)) {
            Storage::disk('public')->delete($document->file_path);
        }

        $file = $request->file('file');
        $filePath = $file->store('documents', 'public');

        $document->update([
            'name'                  => $request->name,
            'file_path'             => $filePath,
            'original_name'         => $file->getClientOriginalName(),
            'mime_type'             => $file->getClientMimeType(),
            'size'                  => $file->getSize(),
            'register_student_id'   => $request->register_student_id
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        $this->authorize('delete', $document);

        if (Storage::disk('public')->exists($document->file_path)) {
            Storage::disk('public')->delete($document->file_path);
        }

        $document->delete();

        return response()->json([
            'message'       => 'Document deleted successfully',
            'data'          => $document,
            'success'       => true,
            'status_code'   => 200
        ]);
    }
}
