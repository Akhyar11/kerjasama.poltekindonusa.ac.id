<x-filament-panels::page>
    <div class="menu-builder-container" style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 2rem; font-family: inherit; margin-top: 1rem;">
        
        <!-- CSS styles for premium looks -->
        <style>
            .mb-accordion {
                background: #1e293b;
                border: 1px solid #334155;
                border-radius: 12px;
                margin-bottom: 1rem;
                overflow: hidden;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
            .mb-accordion-header {
                padding: 1rem 1.25rem;
                background: #0f172a;
                font-weight: 700;
                font-size: 0.95rem;
                color: #f1f5f9;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #334155;
                user-select: none;
            }
            .mb-accordion-content {
                padding: 1.25rem;
                display: none;
                max-height: 350px;
                overflow-y: auto;
            }
            .mb-accordion.active .mb-accordion-content {
                display: block;
            }
            .mb-item-list {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                margin-top: 0.75rem;
            }
            .mb-list-item {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 0.88rem;
                color: #94a3b8;
                padding: 6px 8px;
                border-radius: 6px;
                transition: background 0.2s;
            }
            .mb-list-item:hover {
                background: #334155;
                color: #f1f5f9;
            }
            .mb-list-item input[type="checkbox"] {
                cursor: pointer;
                accent-color: #f0a500;
                width: 16px;
                height: 16px;
                border-radius: 4px;
            }
            .mb-search-input {
                width: 100%;
                background: #0f172a;
                border: 1px solid #334155;
                color: #f1f5f9;
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 0.85rem;
                outline: none;
                transition: border-color 0.2s;
            }
            .mb-search-input:focus {
                border-color: #f0a500;
            }
            .mb-btn {
                padding: 8px 16px;
                border-radius: 8px;
                font-weight: 700;
                font-size: 0.85rem;
                cursor: pointer;
                transition: all 0.2s;
                border: none;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
            }
            .mb-btn-primary {
                background: #f0a500;
                color: #0d2440;
            }
            .mb-btn-primary:hover {
                background: #ffc940;
                transform: translateY(-1px);
            }
            .mb-btn-secondary {
                background: #334155;
                color: #f1f5f9;
                border: 1px solid #475569;
            }
            .mb-btn-secondary:hover {
                background: #475569;
            }
            .mb-btn-danger {
                background: #ef4444;
                color: #ffffff;
            }
            .mb-btn-danger:hover {
                background: #f87171;
            }
            
            /* Draggable items list styles */
            .menu-structure-card {
                background: #1e293b;
                border: 1px solid #334155;
                border-radius: 16px;
                padding: 1.5rem;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }
            .menu-items-tree {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                min-height: 250px;
                background: #0f172a;
                border: 2px dashed #334155;
                border-radius: 12px;
                padding: 1.25rem;
                position: relative;
            }
            .draggable-item {
                background: #1e293b;
                border: 1px solid #334155;
                border-radius: 10px;
                padding: 10px 16px;
                display: flex;
                flex-direction: column;
                cursor: grab;
                transition: all 0.2s ease;
                user-select: none;
                position: relative;
            }
            .draggable-item.drag-over {
                border-top: 3px solid #f0a500;
                padding-top: 14px;
            }
            .draggable-item-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
            }
            .draggable-handle {
                cursor: grab;
                display: flex;
                align-items: center;
                gap: 8px;
                color: #94a3b8;
                font-weight: 700;
            }
            .draggable-handle svg {
                opacity: 0.6;
            }
            .draggable-item-type {
                font-size: 0.75rem;
                padding: 2px 8px;
                border-radius: 999px;
                font-weight: 700;
                text-transform: uppercase;
                background: #334155;
                color: #94a3b8;
            }
            .draggable-item-actions {
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .draggable-item-actions button {
                background: #0f172a;
                border: 1px solid #334155;
                color: #f1f5f9;
                width: 28px;
                height: 28px;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.75rem;
                cursor: pointer;
                transition: all 0.15s;
            }
            .draggable-item-actions button:hover:not(:disabled) {
                border-color: #f0a500;
                color: #f0a500;
            }
            .draggable-item-actions button:disabled {
                opacity: 0.3;
                cursor: not-allowed;
            }
            .draggable-item-details {
                margin-top: 12px;
                padding-top: 12px;
                border-top: 1px solid #334155;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .draggable-item-details label {
                font-size: 0.75rem;
                color: #94a3b8;
                font-weight: 700;
            }
            .draggable-item-details input {
                background: #0f172a;
                border: 1px solid #334155;
                color: #f1f5f9;
                padding: 6px 10px;
                border-radius: 6px;
                font-size: 0.85rem;
                width: 100%;
                outline: none;
            }
            .draggable-item-details input:focus {
                border-color: #f0a500;
            }
            
            /* Depth indicators styles */
            .draggable-item[data-depth="0"] {
                border-left: 4px solid #1a3a5c;
            }
            .draggable-item[data-depth="1"] {
                border-left: 4px solid #f0a500;
                background: #1e293b;
                opacity: 0.95;
            }
            .draggable-item[data-depth="2"] {
                border-left: 4px solid #ef4444;
                background: #1e293b;
                opacity: 0.9;
            }

            .mb-collapse-toggle {
                background: #334155;
                border: 1px solid #475569;
                color: #f0a500;
                font-weight: bold;
                width: 24px;
                height: 24px;
                border-radius: 6px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 0.78rem;
                margin-right: 8px;
                cursor: pointer;
                transition: all 0.2s;
            }
            .mb-collapse-toggle:hover {
                background: #475569;
                border-color: #f0a500;
            }
        </style>

        <!-- LEFT SIDEBAR: Resource Checklists -->
        <div style="grid-column: span 4;" class="col-span-12 md:col-span-4">
            
            <!-- 1. PAGES -->
            <div class="mb-accordion active" id="acc-pages">
                <div class="mb-accordion-header" onclick="toggleAccordion('acc-pages')">
                    <span>Halaman Statis</span>
                    <span class="chevron">▼</span>
                </div>
                <div class="mb-accordion-content">
                    <input type="text" class="mb-search-input" placeholder="Cari halaman..." onkeyup="filterList('page-list', this.value)">
                    <div class="mb-item-list" id="page-list">
                        <label class="mb-list-item" style="border-bottom: 1px solid #334155; padding-bottom: 8px; margin-bottom: 4px; font-weight: bold;">
                            <input type="checkbox" onchange="toggleSelectAll('page-list', this.checked)">
                            <span>Pilih Semua</span>
                        </label>
                        @foreach ($pages as $page)
                            <label class="mb-list-item page-item">
                                <input type="checkbox" class="resource-checkbox" data-title="{{ $page->title }}" data-url="/{{ $page->slug }}" data-type="Page">
                                <span>{{ $page->title }}</span>
                            </label>
                        @endforeach
                    </div>
                    <div style="margin-top: 1rem; text-align: right;">
                        <button class="mb-btn mb-btn-primary" onclick="addSelectedToMenu('page-list')">Tambahkan ke Menu</button>
                    </div>
                </div>
            </div>

            <!-- 2. NEWS CATEGORIES -->
            <div class="mb-accordion" id="acc-categories">
                <div class="mb-accordion-header" onclick="toggleAccordion('acc-categories')">
                    <span>Kategori Berita</span>
                    <span class="chevron">▶</span>
                </div>
                <div class="mb-accordion-content">
                    <input type="text" class="mb-search-input" placeholder="Cari kategori..." onkeyup="filterList('cat-list', this.value)">
                    <div class="mb-item-list" id="cat-list">
                        <label class="mb-list-item" style="border-bottom: 1px solid #334155; padding-bottom: 8px; margin-bottom: 4px; font-weight: bold;">
                            <input type="checkbox" onchange="toggleSelectAll('cat-list', this.checked)">
                            <span>Pilih Semua</span>
                        </label>
                        @foreach ($categories as $category)
                            <label class="mb-list-item cat-item">
                                <input type="checkbox" class="resource-checkbox" data-title="{{ $category->name }}" data-url="/berita?category={{ $category->slug }}" data-type="Kategori">
                                <span>{{ $category->name }}</span>
                            </label>
                        @endforeach
                    </div>
                    <div style="margin-top: 1rem; text-align: right;">
                        <button class="mb-btn mb-btn-primary" onclick="addSelectedToMenu('cat-list')">Tambahkan ke Menu</button>
                    </div>
                </div>
            </div>

            <!-- 3. STUDY PROGRAMS -->
            <div class="mb-accordion" id="acc-programs">
                <div class="mb-accordion-header" onclick="toggleAccordion('acc-programs')">
                    <span>Program Studi</span>
                    <span class="chevron">▶</span>
                </div>
                <div class="mb-accordion-content">
                    <input type="text" class="mb-search-input" placeholder="Cari program studi..." onkeyup="filterList('prog-list', this.value)">
                    <div class="mb-item-list" id="prog-list">
                        <label class="mb-list-item" style="border-bottom: 1px solid #334155; padding-bottom: 8px; margin-bottom: 4px; font-weight: bold;">
                            <input type="checkbox" onchange="toggleSelectAll('prog-list', this.checked)">
                            <span>Pilih Semua</span>
                        </label>
                        @foreach ($studyPrograms as $program)
                            <label class="mb-list-item prog-item">
                                <input type="checkbox" class="resource-checkbox" data-title="{{ $program->name }}" data-url="/program-studi/{{ $program->slug }}" data-type="Prodi">
                                <span>{{ $program->name }}</span>
                            </label>
                        @endforeach
                    </div>
                    <div style="margin-top: 1rem; text-align: right;">
                        <button class="mb-btn mb-btn-primary" onclick="addSelectedToMenu('prog-list')">Tambahkan ke Menu</button>
                    </div>
                </div>
            </div>

            <!-- 4. CUSTOM LINK -->
            <div class="mb-accordion" id="acc-custom">
                <div class="mb-accordion-header" onclick="toggleAccordion('acc-custom')">
                    <span>Custom Tautan / Link</span>
                    <span class="chevron">▶</span>
                </div>
                <div class="mb-accordion-content" style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <div>
                        <label style="font-size: 0.78rem; font-weight: 700; color: #94a3b8; display: block; margin-bottom: 4px;">Teks Tautan</label>
                        <input type="text" id="custom-title" class="mb-search-input" placeholder="Contoh: Beranda, Hubungi Kami">
                    </div>
                    <div>
                        <label style="font-size: 0.78rem; font-weight: 700; color: #94a3b8; display: block; margin-bottom: 4px;">URL Tautan</label>
                        <input type="text" id="custom-url" class="mb-search-input" placeholder="Contoh: /, /kontak, http://external-link.com">
                    </div>
                    <div style="text-align: right; margin-top: 0.5rem;">
                        <button class="mb-btn mb-btn-primary" onclick="addCustomLink()">Tambahkan ke Menu</button>
                    </div>
                </div>
            </div>

        </div>

        <!-- RIGHT CANVAS: Menu Items Sortable Builder -->
        <div style="grid-column: span 8;" class="col-span-12 md:col-span-8">
            <div class="menu-structure-card">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; border-bottom: 1px solid #334155; padding-bottom: 1rem;">
                    <div>
                        <h3 style="font-weight: 800; font-size: 1.25rem; color: #f1f5f9; margin-bottom: 4px;">Struktur Menu: {{ $menu->name }}</h3>
                        <p style="color: #94a3b8; font-size: 0.85rem; margin: 0;">Tarik & lepas item untuk mengurutkan. Gunakan tombol panah kiri/kanan untuk mengatur hierarki (Sub-menu).</p>
                    </div>
                    <button class="mb-btn mb-btn-primary" style="padding: 10px 20px; font-size: 0.9rem;" id="save-menu-btn" onclick="saveMenuStructure()">
                        💾 Simpan Struktur Menu
                    </button>
                </div>

                <!-- Global View Controls -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; background: #0f172a; padding: 10px 16px; border-radius: 10px; border: 1px solid #334155;">
                    <div style="font-size: 0.8rem; color: #94a3b8; font-weight: 700; display: flex; align-items: center; gap: 6px;">
                        <span>⚙️ Pilihan Tampilan:</span>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button type="button" class="mb-btn mb-btn-secondary" style="padding: 4px 12px; font-size: 0.75rem; font-weight: 700;" onclick="toggleAllSubmenus(true)">
                            📁 Sembunyikan Semua Sub-menu
                        </button>
                        <button type="button" class="mb-btn mb-btn-secondary" style="padding: 4px 12px; font-size: 0.75rem; font-weight: 700;" onclick="toggleAllSubmenus(false)">
                            📂 Tampilkan Semua Sub-menu
                        </button>
                    </div>
                </div>

                <!-- Main tree canvas -->
                <div class="menu-items-tree" id="menu-items-canvas">
                    <!-- Javascript will render items dynamically here -->
                    <div id="tree-placeholder" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 180px; color: #64748b; font-size: 0.95rem; text-align: center;">
                        <span>📋 Menu kosong.</span>
                        <span style="font-size: 0.82rem; margin-top: 4px;">Pilih halaman di sebelah kiri dan klik "Tambahkan ke Menu".</span>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- SCRIPT FOR DRAG AND DROP & HIERARCHICAL BUILDING -->
    <script>
        // Internal state
        let flatItems = [];
        let draggedIndex = null;

        // Accordion functionality
        function toggleAccordion(id) {
            const accordion = document.getElementById(id);
            const chevron = accordion.querySelector('.chevron');
            const isActive = accordion.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.mb-accordion').forEach(acc => {
                acc.classList.remove('active');
                acc.querySelector('.chevron').textContent = '▶';
            });

            if (!isActive) {
                accordion.classList.add('active');
                chevron.textContent = '▼';
            }
        }

        // Search filtering within list
        function filterList(listId, query) {
            const items = document.getElementById(listId).querySelectorAll('.mb-list-item:not(:first-child)');
            query = query.toLowerCase();
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? 'flex' : 'none';
            });
        }

        // Select All checkboxes toggle
        function toggleSelectAll(listId, isChecked) {
            const checkboxes = document.getElementById(listId).querySelectorAll('.resource-checkbox');
            checkboxes.forEach(cb => {
                if (cb.closest('.mb-list-item').style.display !== 'none') {
                    cb.checked = isChecked;
                }
            });
        }

        // Initialize state with existing items recursively
        const existingItems = @json($existingItems);
        
        function flattenExistingItems(items, depth = 0) {
            items.forEach(item => {
                flatItems.push({
                    id: item.id || 'old_' + Math.random(),
                    title: item.title,
                    url: item.url || '',
                    type: item.url ? (item.url.includes('category') ? 'Kategori' : (item.url.includes('program-studi') ? 'Prodi' : 'Page')) : 'Custom Link',
                    depth: depth,
                    isExpanded: false,
                    isChildrenCollapsed: false
                });
                if (item.children && item.children.length > 0) {
                    flattenExistingItems(item.children, depth + 1);
                }
            });
        }

        if (existingItems && existingItems.length > 0) {
            flattenExistingItems(existingItems);
        }

        // Get count of nested children under itemIndex
        function getItemWithChildrenBlock(parentIndex) {
            const parent = flatItems[parentIndex];
            let count = 1;
            for (let i = parentIndex + 1; i < flatItems.length; i++) {
                if (flatItems[i].depth > parent.depth) {
                    count++;
                } else {
                    break;
                }
            }
            return count;
        }

        // Toggle collapse of individual parent submenu
        function toggleChildrenCollapse(index) {
            flatItems[index].isChildrenCollapsed = !flatItems[index].isChildrenCollapsed;
            renderCanvas();
        }

        // Toggle all submenus collapse/expand state
        function toggleAllSubmenus(collapse) {
            flatItems.forEach(item => {
                // Only collapse items that actually have children to keep UI logical
                item.isChildrenCollapsed = collapse;
            });
            renderCanvas();
        }

        // Render Canvas
        function renderCanvas() {
            const canvas = document.getElementById('menu-items-canvas');
            const placeholder = document.getElementById('tree-placeholder');
            
            // Clear items (except placeholder)
            const oldItems = canvas.querySelectorAll('.draggable-item');
            oldItems.forEach(el => el.remove());

            if (flatItems.length === 0) {
                placeholder.style.display = 'flex';
                return;
            } else {
                placeholder.style.display = 'none';
            }

            let hiddenDepthThreshold = 99;

            flatItems.forEach((item, index) => {
                // If current item depth is inside a collapsed parent threshold, skip rendering it!
                if (item.depth >= hiddenDepthThreshold) {
                    return;
                }

                // If we get past the filter, reset the hidden depth threshold
                hiddenDepthThreshold = 99;

                // If this item itself is collapsed, hide all deeper items immediately following it
                if (item.isChildrenCollapsed) {
                    hiddenDepthThreshold = item.depth + 1;
                }

                const el = document.createElement('div');
                el.className = 'draggable-item';
                el.draggable = true;
                el.dataset.index = index;
                el.dataset.depth = item.depth;
                el.style.marginLeft = `${item.depth * 32}px`;

                // Drag & Drop event bindings
                el.addEventListener('dragstart', (e) => handleDragStart(index, e));
                el.addEventListener('dragover', (e) => handleDragOver(index, e));
                el.addEventListener('dragleave', (e) => handleDragLeave(e));
                el.addEventListener('drop', (e) => handleDrop(index, e));
                el.addEventListener('dragend', () => handleDragEnd());

                // Enable/disable navigation helpers
                const isFirst = index === 0;
                const isLast = index === flatItems.length - 1;
                const canIndent = index > 0 && item.depth < 2 && item.depth <= flatItems[index - 1].depth;
                const canOutdent = item.depth > 0;

                // Check if this item has children in the full array list
                const hasChildren = (index < flatItems.length - 1) && (flatItems[index + 1].depth > item.depth);
                
                let collapseBtnHtml = '';
                if (hasChildren) {
                    collapseBtnHtml = `
                        <button type="button" class="mb-collapse-toggle" title="${item.isChildrenCollapsed ? 'Tampilkan Sub-menu' : 'Sembunyikan Sub-menu'}" onclick="toggleChildrenCollapse(${index})">
                            ${item.isChildrenCollapsed ? '📁' : '📂'}
                        </button>
                    `;
                }

                el.innerHTML = `
                    <div class="draggable-item-header">
                        <div class="draggable-handle">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 6px;"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                            ${collapseBtnHtml}
                            <span style="font-weight: 600;">${escapeHtml(item.title)}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <span class="draggable-item-type">${item.type}</span>
                            <div class="draggable-item-actions">
                                <button title="Geser Kiri (Parent)" onclick="changeDepth(${index}, -1)" ${!canOutdent ? 'disabled' : ''}>◀</button>
                                <button title="Geser Kanan (Child)" onclick="changeDepth(${index}, 1)" ${!canIndent ? 'disabled' : ''}>▶</button>
                                <button title="Pindah Atas" onclick="moveItem(${index}, -1)" ${isFirst ? 'disabled' : ''}>▲</button>
                                <button title="Pindah Bawah" onclick="moveItem(${index}, 1)" ${isLast ? 'disabled' : ''}>▼</button>
                                <button title="Detail / Edit" onclick="toggleDetails(${index})" style="background: #334155; font-weight: bold;">
                                    ${item.isExpanded ? '▲' : '▼'}
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    ${item.isExpanded ? `
                        <div class="draggable-item-details">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div>
                                    <label>Teks Navigasi</label>
                                    <input type="text" value="${escapeHtml(item.title)}" oninput="updateItemField(${index}, 'title', this.value)">
                                </div>
                                <div>
                                    <label>Link / URL</label>
                                    <input type="text" value="${escapeHtml(item.url)}" oninput="updateItemField(${index}, 'url', this.value)" ${item.type !== 'Custom Link' ? 'disabled style="opacity: 0.6; cursor: not-allowed;"' : ''}>
                                </div>
                            </div>
                            <div style="text-align: right; margin-top: 8px;">
                                <button class="mb-btn mb-btn-danger" style="padding: 4px 12px; font-size: 0.78rem;" onclick="removeItem(${index})">🗑️ Hapus</button>
                            </div>
                        </div>
                    ` : ''}
                `;

                canvas.appendChild(el);
            });
        }

        // Helpers
        function escapeHtml(text) {
            if (!text) return '';
            return text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        // Toggle Details
        function toggleDetails(index) {
            flatItems[index].isExpanded = !flatItems[index].isExpanded;
            renderCanvas();
        }

        // Update Field
        function updateItemField(index, field, value) {
            flatItems[index][field] = value;
        }

        // Remove Item
        function removeItem(index) {
            if (confirm('Hapus item menu ini?')) {
                flatItems.splice(index, 1);
                renderCanvas();
            }
        }

        // Change Indentation Level (depth)
        function changeDepth(index, offset) {
            const item = flatItems[index];
            const newDepth = Math.max(0, Math.min(2, item.depth + offset));
            
            // Check constraint: first item is always depth 0
            if (index === 0 && newDepth > 0) return;

            item.depth = newDepth;
            renderCanvas();
        }

        // Move Item in Array (Up/Down) - Moves parent together with children as a block
        function moveItem(index, offset) {
            const blockSize = getItemWithChildrenBlock(index);
            
            if (offset < 0) {
                // Moving Up
                if (index === 0) return;
                
                // Find start index of preceding block
                let precedingParentIndex = index - 1;
                while (precedingParentIndex > 0 && flatItems[precedingParentIndex].depth > flatItems[index].depth) {
                    precedingParentIndex--;
                }
                
                // Splice current block
                const block = flatItems.splice(index, blockSize);
                // Insert it before the preceding block
                flatItems.splice(precedingParentIndex, 0, ...block);
            } else {
                // Moving Down
                const nextBlockIndex = index + blockSize;
                if (nextBlockIndex >= flatItems.length) return;
                
                const nextBlockSize = getItemWithChildrenBlock(nextBlockIndex);
                
                // Splice current block
                const block = flatItems.splice(index, blockSize);
                // Insert it after the next block
                flatItems.splice(nextBlockIndex + nextBlockSize - blockSize, 0, ...block);
            }

            // Adjust depth if first item depth is not 0
            if (flatItems[0].depth > 0) {
                flatItems[0].depth = 0;
            }

            renderCanvas();
        }

        // Add checked resources to menu list
        function addSelectedToMenu(listId) {
            const list = document.getElementById(listId);
            const checkboxes = list.querySelectorAll('.resource-checkbox:checked');
            
            if (checkboxes.length === 0) {
                alert('Pilih minimal satu item untuk ditambahkan.');
                return;
            }

            checkboxes.forEach(cb => {
                flatItems.push({
                    id: 'new_' + Math.random(),
                    title: cb.dataset.title,
                    url: cb.dataset.url,
                    type: cb.dataset.type,
                    depth: 0,
                    isExpanded: false,
                    isChildrenCollapsed: false
                });
                cb.checked = false; // reset
            });

            // Reset Select All
            const selectAllCb = list.querySelector('input[type="checkbox"]');
            if (selectAllCb) selectAllCb.checked = false;

            renderCanvas();
        }

        // Add custom link
        function addCustomLink() {
            const titleEl = document.getElementById('custom-title');
            const urlEl = document.getElementById('custom-url');
            
            const title = titleEl.value.trim();
            const url = urlEl.value.trim();

            if (!title || !url) {
                alert('Teks tautan dan URL tidak boleh kosong.');
                return;
            }

            flatItems.push({
                id: 'new_' + Math.random(),
                title: title,
                url: url,
                type: 'Custom Link',
                depth: 0,
                isExpanded: false,
                isChildrenCollapsed: false
            });

            titleEl.value = '';
            urlEl.value = '';
            renderCanvas();
        }

        // Drag & Drop Handlers
        function handleDragStart(index, e) {
            draggedIndex = index;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', index);
            setTimeout(() => {
                e.target.style.opacity = '0.4';
            }, 0);
        }

        function handleDragOver(index, e) {
            e.preventDefault();
            if (draggedIndex === index) return;
            e.currentTarget.classList.add('drag-over');
        }

        function handleDragLeave(e) {
            e.currentTarget.classList.remove('drag-over');
        }

        function handleDrop(index, e) {
            e.preventDefault();
            e.currentTarget.classList.remove('drag-over');

            if (draggedIndex === null || draggedIndex === index) return;

            // Get size of block for dragged item (so parent and all nested children move together)
            const draggedBlockSize = getItemWithChildrenBlock(draggedIndex);
            const draggedBlock = flatItems.splice(draggedIndex, draggedBlockSize);

            // Calculate target index after splice
            let targetIndex = index;
            if (draggedIndex < index) {
                targetIndex = index - draggedBlockSize + 1;
            }

            // Insert block at target index
            flatItems.splice(targetIndex, 0, ...draggedBlock);

            // Constraint: first item must be depth 0
            if (flatItems[0].depth > 0) {
                flatItems[0].depth = 0;
            }

            renderCanvas();
        }

        function handleDragEnd() {
            document.querySelectorAll('.draggable-item').forEach(el => {
                el.style.opacity = '1';
                el.classList.remove('drag-over');
            });
            draggedIndex = null;
        }

        // Build parent/child nested tree from the flat items list with depths
        function buildHierarchyTree() {
            const tree = [];
            const stack = []; // keeps parent nodes at each level

            flatItems.forEach(item => {
                const node = {
                    title: item.title,
                    url: item.url,
                    children: []
                };

                const depth = item.depth;

                if (depth === 0) {
                    tree.push(node);
                    stack[0] = node;
                } else {
                    const parent = stack[depth - 1];
                    if (parent) {
                        parent.children.push(node);
                        stack[depth] = node;
                    } else {
                        // Fallback in case of invalid formatting (e.g. depth 2 with no depth 1 parent)
                        tree.push(node);
                        stack[0] = node;
                    }
                }
            });

            return tree;
        }

        // Save Menu Structure via AJAX call
        async function saveMenuStructure() {
            const btn = document.getElementById('save-menu-btn');
            const originalText = btn.textContent;
            
            btn.textContent = '⏳ Menyimpan...';
            btn.disabled = true;

            const tree = buildHierarchyTree();

            try {
                const response = await fetch('{{ route("admin.menu-builder.save", ["menu" => $menu->id]) }}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': '{{ csrf_token() }}'
                    },
                    body: JSON.stringify({ structure: tree })
                });

                const res = await response.json();
                
                if (res.status === 'success') {
                    // Show a beautiful Filament notification or native alert
                    alert('✨ ' + res.message);
                    window.location.reload();
                } else {
                    alert('❌ Gagal menyimpan menu: ' + res.message);
                }
            } catch (error) {
                console.error(error);
                alert('❌ Terjadi kesalahan jaringan. Gagal menghubungi server.');
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        }

        // Trigger initial render
        document.addEventListener('DOMContentLoaded', () => {
            renderCanvas();
        });
    </script>
</x-filament-panels::page>
