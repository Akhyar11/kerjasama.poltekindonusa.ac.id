<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MenuBuilderController extends Controller
{
    /**
     * Save the hierarchical menu structure sent from the WordPress-style builder.
     */
    public function save(Request $request, $menuId)
    {
        $menu = Menu::findOrFail($menuId);
        $structure = $request->input('structure', []);

        try {
            DB::transaction(function () use ($menu, $structure) {
                // Delete all existing menu items for this menu
                $menu->items()->delete();

                // Recursively save new menu items
                $this->saveMenuItemsRecursively($structure, $menu->id, null);
            });

            return response()->json([
                'status' => 'success',
                'message' => 'Struktur menu berhasil disimpan!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal menyimpan menu: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Recursively save menu items and their children.
     */
    private function saveMenuItemsRecursively(array $items, $menuId, $parentId = null)
    {
        foreach ($items as $index => $item) {
            $menuItem = MenuItem::create([
                'menu_id' => $menuId,
                'parent_id' => $parentId,
                'title' => $item['title'] ?? '',
                'url' => $item['url'] ?? null,
                'order' => $index + 1
            ]);

            if (!empty($item['children']) && is_array($item['children'])) {
                $this->saveMenuItemsRecursively($item['children'], $menuId, $menuItem->id);
            }
        }
    }
}
