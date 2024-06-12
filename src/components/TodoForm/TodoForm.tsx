import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Input, Stack, Wrap, WrapItem } from '@chakra-ui/react'

import { Todo, TodoState, useTodoStore } from '@store'

export const TodoForm = () => {
	const { t } = useTranslation('translation')
	const [value, setValue] = useState('')
	const addTodo = useTodoStore((state: TodoState) => state.addTodo)

	const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
		setValue(e.target.value)

	const handleAddTodo = () => {
		const todo: Todo = {
			id: new Date().valueOf(),
			title: value,
			isCompleted: false
		}

		addTodo(todo)
		setValue('')
	}

	return (
		<Stack
			direction="column"
			alignItems="center"
			maxW={960}
			width="100%"
			margin="auto"
			marginBottom={5}
		>
			<Wrap
				align="center"
				spacing={5}
			>
				<WrapItem>
					<Input
						placeholder="Todo title..."
						value={value}
						onChange={handleChangeInput}
					/>
				</WrapItem>
				<WrapItem>
					<Button
						isDisabled={!value}
						colorScheme="blue"
						onClick={handleAddTodo}
					>{t`Add`}</Button>
				</WrapItem>
			</Wrap>
		</Stack>
	)
}
