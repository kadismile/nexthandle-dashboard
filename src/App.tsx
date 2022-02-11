import React, {useEffect, useState} from 'react';
import Userservice from './services/user'
import {FullPageSpinner} from './components/libs'
import AuthenticatedApp  from './authenticated-app'
import UnauthenticatedApp from './unauthenticated-app'
function App() {
  const [user, setUser] :any = useState(undefined);
  const [loading, setLoading] = useState(false);
  let authToken: any = localStorage.getItem('persist:root') || undefined;
  if (authToken) {
    authToken = JSON.parse(authToken).user;
    authToken = JSON.parse(authToken);
  }

  useEffect(()=> {
    ( async () => {
      if (authToken?.user?.token?.length) {
        setLoading(true);
        let data: any = await Userservice.getUser();
        if (data?.status === "success") {
          setLoading(false);
          setUser(data.user)
        } else {
          setLoading(false);
        }
      }
    })()
  }, []);
  
  return (
    loading ? <FullPageSpinner/> :
      user && user.email ? <AuthenticatedApp /> : <UnauthenticatedApp />
  )
}

export default App;
