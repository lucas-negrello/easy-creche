<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('monitoring', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('register_student_id');
            $table->timestamp('entrance')->nullable();
            $table->timestamp('exit')->nullable();
            $table->jsonb('meta')->nullable();
            $table->timestamps();
            $table->foreign('register_student_id')->references('id')->on('register_students')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monitoring');
    }
};
