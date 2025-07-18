import { Request, Response } from 'express';
import * as itemService from '../services/itemService';

export function getAll(req: Request, res: Response) {
  res.json(itemService.getAllItems());
}

export function getById(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const item = itemService.getItemById(id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
}

export function create(req: Request, res: Response) {
  const { name, description } = req.body;
  if (!name || !description) return res.status(400).json({ message: 'Name and description required' });
  const item = itemService.createItem({ name, description });
  res.status(201).json(item);
}

export function update(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const item = itemService.updateItem(id, req.body);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
}

export function remove(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const success = itemService.deleteItem(id);
  if (!success) return res.status(404).json({ message: 'Item not found' });
  res.status(204).send();
} 