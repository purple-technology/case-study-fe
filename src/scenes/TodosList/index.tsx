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
	ToggleLabel,
	PrioritySelector
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
	priority: string
}

enum FilterEnum {
	ALL,
	ACTIVE,
	COMPLETED
}

const TodosList = () => {
	const { t } = useTranslation()
	const [filter, setFilter] = useState(FilterEnum.ACTIVE)
	//
	const [priority, setPriority] = useState<string>('')
	//
	const { loading, data = { todos: [] } } = useQuery<{ todos: Todo[] }>(
		GET_TODOS
	)
	const todos: Todo[] = loading
		? []
		: data.todos.sort(({ createdTimestamp: a }, { createdTimestamp: b }) => 
				a > b ? -1	: 1
		  )  

	const [addTodo] = useMutation(ADD_TODO)
	const [switchCheck] = useMutation(SWITCH_CHECK)
	const [removeTodo] = useMutation(REMOVE_TODO)

	const handlePriority = e => {
		const priority = e.curentTarget.value;
		if(e.keyCode == 13){
			addTodo({ variables: { priority }, refetchQueries: ['Todos'] })
			e.currentTarget.value = ''
		}
	}

	const handleNewTodo = e => {
		const text = e.currentTarget.value.trim()
		if (e.key === 'Enter' && text.length > 0) {
			addTodo({ variables: { text }, refetchQueries: ['Todos'] })
			e.currentTarget.value = '';
		}
	}

	const getTodosByFilter = (forFilter: FilterEnum) =>
		todos.filter((todo) => {
			if (forFilter === FilterEnum.ACTIVE) {
				return !todo.checked
			} else if (forFilter === FilterEnum.COMPLETED) {
				return todo.checked
			} else if (forFilter === FilterEnum.ALL) {
				return todo
			}
		})

	return (
		<Section>
			<header>
				<H1>{t('main.h1')}</H1>
				<NewTodoInput
					disabled={loading}
					placeholder={t('main.inputPlaceholder')}


					onKeyUp={handleNewTodo}
				/>
				<PrioritySelector 
					disabled={loading}
					
					onKeyUp={handlePriority}
				>

					<option value='0'>Regular</option>
					<option value='1'>Important</option>
					<option value='2'>High Priority</option>
				 </PrioritySelector>
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
													variables: { id }, 
													refetchQueries: ['Todos']
												})
											}
										}}
									/>
									<ToggleLabel className={clsx({ checked })}>
										<small>
											{new Date(createdTimestamp).toLocaleDateString('Cz-cz')}
											&nbsp;
											{new Date(createdTimestamp).toLocaleTimeString('Cz-cz')}
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
						count: getTodosByFilter(FilterEnum.ACTIVE).length 
					})}
				</TodoCount>
				<FilterWrapper>
					<Filter>
						<FilterLink
							className={filter === FilterEnum.ACTIVE ? 'selected' : ''}
							onClick={() => setFilter(FilterEnum.ACTIVE)}
							href="#/"
						>
							{t('main.footer.active')}
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
