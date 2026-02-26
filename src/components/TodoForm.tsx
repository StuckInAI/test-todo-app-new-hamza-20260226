import { useState } from 'react'

interface TodoFormProps {
  onAdd: (task: string) => void
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [task, setTask] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (task.trim() === '') {
      setError('Task cannot be empty')
      return
    }
    setError('')
    onAdd(task)
    setTask('')
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Fitness Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={task}
            onChange={(e) => {
              setTask(e.target.value)
              setError('')
            }}
            placeholder="E.g., 30-minute morning run, Drink 8 glasses of water"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Task
          </button>
        </div>
        {error && (
          <p className="text-red-600 mt-2">{error}</p>
        )}
        <p className="text-gray-600 text-sm mt-3">
          Tasks will be automatically categorized under <strong>Health & Fitness</strong>.
        </p>
      </form>
    </div>
  )
}