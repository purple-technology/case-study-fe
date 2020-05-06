# FrontEnd

![Serverless Enabled](https://camo.githubusercontent.com/547c6da94c16fedb1aa60c9efda858282e22834f/687474703a2f2f7075626c69632e7365727665726c6573732e636f6d2f6261646765732f76332e737667)

In this folder is located frontend layer of the Phoenix application.

## Stack

- Next.JS (https://github.com/zeit/next.js/)
- Styled Components for styling (https://www.styled-components.com/)
- Typescript for static typing (https://www.typescriptlang.org/)
- ESlint + Prettier based (https://prettier.io/)
- Apollo for GraphQL API (https://www.apollographql.com/)
- i18Next + Phrase for translation management (https://phrase.com)

## Local development

Run commmand:

```
$ npm run dev
```

## How to work with assets (images, icons, translations, etc.)

**tl;dr;**

- Save any asset you want to use within the app to `/public` folder
- Any files in the public directory will be mapped to the root of the domain (by Nextjs itself)
- If you want to use any asset use the root path e.g. `/favicon.ico` (dont `./../../../favicon.ico`)

**long version**  
Read [this article](https://nextjs.org/blog/next-9-1#public-directory-support) on Nextjs blog

## Localization

We use [Phrase](https://phrase.com) for translations.

To be able to work with translations install Phrase CLI via brew:

```
brew tap phrase/brewed
brew install phraseapp
```

You'll need `PHRASEAPP_ACCESS_TOKEN` in environment variables (your `.env` file in the root folder) to be able to run command below.

### Phrase -> This repo

To get the latest translations from Phrase use command:  
`npm run pull-locales`

### This repo -> Phrase

To update translations in Phrase (from your local translations) use command:
| NOTE: this will override translations in Phrase so make sure your translations is up-to-date
`npm run push-locales`

## Deployment

### First time deployment

`npm run deploy`

It takes time - could be up to 10-30 minutes.

Why?

Because there is CloudFront distribution being created which distributes the app all around the world.

### Remove deployment

`npm run remove`

### Where is the app running?

`npm run info`

Sample output:

```
Stack Outputs
FrontendUrl: https://f-your-feature-xwtce-phoenix.axiory.com
```

So the app is running on: `https://f-your-feature-xwtce-phoenix.axiory.com`

#### CDN

CloudFront cache is invalidated after every deployment through the CI.

## Readings

### Recommended file structure

https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1

### Forms in React (Formik)

https://link.medium.com/XGfNPzdgBZ

**Icons**
https://app.streamlineicons.com/streamline-regular

Use Bold or Regular icon set, use SVG type.

Search for your icon. Click on it. Set Color, Size and press Download.
