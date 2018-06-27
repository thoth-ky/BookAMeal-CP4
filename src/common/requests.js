const access_token = localStorage.get('access_token');

postData = (url, data) => {
  return fetch(url, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    headers: {
      'Authorization': access_token,
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
  })
  .then(response => response.json())
  .catch(error => console.error('Error: ', error))
  .then(response => console.log('Success:', response))
  }


putData = (url, data) => {
  return fetch(url,{
    body: JSON.stringify(data),
    cache: 'no-cache',
    headers: {
      'Authorization': access_token,
      'content-type': 'application/json'
    },
    method: 'PUT',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
  })
  .then(response => response.json())
  .catch(error => console.error('Error: ', error))
  .then(response => console.log('Success:', response))
}

getData = (url) => {
  return fetch(url,{
    cache: 'no-cache',
    headers: {
      'Authorization': access_token,
      'content-type': 'application/json'
    },
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
  })
  .then(response => response.json())
  .catch(error => console.error('Error: ', error))
  .then(response => console.log('Success:', response))
}


export { postData, getData, putData }
