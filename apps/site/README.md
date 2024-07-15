## Getting Started

This is the instructions on setting up this project locally.
To run the project locally follow these simple example steps.

### Build

To build the package, run the following command:

```base
pnpm run build
```

### Develop

To run the development server, run the following command:

```base
pnpm run dev
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

## Usage

This is an example of how you can use the backend package in your project.
Once you have installed the project, you can import the package and use it in your app directory.

```jsx
import apiConnector from "@metajob/api-connector";

// find all jobs
const connect = await apiConnector;
const jobs = await connect.getJobs();
```

In the above example, you can see that all the backend functions are in the connect object. You can pass the required props to the function and use it in your project.

## Useful Links

- [Contact Us](https://jstemplate.net/contact-us)
- [Documentation](https://docs.jstemplate.net)
- [All Products](https://jstemplate.net)
