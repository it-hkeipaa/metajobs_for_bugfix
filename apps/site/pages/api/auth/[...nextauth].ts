import apiConnector from '@metajob/api-connector';
import NextAuth, { NextAuthOptions } from 'next-auth';
import AppleProvider from 'next-auth/providers/apple';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  // Configure one or more authentication providers
  providers: [
    /**
     * You should create an app
     * @GITHUB_ID add in your env file
     * @GITHUB_SECRET add in your env file
     * @see https://next-auth.js.org/providers/github
     */
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    /**
     * You should create an app
     * @GOOGLE_ID add in your env file
     * @GOOGLE_SECRET add in your env file
     * @see https://next-auth.js.org/providers/google
     */
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),

    /**
     * You should create an app
     * @FACEBOOK_CLIENT_ID add in your env file
     * @FACEBOOK_CLIENT_SECRET add in your env file
     * @see https://next-auth.js.org/providers/facebook
     */
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),

    /**
     * You should create an app
     * @LINKEDIN_CLIENT_ID add in your env file
     * @LINKEDIN_CLIENT_SECRET add in your env file
     * @see https://next-auth.js.org/providers/linkedin
     */
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: 'openid profile email',
        },
      },
    }),

    /**
     * You should create an app
     * @APPLE_ID add in your env file
     * @APPLE_SECRET add in your env file
     * @see https://next-auth.js.org/providers/linkedin
     */
    AppleProvider({
      clientId: process.env.APPLE_ID as string,
      clientSecret: process.env.APPLE_SECRET as string,
    }),

    /**
     * This is Custom CredentialsProvider
     * No need to do any thing here
     * it's auto setup to your `mongo.bd`
     * If `user` and `password` is current it will logged in
     */
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Username or Email Address',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },

      async authorize(credentials: any, req: any) {
        const connect = await apiConnector;
        const user = await connect.userPasswordValidate({
          email: credentials.username,
          password: credentials.password,
        });

        if (user) {
          // Return the user details from the user API
          return user;
        }

        return false;
      },
    }),
  ],

  callbacks: {
    // *** Sign In Roles Check
    async signIn({ error, account, profile }: any) {
      if (profile) {
        const connect = await apiConnector;
        // *** Check is user exist
        const user = await connect.userExistValidate(profile.email);

        if (!user) {
          return false;
        }

        // google login check
        if (account.provider === 'google') {
          console.info('user google login');
          // get user by profile email
          if (user) {
            return true;
          }

          if (error?.name === 'AccountNotLinkedError') {
            // Handle the case where the Google account is not linked to any user
            // Redirect to a specific page or show an error message
            throw new Error('This Google account is not linked to any user.');
          }

          return false;
        }
        // github login check
        if (account.provider === 'github') {
          console.info('user Github login');

          if (user) {
            return true;
          }

          if (error?.name === 'AccountNotLinkedError') {
            // Handle the case where the GitHub account is not linked to any user
            // Redirect to a specific page or show an error message
            throw new Error('This GitHub account is not linked to any user.');
          }

          return false;
        }
        // facebook login check
        if (account.provider === 'facebook') {
          console.info('user Facebook login');

          if (user) {
            return true;
          }

          if (error?.name === 'AccountNotLinkedError') {
            // Handle the case where the Facebook account is not linked to any user
            // Redirect to a specific page or show an error message
            throw new Error('This Facebook account is not linked to any user.');
          }

          return false;
        }
        // Linkedin login check
        if (account.provider === 'linkedin') {
          console.info('user Linkedin login');

          if (user) {
            return true;
          }

          if (error?.name === 'AccountNotLinkedError') {
            // Handle the case where the Linkedin account is not linked to any user
            // Redirect to a specific page or show an error message
            throw new Error('This Linkedin account is not linked to any user.');
          }

          return false;
        }
        // Apple login check
        if (account.provider === 'apple') {
          console.info('user Apple login');

          if (user) {
            return true;
          }

          if (error?.name === 'AccountNotLinkedError') {
            // Handle the case where the Apple account is not linked to any user
            // Redirect to a specific page or show an error message
            throw new Error('This Apple account is not linked to any user.');
          }

          return false;
        }
      }
      return true;
    },
    // *** jwt update
    async jwt({ token, user, trigger, session }: any) {
      // *** trigger is update
      if (trigger === 'update') {
        return {
          ...token,
          ...session.user, // use the user object to populate jwt token
        };
      }
      return {
        ...token,
        ...user, // use the user object to populate jwt token
      };
    },
    // *** session update
    async session({ session, token }: any) {
      const connect = await apiConnector;
      // *** get user data
      const user = await connect.userExistValidate(token?.email);

      const accessToken = await connect.signJwt({ _id: user?._id });

      // user.password remove
      delete user.password;

      // *** get the user data from db
      session.user = {
        ...session?.user,
        ...user,
        accessToken: accessToken,
      };

      const expires = new Date();
      // *** 24 hours session expiration
      expires.setHours(expires.getHours() + 24);

      return {
        ...session,
        // date format should 2024-02-19T11:51:56.645Z
        expires: expires.toISOString(),
      };
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },
};

export default NextAuth(authOptions);
