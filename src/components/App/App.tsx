import { useTranslation } from 'react-i18next'

import { Box, Heading } from '@chakra-ui/react'

import { ListForm } from '@components/ListTodos'
import { TodoForm } from '@components/TodoForm'

export const App = () => {
	const { t } = useTranslation('translation')
	return (
		<Box>
			<Heading
				as="h1"
				size="4xl"
				noOfLines={1}
				textAlign="center"
				marginBlock="30px"
				textTransform="uppercase"
				fontWeight="extrabold"
			>
				{t`Todo App`}
			</Heading>

			<TodoForm />
			<ListForm />
		</Box>
	)
}
