@php
    $record = $getRecord();
    $pasfoto = $getContainer()->getRawState()['pasfoto'] ?? ($record?->pasfoto ?? null);
    
    // Extract first item if it is an array
    if (is_array($pasfoto)) {
        $pasfoto = reset($pasfoto);
    }

    $imageUrl = null;
    if ($pasfoto) {
        if (is_object($pasfoto) && method_exists($pasfoto, 'temporaryUrl')) {
            try {
                $imageUrl = $pasfoto->temporaryUrl();
            } catch (\Throwable $e) {
                // Fallback
            }
        } elseif (is_string($pasfoto)) {
            $imageUrl = str_starts_with($pasfoto, 'http') ? $pasfoto : asset('storage/' . $pasfoto);
        }
    }
@endphp

<div class="filament-focal-point-picker-wrapper" style="margin-top: 10px; margin-bottom: 10px;">
    <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px; color: #111827;" class="dark:text-white">
        Fokus Pasfoto (Klik/Geser untuk Mengatur Fokus Wajah/Tengah)
    </div>
    
    <div
        x-data="{
            state: $wire.entangle('{{ $getStatePath() }}'),
            posX: 50,
            posY: 50,
            init() {
                this.$watch('state', value => this.parseState(value));
                this.parseState(this.state);
            },
            parseState(value) {
                if (value) {
                    const parts = value.split(' ');
                    if (parts.length === 2) {
                        this.posX = parseFloat(parts[0]);
                        this.posY = parseFloat(parts[1]);
                        return;
                    }
                }
                this.posX = 50;
                this.posY = 50;
                this.state = '50% 50%';
            },
            updateFocus(e) {
                const rect = this.$refs.container.getBoundingClientRect();
                const x = Math.max(0, Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
                const y = Math.max(0, Math.min(100, Math.round(((e.clientY - rect.top) / rect.height) * 100)));
                this.posX = x;
                this.posY = y;
                this.state = `${x}% ${y}%`;
            }
        }"
        x-ref="container"
        style="position: relative; width: 220px; height: 260px; overflow: hidden; border: 1.5px solid #d1d5db; border-radius: 8px; background-color: #f3f4f6; cursor: crosshair; box-sizing: border-box; margin: 0 auto;"
        class="dark:border-gray-700 dark:bg-gray-800"
        @click="updateFocus($event)"
        @mousedown="
            const onMouseMove = (e) => updateFocus(e);
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', () => window.removeEventListener('mousemove', onMouseMove), { once: true });
        "
    >
        <!-- Background Image or Placeholder Grid -->
        @if($imageUrl)
            <div 
                :style="`position: absolute; inset: 0; background-image: url('{{ $imageUrl }}'); background-size: cover; background-repeat: no-repeat; pointer-events: none; background-position: ${posX}% ${posY}%;`"
            ></div>
        @else
            <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, #e5e7eb, #d1d5db); opacity: 0.8; padding: 16px; text-align: center; pointer-events: none;" class="dark:from-gray-800 dark:to-gray-900">
                <svg style="width: 48px; height: 48px; color: #9ca3af; margin-bottom: 8px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span style="font-size: 11px; color: #4b5563; font-weight: 500;" class="dark:text-gray-400">Unggah pasfoto terlebih dahulu untuk melihat pratinjau fokus</span>
            </div>
        @endif
        
        <!-- Focus Crosshair (Orange Target Ring) -->
        <div 
            :style="`position: absolute; width: 32px; height: 32px; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; pointer-events: none; z-index: 10; left: ${posX}%; top: ${posY}%;`"
        >
            <div style="width: 24px; height: 24px; border-radius: 50%; border: 2.5px solid #f97316; background-color: rgba(249, 115, 22, 0.35); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);">
                <div style="width: 8px; height: 8px; border-radius: 50%; background-color: #ea580c;"></div>
            </div>
        </div>
        
        <!-- Text Display Overlay -->
        <div style="position: absolute; bottom: 8px; left: 8px; right: 8px; padding: 4px 8px; background-color: rgba(17, 24, 39, 0.85); color: #ffffff; font-size: 10px; font-weight: 600; border-radius: 6px; pointer-events: none; z-index: 20; box-shadow: 0 2px 6px rgba(0,0,0,0.25); text-align: center;">
            Fokus: <span x-text="state">50% 50%</span>
        </div>
    </div>
</div>
