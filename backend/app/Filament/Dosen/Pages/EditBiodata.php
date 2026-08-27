<?php

namespace App\Filament\Dosen\Pages;

use Filament\Pages\Page;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Notifications\Notification;
use App\Models\BiodataDosen;
use Illuminate\Support\Facades\Auth;

class EditBiodata extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-document-text';

    protected string $view = 'filament.dosen.pages.edit-biodata';

    protected static ?string $title = 'Biodata Dosen';

    protected static ?string $navigationLabel = 'Biodata';

    protected static ?string $slug = 'biodata';

    public ?array $data = [];

    public function mount(): void
    {
        $dosen = Auth::guard('dosen')->user();
        if (!$dosen) {
            abort(403);
        }

        $biodata = BiodataDosen::firstOrCreate(
            ['nidn' => $dosen->nidn]
        );

        $stateData = array_merge($biodata->toArray(), [
            'nidn' => $dosen->nidn,
            'nama_lengkap' => $biodata->nama_lengkap ?? trim($dosen->gelar_depan . ' ' . $dosen->nm_ptk . ' ' . $dosen->gelar_belakang),
            'email' => $biodata->email ?? $dosen->email,
            'pasfoto' => $biodata->pasfoto ?: $biodata->foto,
            'pasfoto_focus' => $biodata->pasfoto_focus ?: '50% 50%',
        ]);

        $this->form->fill($stateData);
    }

    public function form(Schema $form): Schema
    {
        return $form
            ->components([
                Section::make('Profil Lengkap Dosen')
                    ->schema([
                        TextInput::make('nidn')
                            ->label('NIDN / NIDK')
                            ->disabled()
                            ->required(),
                        TextInput::make('nama_lengkap')
                            ->label('Nama Lengkap & Gelar')
                            ->required(),
                        TextInput::make('nik')
                            ->label('NIK'),
                        TextInput::make('tempat_lahir')
                            ->label('Tempat Lahir'),
                        TextInput::make('tanggal_lahir')
                            ->label('Tanggal Lahir')
                            ->placeholder('Contoh: 15 Agustus 1980'),
                        Select::make('agama')
                            ->label('Agama')
                            ->options([
                                'Islam' => 'Islam',
                                'Kristen' => 'Kristen',
                                'Katolik' => 'Katolik',
                                'Hindu' => 'Hindu',
                                'Buddha' => 'Buddha',
                                'Khonghucu' => 'Khonghucu',
                            ]),
                        TextInput::make('status_kepegawaian')
                            ->label('Status Kepegawaian')
                            ->placeholder('Contoh: Dosen Tetap / Dosen Luar Biasa'),
                        TextInput::make('jabatan_fungsional')
                            ->label('Jabatan Fungsional (SK)')
                            ->placeholder('Contoh: Asisten Ahli / Lektor'),
                        TextInput::make('pangkat_golongan')
                            ->label('Pangkat / Golongan')
                            ->placeholder('Contoh: Penata / IIIc'),
                        Select::make('prodi_homebase')
                            ->label('Unit Kerja / Prodi Homebase')
                            ->options(\App\Models\StudyProgram::pluck('name', 'name')->toArray())
                            ->searchable()
                            ->placeholder('Pilih Program Studi Homebase'),
                        TextInput::make('email')
                            ->label('Email (Contact Person)')
                            ->email()
                            ->placeholder('Contoh: email@indonusa.ac.id'),
                        Textarea::make('keahlian')
                            ->label('Keahlian di Bidang')
                            ->placeholder('Contoh: Rekayasa Perangkat Lunak, Kecerdasan Buatan...')
                            ->rows(3)
                            ->columnSpanFull(),
                        FileUpload::make('pasfoto')
                            ->label('Pasfoto (Foto Profil)')
                            ->image()
                            ->disk('public')
                            ->directory('dosen/pasfoto')
                            ->live(),
                        \Filament\Forms\Components\ViewField::make('pasfoto_focus')
                            ->view('admin.pasfoto-focal-point-picker')
                            ->default('50% 50%')
                            ->columnSpanFull(),
                        FileUpload::make('ktp')
                            ->label('Scan KTP (PDF / Gambar)')
                            ->disk('public')
                            ->directory('dosen/ktp'),
                        FileUpload::make('sk_dosen')
                            ->label('Scan SK Dosen (PDF / Gambar)')
                            ->disk('public')
                            ->directory('dosen/sk'),
                    ])
                    ->columns(2)
            ])
            ->statePath('data')
            ->columns(1);
    }

    public function save(): void
    {
        $dosen = Auth::guard('dosen')->user();
        if (!$dosen) {
            return;
        }

        $formData = $this->form->getState();

        $biodata = BiodataDosen::where('nidn', $dosen->nidn)->first();
        if ($biodata) {
            $biodata->update([
                'nama_lengkap' => $formData['nama_lengkap'] ?? null,
                'nik' => $formData['nik'] ?? null,
                'tempat_lahir' => $formData['tempat_lahir'] ?? null,
                'tanggal_lahir' => $formData['tanggal_lahir'] ?? null,
                'agama' => $formData['agama'] ?? null,
                'status_kepegawaian' => $formData['status_kepegawaian'] ?? null,
                'jabatan_fungsional' => $formData['jabatan_fungsional'] ?? null,
                'pangkat_golongan' => $formData['pangkat_golongan'] ?? null,
                'prodi_homebase' => $formData['prodi_homebase'] ?? null,
                'email' => $formData['email'] ?? null,
                'keahlian' => $formData['keahlian'] ?? null,
                'pasfoto' => $formData['pasfoto'] ?? null,
                'pasfoto_focus' => $formData['pasfoto_focus'] ?? '50% 50%',
                'foto' => $formData['pasfoto'] ?? null,
                'ktp' => $formData['ktp'] ?? null,
                'sk_dosen' => $formData['sk_dosen'] ?? null,
            ]);
        }

        Notification::make()
            ->title('Biodata berhasil disimpan!')
            ->success()
            ->send();
    }
}
