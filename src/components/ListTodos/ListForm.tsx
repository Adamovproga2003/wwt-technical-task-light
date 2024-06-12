import { Stack } from '@chakra-ui/react'

import { FilteredList } from '@components/List/FilteredList'
import { Todo, TodoState, useTodoStore } from '@store'

export const ListForm = () => {
	const todos = useTodoStore((state: TodoState) => state.todos)

	return (
		<Stack
			maxW={960}
			width="100%"
			margin="auto"
		>
			<FilteredList
				headline="&#9203; Uncompleted tasks"
				items={todos.filter((todo: Todo) => !todo.isCompleted)}
			/>
			<FilteredList
				headline="&#9989; Completed tasks"
				items={todos.filter((todo: Todo) => todo.isCompleted)}
			/>
		</Stack>
	)
}
