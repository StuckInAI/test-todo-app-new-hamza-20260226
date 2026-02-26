import { NextApiRequest, NextApiResponse } from 'next'
import { getRepository } from '@/lib/database'
import { Todo } from '@/entities/Todo'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const repository = await getRepository(Todo)

  if (req.method === 'GET') {
    const todos = await repository.find({ order: { createdAt: 'DESC' } })
    res.status(200).json(todos)
  } else if (req.method === 'POST') {
    const { task } = req.body
    if (!task || typeof task !== 'string') {
      return res.status(400).json({ error: 'Task is required and must be a string' })
    }
    
    const todo = new Todo()
    todo.task = task.trim()
    todo.category = 'Health & Fitness'
    todo.completed = false
    todo.createdAt = new Date()
    todo.updatedAt = new Date()
    
    const savedTodo = await repository.save(todo)
    res.status(201).json(savedTodo)
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}