Autocomplete from api

=======================================

HTML, CSS, JavaScript

Main goal -> Search + autocomplete data from api and custom html component without frameworks.

* * *
### [Demo](https://cold-world.github.io/autocomplete-from-api/)

![Alt Text](https://i.imgur.com/NLlc11T.gif)

* * *



### A piece of code

```const fetchHandler = (event) => {
  const query = event.target.value;

  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Token ' + token,
    },
    body: JSON.stringify({ query }),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      renderResults(result);
      nameInput.focus();
    })
    .catch((error) => console.log('error', error));
};
```

### Download & Installation

```shell 
git clone https://github.com/cold-world/autocomplete-from-api.git
```
