import Head from 'next/head'
import React from 'react'
import { useTranslation } from 'react-i18next'

import TodosList from '../src/scenes/TodosList'
import { GlobalStyle } from '../src/styles'

const Home = () => {
	const { t } = useTranslation()
	return (
		<React.Fragment>
			<Head>
				<title>{t('main.title')}</title>
			</Head>
			<GlobalStyle />
			<TodosList />
		</React.Fragment>
	)
}

export default Home
