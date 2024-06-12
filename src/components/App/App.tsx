import { useTranslation } from 'react-i18next'

import { Box } from '@chakra-ui/react'

import { TodoForm } from '@components/TodoForm'

export const App = () => {
	const { t } = useTranslation('translation')
	return (
		<Box
			maxW="90rem"
			mx="auto"
			minH="100dvh"
		>
			<h1
				style={{ textAlign: 'center', fontSize: 40, marginBottom: 10 }}
			>{t`Todo App`}</h1>
			<TodoForm />
		</Box>
	)
}
