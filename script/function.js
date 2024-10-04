const container = document.querySelector('.app__autocomplit')
export const input = document.querySelector('.app__input')

const clearAutocomplit = () => {
  container.innerHTML = '';
}

const addAutocomplit = (array) => {
  clearAutocomplit()
  array.forEach(element => {
    const listElement = document.createElement("li");
    listElement.className = 'app__search-element';
    listElement.appendChild(document.createTextNode(element.name))
    container.appendChild(listElement)
    listElement.addEventListener('click', () => {
      addRepository(element.name, element.owner.login, element.stargazers_count)
      clearAutocomplit()
      input.value = ''
    }, { once: true })
  });
}

export const debounce = (fn, debounceTime) => {
  let timeout;
  return function () {
    const fnCall = () => fn.apply(this, arguments)
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, debounceTime);
  }
};

export const apiResponse = async (string) => {
  if (string !== undefined && string.trim().length !== 0) {
    await fetch(`https://api.github.com/search/repositories?q=${string}&per_page=5`,
      {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((data) => {
        addAutocomplit(data.items)
      })
  } else {
    clearAutocomplit()
  }
}

const addRepository = (name, owner, stars) => {
  const repoContainer = document.querySelector('.app__result')
  const repo = document.createElement("div");
  repo.className = 'repo'

  const deleteButton = document.createElement("div");
  deleteButton.className = 'repo__delete'

  const repoInfo = document.createElement("div");
  repoInfo.className = 'repo__info'

  const repoName = document.createElement("p");
  const repoOwner = document.createElement("p");
  const repoStars = document.createElement("p");

  const nameText = document.createTextNode(`Name: ${name}`)
  const ownerText = document.createTextNode(`Owner: ${owner}`)
  const starsText = document.createTextNode(`Stars: ${stars}`)

  repoName.appendChild(nameText)
  repoOwner.appendChild(ownerText)
  repoStars.appendChild(starsText)

  repoName.className = 'repo__text'
  repoOwner.className = 'repo__text'
  repoStars.className = 'repo__text'

  repoInfo.appendChild(repoName)
  repoInfo.appendChild(repoOwner)
  repoInfo.appendChild(repoStars)

  repo.appendChild(repoInfo)
  repo.appendChild(deleteButton)
  repoContainer.appendChild(repo)
  deleteButton.addEventListener('click', (e) => {
    e.target.parentNode.remove()
  }, { once: true })
}

