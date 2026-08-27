<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Complaint;
use App\Models\Setting;
use App\Mail\ComplaintSubmitted;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ComplaintController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|string|in:dosen,tendik,mahasiswa,orang tua/wali,mitra',
            'message' => 'required|string',
            'email' => 'nullable|email',
        ]);

        try {
            $complaint = Complaint::create([
                'name' => $validated['name'],
                'status' => $validated['status'],
                'message' => $validated['message'],
                'reply_to_email' => $validated['email'] ?? null,
            ]);

            // Get mail settings
            $mailSettings = Setting::where('group', 'Email Settings')->pluck('value', 'key');
            $upmEmail = $mailSettings['upm_email'] ?? 'upm@poltekindonusa.ac.id';

            // Dynamically set mail config
            if (isset($mailSettings['mail_host'])) {
                config([
                    'mail.mailers.smtp.host' => $mailSettings['mail_host'],
                    'mail.mailers.smtp.port' => $mailSettings['mail_port'] ?? 587,
                    'mail.mailers.smtp.username' => $mailSettings['mail_username'],
                    'mail.mailers.smtp.password' => $mailSettings['mail_password'],
                    'mail.from.address' => $mailSettings['mail_from_address'] ?? 'noreply@poltekindonusa.ac.id',
                ]);
            }

            // Send email
            try {
                Mail::to($upmEmail)->send(new ComplaintSubmitted($complaint));
            } catch (\Exception $e) {
                Log::error('Failed to send complaint email: ' . $e->getMessage());
            }

            return response()->json([
                'message' => 'Pengaduan berhasil dikirim. Terima kasih atas masukan Anda.',
                'data' => $complaint
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengirim pengaduan.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
