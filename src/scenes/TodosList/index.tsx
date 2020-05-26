import { useMutation, useQuery } from '@apollo/react-hooks'
import clsx from 'clsx'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
	BatchCheckbox,
	BatchCheckboxLabel,
	Filter,
	FilterLink,
	FilterWrapper,
	Footer,
	H1,
	MainSection,
	NewTodoInput,
	Section,
	Todo,
	TodoCount,
	TodoList,
	Toggle,
	ToggleLabel
} from './components'
import { WithApolloProvider } from './components/WithApolloProvider'
import {
	ADD_TODO,
	GET_TODOS,
	REMOVE_TODO,
	SWITCH_CHECK
} from './helpers/queries'

export interface Todo {
	id: string
	text: string
	createdTimestamp: string
	checked: boolean
}

enum FilterEnum {
	ALL,
	ACTIVE,
	COMPLETED
}

const TodosList = () => {
	const { t } = useTranslation()

	const [filter, setFilter] = useState(FilterEnum.ACTIVE)
	const { loading, data = { todos: [] } } = useQuery<{ todos: Todo[] }>(
		GET_TODOS
	)

	const todos: Todo[] = loading
		? []
		: data.todos.sort(({ createdTimestamp: a }, { createdTimestamp: b }) =>
				a > b ? -1 : 1
		  )

	const [addTodo] = useMutation(ADD_TODO)
	const [switchCheck] = useMutation(SWITCH_CHECK)
	const [removeTodo] = useMutation(REMOVE_TODO)

	const getTodosByFilter = (forFilter: FilterEnum) =>
		todos.filter((todo) => {
			if (forFilter === FilterEnum.ACTIVE) {
				return !todo.checked
			} else if (forFilter === FilterEnum.COMPLETED) {
				return todo.checked
			} else if (forFilter === FilterEnum.ALL) {
				return todo /* return ALL todo-items not false */
			}
		})

	return (
		<Section>
			<header>
				<H1>{t('main.h1')}</H1>
				<NewTodoInput
					disabled={loading}
					placeholder={t('main.inputPlaceholder')}
					onKeyUp={(e) => {
						const text = e.currentTarget.value.trim()
						if (e.key === 'Enter' && text.length > 0) {
							addTodo({ variables: { text }, refetchQueries: ['Todos'] })
							e.currentTarget.value = ''
						}
					}}
				/>
			</header>
			<MainSection>
				<BatchCheckbox id="batchcheckbox" type="checkbox" />
				<BatchCheckboxLabel />
				<TodoList>
					{getTodosByFilter(filter).map(
						({ id, checked, createdTimestamp, text }, i) => (
							<Todo key={i}>
								<div>
									<Toggle
										type="checkbox"
										checked={checked}
										onChange={(e) => {
											if (e.currentTarget.checked !== checked) {
												switchCheck({
													variables: { id: todos[0].id },
													refetchQueries: ['Todos']
												})
											}
										}}
									/>
									<ToggleLabel className={clsx({ checked })}>
										<small>
											{new Date(createdTimestamp).toLocaleDateString('en-US')}
											{new Date(createdTimestamp).toLocaleTimeString('en-US')}
											&nbsp;-&nbsp;
										</small>
										{text}
									</ToggleLabel>
									<button
										onClick={() =>
											removeTodo({
												variables: { id },
												refetchQueries: ['Todos']
											})
										}
										className="destroy"
									/>
								</div>
							</Todo>
						)
					)}
				</TodoList>
			</MainSection>
			<Footer>
				<TodoCount>
					{t('main.footer.itemsLeft', {
						count: getTodosByFilter(FilterEnum.ACTIVE).length /* wrong Enum, changed to ACTIVE instaed of ALL */
					})}
				</TodoCount>
				<FilterWrapper>
					<Filter>
						<FilterLink
							className={filter === FilterEnum.ACTIVE ? 'selected' : ''}
							onClick={() => setFilter(FilterEnum.ACTIVE)}
							href="#/"
						>
							{t('main.footer.active')/* active was not declared at /public/locales/en/default.json */ }
						</FilterLink>
						<FilterLink
							className={filter === FilterEnum.COMPLETED ? 'selected' : ''}
							onClick={() => setFilter(FilterEnum.COMPLETED)}
							href="#/"
						>
							{t('main.footer.completed')}
						</FilterLink>
						<FilterLink
							className={filter === FilterEnum.ALL ? 'selected' : ''}
							onClick={() => setFilter(FilterEnum.ALL)}
							href="#/"
						>
							{t('main.footer.all')}
						</FilterLink>
					</Filter>
				</FilterWrapper>
			</Footer>
		</Section>
	)
}

export default WithApolloProvider(TodosList)
