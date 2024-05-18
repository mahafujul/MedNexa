import 'next-auth'
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User{
        username?: string;
        _id?: string;
        role?: string
    }
    interface Session{
        user: {
            username?: string;
            userId?: string;
            role?: string;
        } & DefaultSession['user']
    }
}