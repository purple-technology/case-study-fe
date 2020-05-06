import gql from 'graphql-tag'

export const GET_TODOS = gql`
	query Todos {
		todos {
			id
			text
			createdTimestamp
			checked
		}
	}
`

export const ADD_TODO = gql`
	mutation($text: String!) {
		addTodo(text: $text) {
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
