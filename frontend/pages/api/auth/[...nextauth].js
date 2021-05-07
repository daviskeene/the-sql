import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { WEB_ROOT } from '../../../Environment';
import axios from 'axios';

const options = {
  site: WEB_ROOT,

  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
  callbacks: {
    /**
     * @param  {object} user     User object
     * @param  {object} account  Provider account
     * @param  {object} profile  Provider profile 
     * @return {boolean|string}  Return `true` to allow sign in
     *                           Return `false` to deny access
     *                           Return `string` to redirect to (eg.: "/unauthorized")
     */
    async signIn(user, account, profile) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {

        const body = {
            "student_id": parseInt(user.id.slice(0, 10)),
            "email": user.email,
            "first_name": user.name.split(" ")[0],
            "last_name": user.name.split(" ")[1],
            "classroom": 4111
        }

        axios.post(URL_ROOT + '/students/', body).then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        });

        console.log(user)
        return true

      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    }
  }
};

export default (req, res) => NextAuth(req, res, options);