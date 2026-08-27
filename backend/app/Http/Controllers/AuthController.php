<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\BiodataDosen;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $dosen = DB::connection('siakad')->table('wsia_dosen')
            ->where('email', $request->email)
            ->first();

        if (!$dosen) {
            return response()->json(['message' => 'Email tidak ditemukan'], 404);
        }

        $isValid = false;
        if (password_verify($request->password, $dosen->pass)) {
            $isValid = true;
        } else {
            $legacyHash = sha1(md5($request->password) . $dosen->nidn);
            if ($dosen->pass === $legacyHash) {
                $isValid = true;
            }
        }

        if (!$isValid) {
            return response()->json(['message' => 'Password salah'], 401);
        }

        // Return a dummy token for frontend to use in headers
        $token = base64_encode($dosen->nidn . ':' . time());
        
        return response()->json([
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => [
                'nidn' => $dosen->nidn,
                'nama' => trim($dosen->gelar_depan . ' ' . $dosen->nm_ptk . ' ' . $dosen->gelar_belakang)
            ]
        ]);
    }
}
