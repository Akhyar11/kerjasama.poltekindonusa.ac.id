<?php

namespace App\Http\Controllers;

use App\Models\BiodataDosen;
use Illuminate\Http\Request;

class BiodataDosenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dosens = \Illuminate\Support\Facades\DB::connection('siakad')->table('wsia_dosen')->get();
        $biodatas = BiodataDosen::all()->keyBy('nidn');

        $result = $dosens->map(function($dosen) use ($biodatas) {
            $bio = $biodatas->get($dosen->nidn);
            return [
                'nidn' => $dosen->nidn,
                'nama' => $bio && $bio->nama_lengkap ? $bio->nama_lengkap : trim($dosen->gelar_depan . ' ' . $dosen->nm_ptk . ' ' . $dosen->gelar_belakang),
                'foto' => $bio ? ($bio->pasfoto ? $bio->pasfoto : $bio->foto) : null,
                'nama_lengkap' => $bio ? $bio->nama_lengkap : null,
                'nik' => $bio ? $bio->nik : null,
                'tempat_lahir' => $bio ? $bio->tempat_lahir : null,
                'tanggal_lahir' => $bio ? $bio->tanggal_lahir : null,
                'agama' => $bio ? $bio->agama : null,
                'status_kepegawaian' => $bio ? $bio->status_kepegawaian : null,
                'jabatan_fungsional' => $bio ? $bio->jabatan_fungsional : null,
                'pangkat_golongan' => $bio ? $bio->pangkat_golongan : null,
                'prodi_homebase' => $bio ? $bio->prodi_homebase : null,
                'email' => $bio ? ($bio->email ?: $dosen->email) : $dosen->email,
                'pasfoto' => $bio ? $bio->pasfoto : null,
                'pasfoto_focus' => $bio ? $bio->pasfoto_focus : '50% 50%',
                'ktp' => $bio ? $bio->ktp : null,
                'sk_dosen' => $bio ? $bio->sk_dosen : null,
                'keahlian' => $bio ? $bio->keahlian : null,
                'publikasi' => $bio ? $bio->publikasi : null,
                'riwayat_sekolah' => $bio ? $bio->riwayat_sekolah : null,
                'pengabdian_masyarakat' => $bio ? $bio->pengabdian_masyarakat : null,
                'hki' => $bio ? $bio->hki : null,
                'sertifikat_kompetensi' => $bio ? $bio->sertifikat_kompetensi : null,
                'sertifikat_penghargaan' => $bio ? $bio->sertifikat_penghargaan : null,
                'buku_karya' => $bio ? $bio->buku_karya : null,
            ];
        })->filter(function($item) {
            return !empty($item['nidn']);
        })->values();

        return response()->json($result);
    }

    public function show($nidn)
    {
        $dosen = \Illuminate\Support\Facades\DB::connection('siakad')->table('wsia_dosen')
            ->where('nidn', $nidn)->first();
            
        if (!$dosen) return response()->json(['message' => 'Not found'], 404);

        $bio = BiodataDosen::where('nidn', $nidn)->first();

        return response()->json([
            'nidn' => $dosen->nidn,
            'nama' => $bio && $bio->nama_lengkap ? $bio->nama_lengkap : trim($dosen->gelar_depan . ' ' . $dosen->nm_ptk . ' ' . $dosen->gelar_belakang),
            'foto' => $bio ? ($bio->pasfoto ? $bio->pasfoto : $bio->foto) : null,
            'nama_lengkap' => $bio ? $bio->nama_lengkap : null,
            'nik' => $bio ? $bio->nik : null,
            'tempat_lahir' => $bio ? $bio->tempat_lahir : null,
            'tanggal_lahir' => $bio ? $bio->tanggal_lahir : null,
            'agama' => $bio ? $bio->agama : null,
            'status_kepegawaian' => $bio ? $bio->status_kepegawaian : null,
            'jabatan_fungsional' => $bio ? $bio->jabatan_fungsional : null,
            'pangkat_golongan' => $bio ? $bio->pangkat_golongan : null,
            'prodi_homebase' => $bio ? $bio->prodi_homebase : null,
            'email' => $bio ? ($bio->email ?: $dosen->email) : $dosen->email,
            'pasfoto' => $bio ? $bio->pasfoto : null,
            'pasfoto_focus' => $bio ? $bio->pasfoto_focus : '50% 50%',
            'ktp' => $bio ? $bio->ktp : null,
            'sk_dosen' => $bio ? $bio->sk_dosen : null,
            'keahlian' => $bio ? $bio->keahlian : null,
            'publikasi' => $bio ? $bio->publikasi : null,
            'riwayat_sekolah' => $bio ? $bio->riwayat_sekolah : null,
            'pengabdian_masyarakat' => $bio ? $bio->pengabdian_masyarakat : null,
            'hki' => $bio ? $bio->hki : null,
            'sertifikat_kompetensi' => $bio ? $bio->sertifikat_kompetensi : null,
            'sertifikat_penghargaan' => $bio ? $bio->sertifikat_penghargaan : null,
            'riwayat_sekolah_list' => $bio ? $bio->riwayatSekolahs()->get() : [],
            'publikasi_list' => $bio ? $bio->publikasis()->get() : [],
            'pengabdian_masyarakat_list' => $bio ? $bio->pengabdians()->get() : [],
            'hki_list' => $bio ? $bio->hkis()->get() : [],
            'sertifikat_kompetensi_list' => $bio ? $bio->sertifikatKompetensis()->get() : [],
            'sertifikat_penghargaan_list' => $bio ? $bio->sertifikatPenghargaans()->get() : [],
            'buku_karya' => $bio ? $bio->buku_karya : null,
            'buku_list' => $bio ? $bio->bukus()->get() : [],
        ]);
    }

    public function update(Request $request, $nidn)
    {
        $request->validate([
            'foto' => 'nullable|string',
            'pasfoto_focus' => 'nullable|string',
            'email' => 'nullable|string',
            'keahlian' => 'nullable|string',
            'publikasi' => 'nullable|string',
            'riwayat_sekolah' => 'nullable|string',
            'pengabdian_masyarakat' => 'nullable|string',
            'hki' => 'nullable|string',
            'sertifikat_kompetensi' => 'nullable|string',
            'sertifikat_penghargaan' => 'nullable|string',
        ]);

        $biodata = BiodataDosen::updateOrCreate(
            ['nidn' => $nidn],
            [
                'foto' => $request->foto,
                'pasfoto_focus' => $request->pasfoto_focus,
                'email' => $request->email,
                'keahlian' => $request->keahlian,
                'publikasi' => $request->publikasi,
                'riwayat_sekolah' => $request->riwayat_sekolah,
                'pengabdian_masyarakat' => $request->pengabdian_masyarakat,
                'hki' => $request->hki,
                'sertifikat_kompetensi' => $request->sertifikat_kompetensi,
                'sertifikat_penghargaan' => $request->sertifikat_penghargaan,
            ]
        );

        return response()->json([
            'message' => 'Berhasil diupdate',
            'data' => $biodata
        ]);
    }
}
