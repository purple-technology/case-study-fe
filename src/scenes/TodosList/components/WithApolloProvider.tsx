import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error/lib/index.js'
import { createHttpLink } from 'apollo-link-http'
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link'
import fetch from 'cross-fetch'
import React, { Component } from 'react'

export function WithApolloProvider(WrappedComponent) {
	return class extends Component<
		{},
		{
			subscriptionLink: ApolloLink | null
		}
	> {
		constructor(props) {
			super(props)

			this.state = {
				subscriptionLink: null
			}
		}

		public render() {
			const url = process.env.API_URL as string
			const httpLink = createHttpLink({
				fetch,
				uri: url
			})

			const errorLink = onError(({ graphQLErrors, networkError }) => {
				if (graphQLErrors) {
					graphQLErrors.forEach(({ message, locations, path }) =>
						console.error(
							`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
						)
					)
				}

				if (networkError) {
					console.error(`[Network error]: `, networkError)
					// reconnecting subscriptions only if network error with ws:/wss: uri
					if (/^ws.*/.test(JSON.parse(JSON.stringify(networkError)).uri)) {
						setTimeout(() => {
							this.setState({
								subscriptionLink: createSubscriptionHandshakeLink(url, httpLink)
							})
						}, 1000)
					}
				}
			})

			const link = ApolloLink.from([
				errorLink,
				this.state.subscriptionLink ||
					createSubscriptionHandshakeLink(url, httpLink)
			])

			const client = new ApolloClient({
				link,
				cache: new InMemoryCache()
			})

			return (
				<ApolloProvider client={client}>
					<WrappedComponent {...this.props} />
				</ApolloProvider>
			)
		}
	}
}
