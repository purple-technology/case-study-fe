import '../global.css'

import { NextComponentType, NextPageContext } from 'next'
import App, { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import { Theme } from '../config/Theme'
import i18n from './../i18n.js'

interface TypedApp {
	Component: NextComponentType
	ctx: NextPageContext
}

class PhoenixApp extends App<TypedApp, TypedApp & AppProps, {}> {
	public static async getInitialProps({ Component, ctx }: TypedApp) {
		let pageProps = {}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}

		return { pageProps }
	}

	constructor(props) {
		super(props)
		i18n.setDefaultNamespace('default')
	}

	public render() {
		const { Component, pageProps } = this.props

		return (
			<>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
					/>
					<link
						rel="shortcut icon"
						type="image/png"
						href={`${process.env.CDN_URL}/img/favicon.ico`}
					/>
					<title>Phoenix</title>
				</Head>

				<ThemeProvider theme={Theme}>
					<Component {...pageProps} />
				</ThemeProvider>
			</>
		)
	}
}

export default PhoenixApp
