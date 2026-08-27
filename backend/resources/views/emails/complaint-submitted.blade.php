<x-mail::message>
# Pengaduan Online Baru

Terdapat pengaduan baru yang masuk melalui website Politeknik Indonusa Surakarta.

**Detail Pengadu:**
- **Nama:** {{ $complaint->name }}
- **Status:** {{ ucfirst($complaint->status) }}
- **Email Balasan:** {{ $complaint->reply_to_email ?? '-' }}

**Pesan/Saran:**
{{ $complaint->message }}

<x-mail::button :url="config('app.url') . '/admin/complaints'">
Lihat Detail di Panel Admin
</x-mail::button>

Terima kasih,<br>
Sistem Website {{ config('app.name') }}
</x-mail::message>
