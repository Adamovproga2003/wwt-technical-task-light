import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
	Button,
	Checkbox,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text
} from '@chakra-ui/react'

import { Todo, TodoState, useTodoStore } from '@store'

type Props = {
	isOpen: boolean
	onClose: () => void
	todo: Todo | null
}
export const EditModal = ({ isOpen, onClose, todo }: Props) => {
	const { t } = useTranslation('translation')
	const [title, setTitle] = useState('')
	const [isCompleted, setCompleted] = useState(false)
	const updateTodo = useTodoStore((state: TodoState) => state.updateTodo)

	useEffect(() => {
		todo?.title && setTitle(todo.title)
		setCompleted(Boolean(todo?.isCompleted))
	}, [todo])

	const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
		setTitle(e.target.value)

	const handleCheckTodo = () => setCompleted(prev => !prev)

	const saveTodo = () => {
		if (todo) {
			const updatedTodo: Todo = {
				id: todo.id,
				title,
				isCompleted
			}
			updateTodo(updatedTodo)
		}
		onClose()
	}
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{t`Edit todo`}</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel>{t`Title`}</FormLabel>
						<Input
							placeholder="Title todo..."
							value={title}
							onChange={handleChangeTitle}
						/>
					</FormControl>

					<FormControl mt={4}>
						<Checkbox
							isChecked={isCompleted}
							onChange={handleCheckTodo}
						>
							<Text
								width="100%"
								fontSize="2xl"
							>
								{t`Completed`}
							</Text>
						</Checkbox>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button
						colorScheme="blue"
						mr={3}
						onClick={saveTodo}
					>
						{t`Save`}
					</Button>
					<Button onClick={onClose}>{t`Cancel`}</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
