import { Todo } from '@/entities/Todo'
import { useState } from 'react'

interface TodoListProps {
  todos: Todo[]
  onDelete: (id: number) => void
  onToggle: (id: number, completed: boolean) => void
  onEdit: (id: number, task: string) => void
}

export default function TodoList({ todos, onDelete, onToggle, onEdit }: TodoListProps) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTask, setEditTask] = useState('')

  const handleEditStart = (todo: Todo) => {
    setEditingId(todo.id)
    setEditTask(todo.task)
  }

  const handleEditSave = (id: number) => {
    if (editTask.trim()) {
      onEdit(id, editTask)
      setEditingId(null)
      setEditTask('')
    }
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditTask('')
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No fitness tasks yet. Add one above to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Fitness Tasks</h2>
      <ul className="divide-y divide-gray-200">
        {todos.map((todo) => (
          <li key={todo.id} className="py-4 flex items-center justify-between">
            <div className="flex items-center flex-1">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id, todo.completed)}
                className="h-5 w-5 text-green-600 rounded focus:ring-green-500"
              />
              <div className="ml-4 flex-1">
                {editingId === todo.id ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={editTask}
                      onChange={(e) => setEditTask(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1 flex-1 mr-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      autoFocus
                    />
                    <button
                      onClick={() => handleEditSave(todo.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <span 
                      className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                    >
                      {todo.task}
                    </span>
                    <span className="ml-3 inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      {todo.category}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      Created: {todo.createdAt.toLocaleDateString()} | 
                      Updated: {todo.updatedAt.toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {editingId !== todo.id && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditStart(todo)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}