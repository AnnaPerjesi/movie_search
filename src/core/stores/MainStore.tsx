import { flow, makeAutoObservable, runInAction, toJS } from "mobx";
import MainService from "../services/MainService";
import WikipediaService from "../services/WikipediaService";

export interface IMovie {
  id: string;
  name: string;
  overview: string;
  releaseDate: string | Date;
  score: string;
  genres: IGenre[];
  cast: ICast[];
  crew: ICrew[];
  wikipediaOverview: string;
  poster: IPoster;
  IMBDId: string;
}

interface IPoster {
  small: string;
}

interface ICrew {
  person: IPerson;
  role: IRole;
}

interface IGenre {
  name: string;
}

interface ICast {
  person: IPerson;
  role: IRole;
}

interface IPerson {
  name: string;
}

interface IRole {
  character: string;
  job: string;
  department: string;
}

class MainStore {
  private MainService: MainService = null;

  movies: IMovie[] = [];
  isLoading: boolean = true;

  query: string = "Love";
  selectedMoveId: string = "";
  selectedMovie: IMovie = null;

  constructor() {
    this.MainService = new MainService();

    makeAutoObservable(this, {
      searchMovies: flow,
      getMovie: flow,
    });

    this.searchMovies();
  }

  *searchMovies(): any {
    try {
      this.isLoading = true;
      const data = yield this.MainService.serachMovie(this.query);
      console.log("data", toJS(data));
      if (data) {
        this.movies = data.searchMovies.map((movie: any) => {
          return {
            ...movie,
          };
        });
      }
      this.isLoading = false;
    } catch (error) {
      console.log("error");
      this.movies = [];
      this.isLoading = false;
    }
  }

  *getMovie(): any {
    if (!this.selectedMoveId) {
      this.selectedMovie = null;
    } else {
      try {
        this.isLoading = true;
        const data = yield this.MainService.getMoovieById(this.selectedMoveId);
        if (data) {
          this.selectedMovie = data;

          this.selectedMovie.wikipediaOverview =
            yield WikipediaService.getMovieOverview(this.selectedMovie.name);

          this.selectedMovie.IMBDId = yield WikipediaService.getIMBDId(
            this.selectedMoveId
          );

          console.log("getMovie", toJS(this.selectedMovie));
        }
        this.isLoading = false;
      } catch (error) {
        console.log("error");

        this.isLoading = false;
      }
    }
  }

  onChangeInput(value: string) {
    console.log(value);
    this.query = value;
  }

  setSelectedMovieId(id: string) {
    this.selectedMoveId = id;
    this.getMovie();
  }

  get getSelectedMovie(): IMovie {
    if (this.selectedMoveId) {
      console.log(
        "movie",
        this.movies.find((movie) => movie.id === this.selectedMoveId)
      );
      return this.movies.find((movie) => movie.id === this.selectedMoveId);
    }
    return null;
  }
}
export default MainStore;
