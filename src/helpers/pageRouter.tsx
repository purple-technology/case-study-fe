import { withRouter } from 'next/router'
import queryString from 'query-string'
import React from 'react'

/**
 * Our router to override the missing query when deploying to static export
 * This is required for page components that need access to the router
 *
 * @param {React.Component} Component
 *
 * @return {React.Component}
 */
export const withPageRouter = (Component: any) => {
	return withRouter(({ router, ...props }) => {
		if (router && router.asPath) {
			const queryObject = queryString.parse(router.asPath.split(/\?/)[1])
			return <Component {...props} router={router} query={queryObject} />
		}

		return <div></div>
	})
}
