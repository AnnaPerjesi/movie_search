import { flow, makeAutoObservable, runInAction, toJS } from "mobx";
import IMovie from "../models/IMovie";
import MainService from "../services/MainService";
import WikipediaService from "../services/WikipediaService";

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

  /**
   * get movies from https://tmdb.sandbox.zoosh.ie/dev by query
   */
  *searchMovies(): any {
    try {
      this.isLoading = true;
      const data = yield this.MainService.serachMovie(this.query);
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

  /**
   * get movie by Id
   * After we have the movie we havet to get data from wikipedia and the IMBD id of the film
   */
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
        }
        this.isLoading = false;
      } catch (error) {
        console.log("error");

        this.isLoading = false;
      }
    }
  }

  /**
   * change the filter text of search field
   * @param value
   */
  onChangeInput(value: string) {
    this.query = value;
  }

  /**
   * set selected film id by clicking on movie title's cell
   * @param id
   */
  setSelectedMovieId(id: string) {
    this.selectedMoveId = id;
    this.getMovie();
  }
}
export default MainStore;
