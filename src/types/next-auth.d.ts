import NextAuth, { Session } from "next-auth"
import { JWT } from "next-auth/jwt";

interface User {
  id: string
  name: string
  email: string
  image: string
}

declare module 'next-auth' {
  interface Session {
    user?: User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: User
  }
}
