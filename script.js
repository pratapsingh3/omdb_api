
const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3b6924ca61c9504e3b965b55c59b9c0d&page=1";

const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=3b6924ca61c9504e3b965b55c59b9c0d&query=';

const form1=document.getElementById('form')
const search=document.getElementById('search')
const main=document.getElementById('main')

let rating='';

//Get Movies
getMovies(API_URL);  //default case
 async function getMovies(url){
	const res= await fetch(url)
	const data= await res.json()
	displayMovies(data.results)
	console.log(data.results);
}
function displayMovies(movies){
	main.innerHTML=''
	movies.forEach((movies)=>{
		const {title,poster_path,vote_average,overview}=movies
		const movieElement=document.createElement('div')
		movieElement.classList.add('movie')
		movieElement.innerHTML=`
		<img src="${IMAGE_PATH}${poster_path}" alt=${title}/>
		<div class='movie-info'>
		<h3>${title}</h3>
		<span class="${getClassesByRating(vote_average)}">${vote_average}</span>
		<div class='overview'> 
		<h3>Overview</h3>
		<p>"${overview}"</p>
		</div>
		</div>
		`
		main.appendChild(movieElement)
	})
}
function getClassesByRating(){
	if(rating>=8){
		return 'green'
	}else if(rating>=5){
		return 'yellow'
	}else{
		return 'red'
	}
}

form1.addEventListener('submit',(e)=>{
	e.preventDefault()
	const searchValue=search.value
	if(searchValue && search !=''){
		getMovies(SEARCH_URL+searchValue)
		searchValue=''
	}else{
		window.location.reload()
	}
})