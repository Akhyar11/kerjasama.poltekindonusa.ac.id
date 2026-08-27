const fs = require('fs');
const flat = [
 {
 "id": 1,
 "menu_id": 1,
 "parent_id": null,
 "title": "Profil",
 "url": null,
 "order": 1,
 },
 {
 "id": 4,
 "menu_id": 1,
 "parent_id": null,
 "title": "Akademik",
 "url": null,
 "order": 2,
 },
 {
 "id": 5,
 "menu_id": 1,
 "parent_id": 4,
 "title": "Program Studi",
 "url": "/program-studi",
 "order": 1,
 },
 {
 "id": 6,
 "menu_id": 1,
 "parent_id": 4,
 "title": "Berita",
 "url": "/berita",
 "order": 2,
 },
 {
 "id": 8,
 "menu_id": 1,
 "parent_id": 4,
 "title": "Jurnal",
 "url": "#",
 "order": 3,
 },
 {
 "id": 9,
 "menu_id": 1,
 "parent_id": 4,
 "title": "Organisasi Kampus",
 "url": "/organisasi-kampus",
 "order": 4,
 }
];

function buildMenuTree(items) {
  const itemMap = {};
  items.forEach(item => { itemMap[item.id] = { ...item, children: [] }; });
  const rootItems = [];
  items.forEach(item => {
    const mappedItem = itemMap[item.id];
    if (item.parent_id !== null && itemMap[item.parent_id]) {
      itemMap[item.parent_id].children.push(mappedItem);
    } else {
      rootItems.push(mappedItem);
    }
  });
  const sortItems = (arr) => {
    arr.sort((a, b) => a.order - b.order);
    arr.forEach(item => {
      if (item.children && item.children.length > 0) sortItems(item.children);
    });
  };
  sortItems(rootItems);
  return rootItems;
}

console.log(JSON.stringify(buildMenuTree(flat), null, 2));
