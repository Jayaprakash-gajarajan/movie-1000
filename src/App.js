import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Add, AirlineSeatReclineNormalRounded, YouTube } from '@mui/icons-material';
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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { API } from './global';
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
  const [mode, setMode] = useState("light")
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const dk = {
    marginLeft: "auto"
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper elevation={8} style={{ minHeight: "100vh" }}>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
              <Button color="inherit" onClick={() => navigate("/movies")}>Movie</Button>
              <Button color="inherit" onClick={() => navigate("/add-movie")}>Add Movie</Button>
              <Button color="inherit" onClick={() => navigate("/color")}>Color Game</Button>

              <Button style={dk} color="inherit" startIcon={mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                onClick={() => setMode(mode === "light" ? "dark" : "light")}>Dark Mode</Button>

            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/flims" element={<Navigate replace to="/movies" />} /> */}
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/color" element={<AddColor />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path=" /edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Paper>
    </ThemeProvider >
  );
}
function Edit() {
  return (
    <div>
      <h1>Here you can edit the movie</h1>
    </div>
  )
}
function Home() {
  return (
    <div className='home'>
      Welcome to the App
    </div>
  )
}
function NotFound() {
  return (
    <div>404 not found</div>
  )
}
// function declaration
function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const getMovies = () => {
    fetch(`${API}/movies`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((msv) => setMovieList(msv));

  };
  useEffect(() => getMovies(), [])
  const st = {
    marginLeft: "auto"
  }

  const deleteMovie = (id) => {
    fetch(`${API}/movies/${id}`, {
      method: "DELETE",
    }).then((data) => getMovies());
    console.log(id);
  };
  const navigate = useNavigate();
  return (
    <div>
      <div className='movie__list'>
        {movieList.map((mv) => (
          <div key={mv._id}>
            <Movie movie={mv}
              id={mv._id}
              editButton={
                <IconButton style={st} color='secondary' onClick={() => navigate(`movies/edit/${mv._id}`)}><EditIcon /></IconButton>}
              deleteButton={
                <IconButton style={st} color='error' onClick={() => deleteMovie(mv._id)}><DeleteIcon /></IconButton>}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
function MovieDetail() {
  const [movie, SetMovie] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const rating = {
    color: movie.rating > 8 ? "green" : "red"
  }
  useEffect(() => {
    fetch(`${API}/movies/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mv) => SetMovie(mv))
  }, []);
  console.log(movie);
  return (
    <div>
      <iframe width="100%"
        height="600"
        src={movie.trailer}
        title={movie.title}
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
      </IconButton>{"    "}
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
function Movie({ movie, id, deleteButton, editButton }) {
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
        <Count />{editButton}{deleteButton}

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
    <div className='color'>
      <input type="text" style={styles}
        placeholder="enter the color"
        onChange={(event) => setColor(event.target.value)}
        value={color} />
      <button onClick={() => setColorList([...colorList, color])}>Add Color</button>
      {colorList.map((ele, key) => (<ColorPox color={ele} index={key} />))}
    </div>
  );
}
const movieValidationShema = yup.object({
  name: yup.string().required(),
  poster: yup.string().required().min(4),
  rating: yup.number().required().min(0).max(10),
  summary: yup.string().required().max(20),
  trailer: yup.string().required().min(4).url(),
})

function AddMovie() {
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        poster: "",
        rating: "",
        summary: "",
        trailer: "",
      },
      validationSchema: movieValidationShema,
      onSubmit: (newMovie) => {
        console.log("Form values:", newMovie);
        addMovie(newMovie);
      },
    });
  const navigate = useNavigate();
  const addMovie = (newMovie) => {
    //   const newMovie = {
    //     name: name,
    //     poster: poster,
    //     rating: rating,
    //     summary: summary,
    //     trailer: trailer,
    //   };
    fetch(`${API}/movie`, {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers: { "content-type": "application/json" }
    }).then(() => navigate("/movies"))

    //   // setMovieList([...movieList, newMovie])
    //   // console.log(newMovie);
  };
  return (
    <form onSubmit={handleSubmit} className='add-movie-form'>
      <TextField
        label="name"
        variant='outlined'
        name="name"
        value={values.name}
        onChange={handleChange}onBlur={handleBlur}
      />
      {touched.name && errors.name ? errors.name : null}
      <TextField
        label="poster"
        variant='outlined'
        name="poster"
        value={values.poster}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.poster && errors.poster ? errors.poster : null}

      <TextField
        label="rating"
        variant='outlined'
        name="rating"
        value={values.rating}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.rating && errors.rating ? errors.rating : null}

      <TextField
        label="summary"
        variant='outlined'
        name="summary"
        value={values.summary}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.summary && errors.summary ? errors.summary : null}
      <TextField
        label="trailer"
        variant='outlined'
        value={values.trailer}
        name="trailer"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.trailer && errors.trailer ? errors.trailer : null}

      <Button type="submit" variant='contained'>Add Movie</Button>
    </form>
  )
}

export default App;
