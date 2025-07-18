import { Item } from '../models/Item';

let items: Item[] = [];
let nextId = 1;

export function getAllItems(): Item[] {
  return items;
}

export function getItemById(id: number): Item | undefined {
  return items.find(item => item.id === id);
}

export function createItem(data: Omit<Item, 'id' | 'dateOfCreation'>): Item {
  const newItem: Item = {
    id: nextId++,
    name: data.name,
    description: data.description,
    dateOfCreation: new Date(),
  };
  items.push(newItem);
  return newItem;
}

export function updateItem(id: number, data: Partial<Omit<Item, 'id' | 'dateOfCreation'>>): Item | undefined {
  const item = items.find(i => i.id === id);
  if (!item) return undefined;
  if (data.name !== undefined) item.name = data.name;
  if (data.description !== undefined) item.description = data.description;
  return item;
}

export function deleteItem(id: number): boolean {
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
} 