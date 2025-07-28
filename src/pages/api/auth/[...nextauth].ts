import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { db } from "../../../services/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";



export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user',
    }),

  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const userRef = doc(db, 'users', user.email || user.id);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // If user does not exist, create a new user document
        await setDoc(userRef, {
          name: user.name,
          email: user.email,
          createdAt: new Date(),
        });

      }


      return true; 
  }
  }
}

export default NextAuth(authOptions)