## Getting Started

This is the instructions on setting up this project locally.
To run the project locally follow these simple following steps.

### Project structure

The project is structured as a monorepo and includes the following packages:

- `apps/site`: main site built with Next.js and Tailwind CSS. You will deploy `site`
- `packages/next-mongo`: a package that provides the complete backend with mongodb database.
- `packages/api-connector`: a package that connect the backend source.
- `packages/eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `packages/tsconfig`: `tsconfig.json`s used throughout the monorepo

### Prerequisites

Please make sure that you have latest version of pnpm, npm or yarn installed in your system. You can install the latest version of pnpm, npm or yarn by running the following command in your terminal:

- pnpm Installation

```sh
npm install pnpm@latest -g
```

- npm Installation

```sh
npm install npm@latest -g
```

- yarn Installation

```sh
npm install yarn@latest -g
```

### Installation

Installing the project is easy and straight forward. If you're using pnpm, simply run the following command in your terminal from project root:

```sh
pnpm install
```

That's it! The package will now be installed and ready for use in your project. You can then import the package and use its components in your code. Please make sure that you have latest version of pnpm, npm or yarn installed in your system."

<Callout type="info" emoji="ℹ️">
 <strong>NOTE:</strong> Ensure that you have included all key-value pairs in
 the .env.local file located in the apps/site directory.
</Callout>

### Build

**Please add all the environment variables from the example env file at apps/site**

To build all apps and packages, run the following command:

```base
pnpm build
```

### Start Development

To develop all apps and packages, run the following command:

```base
pnpm dev
```

### Start The Project

To start the project, run the following command:

```base
pnpm -F site start
```

## Required Environment Variables

The following environment variables are required to run the project:

```jsx
# add your backend api url here
API_BASE_URL="Your_base_url_here"
NEXT_PUBLIC_BASE_URL="Your_base_url_here"

# NEXTAUTH URL
NEXTAUTH_URL="Your_base_url_here"
NEXTAUTH_SECRET="Create_a_32_character_long_string_here"

# 32 character long string
JWT_SECRET="Create_a_32_character_long_string_here"

# MongoDB connection url
MONGODB_URL="Your_mongodb_url_here"

# Next DB config
PROVIDER="Your_provider_here" // @metajob/next-mongo or @metajob/next-local
```

## Social Login Required Environment Variables

The following environment variables are required to setup social login:

```jsx

# Github Provider 
GITHUB_ID="Your_github_id_here"
GITHUB_SECRET="Your_github_secret_here"

# Google Provider
GOOGLE_ID="Your_google_id_here"
GOOGLE_SECRET="Your_google_secret_here"

# Facebook Provider
FACEBOOK_CLIENT_ID="Your_facebook_id_here"
FACEBOOK_CLIENT_SECRET="Your_facebook_secret_here"

# Linkedin Provider
LINKEDIN_CLIENT_ID="Your_linkedin_id_here"
LINKEDIN_CLIENT_SECRET="Your_linkedin_secret_here"

# Apple Provider
APPLE_ID="Your_apple_id_here"
APPLE_SECRET="Your_apple_secret_here"
```

## Stripe Required Environment Variables

The following environment variables are required to setup stripe:

```jsx
# Stripe payment 
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="Your_stripe_publishable_key_here"
STRIPE_SECRET_KEY="Your_stripe_secret_key_here"
```

## Mail Required Environment Variables

The following environment variables are required to send emails:

```jsx
# NodeMailer config
NODEMAILER_HOST="Your_nodemailer_host_here"
NODEMAILER_SECURE="Your_nodemailer_secure_here" // true or false
NODEMAILER_PORT="Your_nodemailer_port_here"
NODEMAILER_EMAIL="Your_nodemailer_email_here"
NODEMAILER_PASSWORD="Your_nodemailer_password_here"
```

## Cloudinary Required Environment Variables

The following environment variables are required to upload images to cloudinary:

```jsx
# Cloudinary config
CLOUDINARY_API_SECRET="Your_cloudinary_api_secret_here"
CLOUDINARY_API_KEY="Your_cloudinary_api_key_here"
CLOUDINARY_CLOUD_NAME="Your_cloudinary_cloud_name_here"
```

## Useful Links

- [Contact Us](https://jstemplate.net/contact-us)
- [Documentation](https://docs.jstemplate.net/metajob)
- [All Products](https://jstemplate.net)
