import { create } from 'zustand'

export interface Todo {
	id: number
	title: string
	isCompleted: boolean
}

export interface TodoState {
	todos: Todo[]
	addTodo: (todo: Todo) => void
	removeTodo: (id: number) => void
	updateTodo: (todo: Todo) => void
}

export const useTodoStore = create<TodoState>(set => ({
	todos: [],
	addTodo: (todo: Todo) =>
		set((state: TodoState) => ({ todos: [...state.todos, todo] })),
	removeTodo: (id: number) =>
		set((state: TodoState) => ({
			todos: [...state.todos.filter(todo => todo.id !== id)]
		})),
	updateTodo: (todo: Todo) =>
		set((state: TodoState) => ({
			todos: state.todos.map(t => (t.id === todo.id ? todo : t))
		}))
}))
