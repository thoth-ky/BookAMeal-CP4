const access_token = localStorage.getItem('access_token');
console.log(access_token)
const postData = (url, data) => {
  fetch(url, {
    body: JSON.stringify(data),
    headers: {
      'Authorization': access_token,
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': "*",
    },
    method: 'POST',
    mode: 'cors',
    success: function (response){
      console.log('inside', response)
    }
  })
  .then( response  => response.json())
  .catch(error => console.error('Error: ', error))
  .then(response => {
    console.log('Success:', response)
  })
  }


const putData = (url, data) => {
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

const getData = (url) => {
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
