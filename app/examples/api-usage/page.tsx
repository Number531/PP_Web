"use client"

import { useState } from "react"
import { demoApi, ApiError } from "@/lib/api"
import { useGet, usePost } from "@/lib/api/hooks"

interface Todo {
  id: number
  title: string
  completed: boolean
}

export default function ApiExamplePage() {
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  // Example of using the useGet hook with the demo API
  const [todosState, refetchTodos] = useGet<Todo[]>("todos", {
    cache: true,
    deduplicate: true,
    retry: {
      count: 3,
      delay: 1000,
    },
  })

  // Example of using the usePost hook with the demo API
  const [createTodoState, createTodo] = usePost<Todo>("todos")

  // Example of direct API usage
  const handleCreateTodo = async () => {
    if (!title.trim()) {
      setError("Title is required")
      return
    }

    setError(null)

    try {
      const newTodo = await demoApi.post<Todo>("todos", {
        title,
        completed: false,
      })

      console.log("Created todo:", newTodo)
      setTitle("")
      refetchTodos()
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message)
      } else {
        setError("An unknown error occurred")
      }
    }
  }

  // Example of using auth service
  const handleLogin = async () => {
    try {
      // This is a simulated login since we're using a demo API
      // In a real app, this would make a real API call
      console.log("Simulating login...")

      // For demo purposes, we'll just log a success message
      console.log("Logged in successfully!")
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message)
      } else {
        setError("An unknown error occurred")
      }
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Usage Examples</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Create Todo</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo title"
            className="px-4 py-2 border rounded flex-1"
          />
          <button
            onClick={handleCreateTodo}
            disabled={createTodoState.isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {createTodoState.isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Todos</h2>
        {todosState.isLoading ? (
          <p>Loading todos...</p>
        ) : todosState.isError ? (
          <p className="text-red-500">Error: {todosState.error?.message}</p>
        ) : (
          <ul className="space-y-2">
            {todosState.data?.slice(0, 10).map((todo) => (
              <li key={todo.id} className="p-2 border rounded">
                <span className={todo.completed ? "line-through" : ""}>{todo.title}</span>
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => refetchTodos()} className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Refresh
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Authentication</h2>
        <button onClick={handleLogin} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Simulate Login
        </button>
      </div>
    </div>
  )
}
