import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
	Box,
	Button,
	Checkbox,
	Divider,
	Grid,
	GridItem,
	Heading,
	List,
	ListItem,
	Text,
	useDisclosure
} from '@chakra-ui/react'

import { EditModal } from '@components/EditModal'
import { Todo, TodoState, useTodoStore } from '@store'

type Props = {
	headline: string
	items: Todo[]
}

export const FilteredList = ({ headline, items }: Props) => {
	const { t } = useTranslation('translation')
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { updateTodo, removeTodo } = useTodoStore((state: TodoState) => state)
	const [editTodo, setEditTodo] = useState<Todo | null>(null)

	const handleCheckTodo = (todo: Todo) => {
		const updatedTodo = {
			...todo,
			isCompleted: !todo.isCompleted
		}
		updateTodo(updatedTodo)
	}

	const handleDeleteTodo = (id: number) => removeTodo(id)
	const handleOpenModal = (todo: Todo) => {
		setEditTodo(todo)
		onOpen()
	}

	const onHandleClose = () => {
		setEditTodo(null)
		onClose()
	}

	return (
		<>
			<Heading
				as="h3"
				size="lg"
			>
				{headline}
			</Heading>
			<Divider />
			{items.length === 0 && (
				<Box
					backgroundColor="#F3F7FA"
					borderRadius={10}
					height={200}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<Text
						as="p"
						fontSize="xl"
					>{t`Empty list...`}</Text>
				</Box>
			)}
			{items.length > 0 && (
				<List
					spacing={3}
					overflowY="auto"
					maxHeight={200}
					minHeight={200}
				>
					{items.map((todo: Todo) => (
						<ListItem key={todo.id}>
							<Grid
								templateColumns="1fr auto"
								gap={4}
							>
								<GridItem>
									<Checkbox
										isChecked={todo.isCompleted}
										onChange={() => handleCheckTodo(todo)}
										width="100%"
									>
										<Text
											width="100%"
											fontSize="2xl"
										>
											{todo.title}
										</Text>
									</Checkbox>
								</GridItem>
								<GridItem>
									<Button
										backgroundColor="transparent"
										height="100%"
										width="fit-content"
										onClick={() => handleOpenModal(todo)}
									>
										<EditIcon />
									</Button>
									<Button
										backgroundColor="transparent"
										height="100%"
										width="fit-content"
										onClick={() => handleDeleteTodo(todo.id)}
									>
										<DeleteIcon />
									</Button>
								</GridItem>
							</Grid>
						</ListItem>
					))}
				</List>
			)}
			<EditModal
				isOpen={isOpen}
				onClose={onHandleClose}
				todo={editTodo}
			/>
		</>
	)
}
