
const btnElement = document.querySelector('.button')
const postContainer = document.querySelector('.posts')
const loader = document.querySelector('.loader')

// requisitando os posts

let numPage = 1

async function getPosts() {
  const url = `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${numPage}`
  const response = await fetch(url)
  
  return response
}

async function redeemResponseData(res) {
  const response = await res
  const status = response.status == 200
  
  if (status) {return response.json()}
  return false
}

// template de posts

function generateTemplate(obj) {
  return obj.map(({id, title, body}) =>
    `<li class="post" id="p-${ id }">
      <span class="post-id">${ id }</span>
      <h2 class="post-title">${ title }</h2>
      <p class="post-body">${ body }</p>
    </li>
  `).join(' ')
}

async function postsTemplate() {
  const posts = await redeemResponseData(getPosts())
  const elements = await generateTemplate(posts)
  return elements
}

// adicionando o conteúdo ao contêiner de posts

function addContentInToElementContainer(content) {
  postContainer.innerHTML += content
}

// loader para os próximos posts

function showLoader() {
  loader.classList.add('show-loader')
}
 
function removeLoader() {
  setTimeout(
    loader.classList.remove('show-loader')
  ,300)
}

// controle

async function addPostsInToDOM() {
  const template = await postsTemplate()
  addContentInToElementContainer(template)
}

async function addNewPostsInToDOM() {
  showLoader()
  numPage++
  
  const template = await postsTemplate()
  
  removeLoader()
  addContentInToElementContainer(template)
}

// chamada por scroll

function handleScroll() {
  const { clientHeight, scrollHeight, scrollTop } = 
    document.documentElement
    
  const isBottom = clientHeight + scrollTop 
    >= scrollHeight - 5
    
  if (isBottom) {addNewPostsInToDOM()}
}

// init

window.addEventListener('load', addPostsInToDOM)
window.addEventListener('scroll', handleScroll)