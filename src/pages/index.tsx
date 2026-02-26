import { useEffect, useState } from 'react'
import TodoList from '@/components/TodoList'
import TodoForm from '@/components/TodoForm'
import { Todo } from '@/entities/Todo'

type ApiTodo = {
  id: number
  task: string
  category: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos')
      if (response.ok) {
        const data: ApiTodo[] = await response.json()
        const mappedTodos = data.map(todo => ({
          id: todo.id,
          task: todo.task,
          category: todo.category,
          completed: todo.completed,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt)
        }))
        setTodos(mappedTodos)
      }
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleAddTodo = async (task: string) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task })
    })
    if (response.ok) {
      fetchTodos()
    }
  }

  const handleDeleteTodo = async (id: number) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'DELETE'
    })
    if (response.ok) {
      fetchTodos()
    }
  }

  const handleToggleTodo = async (id: number, completed: boolean) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    })
    if (response.ok) {
      fetchTodos()
    }
  }

  const handleEditTodo = async (id: number, task: string) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task })
    })
    if (response.ok) {
      fetchTodos()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Fitness Todo Tracker</h1>
          <p className="text-gray-600">Track your health and fitness tasks with ease</p>
        </header>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <TodoForm onAdd={handleAddTodo} />
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading todos...</p>
          ) : (
            <TodoList 
              todos={todos} 
              onDelete={handleDeleteTodo} 
              onToggle={handleToggleTodo} 
              onEdit={handleEditTodo}
            />
          )}
        </div>
        
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>All tasks are categorized under <strong>Health & Fitness</strong> by default.</p>
        </footer>
      </div>
    </div>
  )
}