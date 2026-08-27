// Server Component — fetches menu and settings on the server (no CORS issues)
import { fetchAPI } from "@/lib/api";
import { Menu, MenuItem, Settings } from "@/lib/types";
import NavbarClient from "./NavbarClient";

function flattenMenuItems(items: MenuItem[]): MenuItem[] {
  const flat: MenuItem[] = [];
  const traverse = (item: MenuItem) => {
    const { children, ...rest } = item;
    flat.push(rest as MenuItem);
    if (children && children.length > 0) {
      children.forEach(traverse);
    }
  };
  items.forEach(traverse);
  return flat;
}

function buildMenuTree(items: MenuItem[]): MenuItem[] {
  const itemMap: Record<number, MenuItem & { children: MenuItem[] }> = {};
  
  // 1. Initialize map
  items.forEach(item => {
    itemMap[item.id] = { ...item, children: [] };
  });
  
  const rootItems: MenuItem[] = [];
  
  // 2. Link children to parents
  items.forEach(item => {
    const mappedItem = itemMap[item.id];
    if (item.parent_id !== null && itemMap[item.parent_id]) {
      itemMap[item.parent_id].children.push(mappedItem);
    } else {
      rootItems.push(mappedItem);
    }
  });
  
  // 3. Sort recursively
  const sortItems = (arr: MenuItem[]) => {
    arr.sort((a, b) => a.order - b.order);
    arr.forEach(item => {
      if (item.children && item.children.length > 0) {
        sortItems(item.children);
      }
    });
  };
  
  sortItems(rootItems);
  return rootItems;
}

async function getNavbarData(): Promise<{ menuItems: MenuItem[]; settings: Settings }> {
  try {
    const settings = await fetchAPI<Settings>("/settings");

    const staticMenuItems: MenuItem[] = [
      { id: 1, menu_id: 1, parent_id: null, title: "Home", url: "/", order: 1, children: [] },
      { 
        id: 2, menu_id: 1, parent_id: null, title: "Profil", url: null, order: 2, 
        children: [
          { id: 21, menu_id: 1, parent_id: 2, title: "Profil", url: "/profil", order: 1, children: [] },
          { id: 22, menu_id: 1, parent_id: 2, title: "Struktur Organisasi", url: "/struktur-organisasi", order: 2, children: [] }
        ] 
      },
      { id: 3, menu_id: 1, parent_id: null, title: "Berita", url: "/berita", order: 3, children: [] },
      { id: 4, menu_id: 1, parent_id: null, title: "Mitra Kerjasama", url: "/mitra-kerjasama", order: 4, children: [] },

      { id: 6, menu_id: 1, parent_id: null, title: "Gallery", url: "/gallery", order: 6, children: [] },
      { id: 7, menu_id: 1, parent_id: null, title: "Kontak", url: "/kontak", order: 7, children: [] },
    ];
    
    return { menuItems: staticMenuItems, settings: settings ?? {} };
  } catch (error: any) {
    console.warn("Failed to load navbar data: " + (error.message || error));
    return { menuItems: [], settings: {} as Settings };
  }
}

export default async function Navbar() {
  const { menuItems, settings } = await getNavbarData();
  return <NavbarClient menuItems={menuItems} settings={settings} />;
}
