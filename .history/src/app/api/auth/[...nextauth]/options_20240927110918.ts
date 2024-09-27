import { prismadb } from '@/lib/prisma';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { newUserNotify } from './new-user-notify';
import type { NextApiHandler } from 'next';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET,
  //adapter: PrismaAdapter(prismadb),
  session: {
    strategy: 'jwt',
  },

  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        // console.log(credentials, "credentials");
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prismadb.users.findFirst({
          where: {
            email: credentials.email,
          },
        });

        //clear white space from password
        const trimmedPassword = credentials.password.trim();

        if (!user || !user?.password) {
          throw new Error('Email or password is missing');
        }

        const isCorrectPassword = await bcrypt.compare(
          trimmedPassword,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error('Password is incorrect');
        }

        //console.log(user, "user");
        return user;
      },
    }),
  ],
  callbacks: {
    //TODO: fix this any
    async session({ token, session }: any) {
      const user = await prismadb.users.findFirst({
        where: {
          email: token.email as string,
        },
      });

      if (!user) {
        try {
          const newUser = await prismadb.users.create({
            data: {
              email: token.email as string,
              name: token.name,
              avatar: token.picture,
              is_admin: false,
              is_account_admin: false,
              lastLoginAt: new Date(),
              userStatus:
                process.env.NEXT_PUBLIC_APP_URL === 'https://demo.saashq.org'
                  ? 'ACTIVE'
                  : 'PENDING',
            },
          });

          await newUserNotify(newUser);

          //Put new created user data in session
          session.user.id = newUser.id;
          session.user.name = newUser.name;
          session.user.email = newUser.email;
          session.user.avatar = newUser.avatar;
          session.user.image = newUser.avatar;
          session.user.isAdmin = false;
          session.user.userLanguage = newUser.userLanguage;
          session.user.userStatus = newUser.userStatus;
          session.user.lastLoginAt = newUser.lastLoginAt;
          return session;
        } catch (error) {
          return console.log(error);
        }
      } else {
        await prismadb.users.update({
          where: {
            id: user.id,
          },
          data: {
            lastLoginAt: new Date(),
          },
        });
        //User allready exist in localDB, put user data in session
        session.user.id = user.id;
        session.user.name = user.name;
        session.user.email = user.email;
        session.user.avatar = user.avatar;
        session.user.image = user.avatar;
        session.user.isAdmin = user.is_admin;
        session.user.userLanguage = user.userLanguage;
        session.user.userStatus = user.userStatus;
        session.user.lastLoginAt = user.lastLoginAt;
      }

      //console.log(session, "session");
      return session;
    },
  },
};