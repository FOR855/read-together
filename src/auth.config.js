export const authConfig = {
  pages: {
    signIn: '/log-in',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('auth.user:', auth?.user);
      const isLoggedIn = !!auth?.user;
      const isOnMain = nextUrl.pathname.startsWith('/');
      if (isOnMain) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
};