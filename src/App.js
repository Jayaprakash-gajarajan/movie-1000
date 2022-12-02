import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Add, AirlineSeatReclineNormalRounded } from '@mui/icons-material';
import { height } from '@mui/system';
import { ColorBox } from './ColorBox';
import { IconButton } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { Routes, Route, Link, Router, useNavigate, useParams } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
const MOVIE = [
  {
    "id": "99",
    "name": "Vikram",
    "poster": "https://m.media-amazon.com/images/M/MV5BMmJhYTYxMGEtNjQ5NS00MWZiLWEwN2ItYjJmMWE2YTU1YWYxXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_.jpg",
    "rating": 8.4,
    "summary": "Members of a black ops team must track and eliminate a gang of masked murderers.",
    "trailer": "https://www.youtube.com/embed/OKBMCL-frPU"
  },
  {
    "id": "100",
    "name": "RRR",
    "poster":
      "https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG",
    "rating": 8.8,
    "summary": "RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.",
    "trailer": "https://www.youtube.com/embed/f_vbAtFSEc0"
  },
  {
    "id": "101",
    "name": "Iron man 2",
    "poster": "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
    "rating": 7,
    "summary": "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
    "trailer": "https://www.youtube.com/embed/wKtcmiifycU"
  },
  {
    "id": "102",
    "name": "No Country for Old Men",
    "poster": "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
    "rating": 8.1,
    "summary": "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
    "trailer": "https://www.youtube.com/embed/38A__WT3-o0"
  },
  {
    "id": "103",
    "name": "Jai Bhim",
    "poster": "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
    "summary": "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
    "rating": 8.8,
    "trailer": "https://www.youtube.com/embed/nnXpbTFrqXA"
  },
  {
    "id": "104",
    "name": "The Avengers",
    "rating": 8,
    "summary": "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
    "poster": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
    "trailer": "https://www.youtube.com/embed/eOrNdBpGMv8"
  },
  {
    "id": "105",
    "name": "Interstellar",
    "poster": "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
    "rating": 8.6,
    "summary": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
    "trailer": "https://www.youtube.com/embed/zSWdZVtXT7E"
  },
  {
    "id": "106",
    "name": "Baahubali",
    "poster": "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
    "rating": 8,
    "summary": "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
    "trailer": "https://www.youtube.com/embed/sOEg_YZQsTI"
  },
  {
    "id": "107",
    "name": "Ratatouille",
    "poster": "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
    "rating": 8,
    "summary": "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
    "trailer": "https://www.youtube.com/embed/NgsQ8mVkN8w"
  }
]
function App() {
  const [movieList, setMovieList] = useState(MOVIE)
  const navigate = useNavigate();
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
          <Button color="inherit" onClick={() => navigate("/movies")}>Movie</Button>
          <Button color="inherit" onClick={() => navigate("/add-movie")}>Add Movie</Button>
          <Button color="inherit" onClick={() => navigate("/color")}>Color Game</Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/flims" element={<Navigate replace to="/movies" />} /> */}
        <Route path="/add-movie" element={<AddMovie movieList={movieList} setMovieList={setMovieList} />} />
        <Route path="/movies" element={<MovieList movieList={movieList} setMovieList={setMovieList} />} />
        <Route path="/color" element={<AddColor />} />
        <Route path="/movies/:id" element={<MovieDetail movieList={movieList} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
function Home() {
  return (
    <div>
      Welcome
    </div>
  )
}
function NotFound() {
  return (
    <div>404 not found</div>
  )
}
// function 
function MovieList({ movieList }) {

  return (
    <div>
      <div className='movie__list'>
        {movieList.map((mv, index) => (
          <div key={index}>
            <Movie movie={mv} id={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
function MovieDetail({ movieList }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const movie = movieList[id];
  const rating = {
    color: movie.rating > 8 ? "green" : "red"
  }

  return (
    <div>
      <iframe width="100%"
        height="600"
        src={movie.trailer}
        title="Avatar: The Way of Water | New Tamil Trailer | December 16 in Cinemas | Advance Bookings Open Now"
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
      <div className='movie-detail-container'>
        <div className='movie__specs'>
          <h2 className='movie__name'>{movie.name}
          </h2>
          <p style={rating} className="movie__rating">⭐{movie.rating}</p>
        </div>
        <p className='movie__summary'>{movie.summary}</p>
        <Stack spacing={2} direction="row">
          <Button variant="contained"
            onClick={() => navigate(-1)}
          > <KeyboardBackspaceIcon />Back</Button>

        </Stack>
      </div>
    </div>
  )
}
function Count() {
  let [like, setLike] = useState(0);
  let [disLike, setDisLike] = useState(0);
  let likeColor = {
    color: like >= 10 ? "green" : "black"
  }
  let disLikeColor = {
    color: disLike >= 10 ? "red" : "black"
  }
  const a = () => setLike(like + 1);
  const b = () => setDisLike(disLike + 1);
  return (
    <div className='like'>
      <IconButton color="primary" aria-label="add to shopping cart" onClick={a}>
        <Badge badgeContent={like} color="primary">
          👍
        </Badge>
      </IconButton>
      <IconButton color="primary" aria-label="add to shopping cart" onClick={b}>
        <Badge badgeContent={disLike} color="error">
          👎
        </Badge>
      </IconButton>
      {/* <button style={likeColor} onClick={a}>👍{like}</button> */}
      {/* <button style={disLikeColor} onClick={b}>👎{disLike}</button> */}
    </div>
  )
}
function Movie({ movie, id }) {
  const [show, setShow] = useState(true);
  const rating = {
    color: movie.rating > 8 ? "green" : "red"
  }
  const navigate = useNavigate();
  return (
    <Card className='movie__container'>
      <CardContent>
        <img src={movie.poster} className="movie__poster" />
        <div className='movie__specs'>
          <h2 className='movie__name'>{movie.name}
            <IconButton color="primary" aria-label="add to shopping cart" onClick={() => setShow(!show)}>
              {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            <IconButton color="primary" aria-label="add to shopping cart" onClick={() => navigate(`/movies/${id}`)}>
              <InfoIcon />
            </IconButton>
          </h2>
          <p style={rating} className="movie__rating">⭐{movie.rating}</p>
        </div>
        {show ? <p className='movie__summary'>{movie.summary}</p> : null}
      </CardContent>
      <CardActions>
        <Count />
      </CardActions>


    </Card>
  )
}
function ColorPox({ color }) {
  let sty = {
    width: "250px", height: "25px", marginTop: "10px", background: color,
  }
  return (<div style={sty}>

  </div>)
}
function AddColor() {

  let [color, setColor] = useState("");
  let styles = {
    background: color,
  };
  let [colorList, setColorList] = useState([
    "crimson", "orangered", "red"
  ]
  );
  // let colorList = ["crimson", "orangered", "orange", "red"]
  return (
    <div>
      <input type="text" style={styles}
        placeholder="enter the color"
        onChange={(event) => setColor(event.target.value)}
        value={color} />
      <button onClick={() => setColorList([...colorList, color])}>Add Color</button>
      {colorList.map((ele) => (<ColorPox color={ele} />))}
    </div>
  );
}


function AddMovie({ movieList, setMovieList }) {
  const [name, setName] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");
  const [summary, setSummary] = useState("");
  const addMovie = () => {
    const newMovie = {
      name: name,
      poster: poster,
      rating: rating,
      summary: summary,
    };

    setMovieList([...movieList, newMovie])
    console.log(newMovie);
  }
  return (
    <div className='add-movie-form'>
      <TextField label="name" variant='outlined' onChange={(event) =>
        setName(event.target.value)} />
      <TextField label="poster" variant='outlined' onChange={(event) =>
        setPoster(event.target.value)} />
      <TextField label="rating" variant='outlined' onChange={(event) =>
        setRating(event.target.value)} />
      <TextField label="summary" variant='outlined' onChange={(event) =>
        setSummary(event.target.value)} />
      <Button variant='contained' onClick={addMovie}>Add Movie</Button>
    </div>
  )
}

export default App;
