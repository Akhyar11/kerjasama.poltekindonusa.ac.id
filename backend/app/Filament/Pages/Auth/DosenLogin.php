<?php

namespace App\Filament\Pages\Auth;

use Filament\Auth\Pages\Login as BaseLogin;
use Filament\Auth\Http\Responses\Contracts\LoginResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use App\Models\Dosen;

class DosenLogin extends BaseLogin
{
    public function authenticate(): ?LoginResponse
    {
        try {
            $data = $this->form->getState();
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'data.email' => 'Input tidak valid.',
            ]);
        }

        // 1. Find Dosen by email
        $dosen = Dosen::where('email', $data['email'])->first();

        if (! $dosen) {
            $this->throwFailureValidationException();
        }

        // 2. Validate password (bcrypt & legacy sha1/md5)
        $isValid = false;
        if (password_verify($data['password'], $dosen->pass)) {
            $isValid = true;
        } else {
            $legacyHash = sha1(md5($data['password']) . $dosen->nidn);
            if ($dosen->pass === $legacyHash) {
                $isValid = true;
            }
        }

        if (! $isValid) {
            $this->throwFailureValidationException();
        }

        // 3. Log user in using the 'dosen' guard
        Auth::guard('dosen')->login($dosen, $data['remember'] ?? false);

        session()->regenerate();

        return app(LoginResponse::class);
    }

    protected function throwFailureValidationException(): never
    {
        throw ValidationException::withMessages([
            'data.email' => __('filament-panels::pages/auth/login.messages.failed'),
        ]);
    }
}
