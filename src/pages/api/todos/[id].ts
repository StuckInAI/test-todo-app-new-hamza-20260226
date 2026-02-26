import { NextApiRequest, NextApiResponse } from 'next'
import { getRepository } from '@/lib/database'
import { Todo } from '@/entities/Todo'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const repository = await getRepository(Todo)

  if (req.method === 'PUT') {
    const todo = await repository.findOne({ where: { id: Number(id) } })
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' })
    }
    
    const { task, completed } = req.body
    if (task !== undefined) {
      if (typeof task !== 'string' || task.trim() === '') {
        return res.status(400).json({ error: 'Task must be a non-empty string' })
      }
      todo.task = task.trim()
    }
    if (completed !== undefined) {
      if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Completed must be a boolean' })
      }
      todo.completed = completed
    }
    
    todo.updatedAt = new Date()
    await repository.save(todo)
    res.status(200).json(todo)
  } else if (req.method === 'DELETE') {
    const todo = await repository.findOne({ where: { id: Number(id) } })
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' })
    }
    
    await repository.remove(todo)
    res.status(204).end()
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}