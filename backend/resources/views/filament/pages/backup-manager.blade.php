<x-filament-panels::page>
    <x-filament::section>
        <x-slot name="heading">
            Manajemen File Backup Storage
        </x-slot>

        <x-slot name="description">
            File backup disimpan di lokasi <code class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs font-mono text-primary-600 dark:text-primary-400">storage/app/backups</code>.
        </x-slot>

        <div class="overflow-x-auto mt-4" style="border-radius: 0.5rem; border: 1px solid rgba(156, 163, 175, 0.2);">
            <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400" style="width: 100%; border-collapse: collapse;">
                <thead class="bg-gray-50 dark:bg-gray-800/80 text-xs uppercase text-gray-700 dark:text-gray-300" style="border-bottom: 1px solid rgba(156, 163, 175, 0.2);">
                    <tr>
                        <th scope="col" class="px-6 py-3 font-medium">Nama File</th>
                        <th scope="col" class="px-6 py-3 font-medium">Ukuran</th>
                        <th scope="col" class="px-6 py-3 font-medium">Tanggal Dibuat</th>
                        <th scope="col" class="px-6 py-3 font-medium text-right" style="text-align: right;">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    @forelse($backups as $backup)
                        <tr class="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors" style="border-bottom: 1px solid rgba(156, 163, 175, 0.1);">
                            <td class="px-6 py-4 font-mono text-xs font-semibold text-gray-900 dark:text-white" style="vertical-align: middle;">
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <x-filament::icon
                                        icon="heroicon-o-document-text"
                                        class="text-primary-500"
                                        style="width: 20px; height: 20px; flex-shrink: 0; display: inline-block;"
                                    />
                                    <span>{{ $backup['name'] }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-4 text-gray-600 dark:text-gray-300" style="vertical-align: middle;">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200" style="display: inline-block; padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem;">
                                    {{ $backup['size'] }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-gray-600 dark:text-gray-300" style="vertical-align: middle;">
                                {{ $backup['modified_at'] }}
                            </td>
                            <td class="px-6 py-4 text-right" style="text-align: right; vertical-align: middle;">
                                <div style="display: flex; align-items: center; justify-content: flex-end; gap: 0.5rem;">
                                    <x-filament::button
                                        tag="a"
                                        href="{{ route('admin.backups.download', ['filename' => $backup['name']]) }}"
                                        color="primary"
                                        size="sm"
                                        icon="heroicon-m-arrow-down-tray"
                                    >
                                        Download
                                    </x-filament::button>

                                    <x-filament::button
                                        wire:click="deleteBackup('{{ $backup['name'] }}')"
                                        wire:confirm="Apakah Anda yakin ingin menghapus file backup ini?"
                                        color="danger"
                                        size="sm"
                                        icon="heroicon-m-trash"
                                    >
                                        Hapus
                                    </x-filament::button>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400" style="text-align: center; padding: 2rem;">
                                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;">
                                    <x-filament::icon
                                        icon="heroicon-o-archive-box"
                                        style="width: 40px; height: 40px; opacity: 0.5; display: inline-block;"
                                    />
                                    <span>Belum ada file backup. Klik "Buat Backup Baru" di bagian atas untuk membuat file pertama.</span>
                                </div>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </x-filament::section>
</x-filament-panels::page>
