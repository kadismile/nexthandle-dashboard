import {queryCache} from 'react-query'

let authToken = localStorage.getItem('persist:root') || undefined;
if (authToken) {
  authToken = JSON.parse(authToken).user;
  authToken = JSON.parse(authToken);
}

async function client(endpoint, {data, type, headers: customHeaders, ...customConfig} = {}) {
  const token = authToken?.user?.token;
  let headers;
  if (type) {
    headers = {
      Authorization: token ? `Bearer ${token}` : undefined,
      //'Content-Type': 'application/json',
      ...customHeaders,
    }
  } else {
    headers = {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    }
  }

  const config = {
    method: data ? "POST" : "GET",
    body: data && !type ? JSON.stringify(data) : data && type ? data : undefined,
    headers: customConfig.customHeaders ? customConfig.customHeaders : headers,
  };

  return window
    .fetch(`${endpoint}`, config)
    .then(async response => {
      return await response.json()
    }).catch((err)=>{
      //logout();
      //window.location.replace("/");
    })
}

function logout() {
  queryCache.clear();
  window.localStorage.removeItem(authToken);
}

export {client, authToken, logout}