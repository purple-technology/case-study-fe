import gql from 'graphql-tag'

export const GET_TODOS = gql`
	query Todos {
		todos {
			id
			text
			createdTimestamp
			checked
			priority
		}
	}
`

export const ADD_TODO = gql`
	mutation($text: String!, $priority: String!) {
		addTodo(text: $text, priority: $priority) {
			status
		}
	}
`

export const REMOVE_TODO = gql`
	mutation($id: ID!) {
		removeTodo(id: $id) {
			status
		}
	}
`

export const SWITCH_CHECK = gql`
	mutation($id: ID!) {
		switchCheck(id: $id) {
			status
		}
	}
`
