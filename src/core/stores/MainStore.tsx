import { flow, makeAutoObservable, runInAction, toJS } from "mobx";
import MainService from "../services/MainService";

export interface IMovie {
  id: number;
  name: string;
  overview: string;
  releaseDate: string | Date;
}

class MainStore {
  private MainService: MainService = null;

  movies: IMovie[] = [];
  isLoading: boolean = true;

  query: string = "Love";

  constructor() {
    this.MainService = new MainService();

    makeAutoObservable(this, {
      searchMovies: flow,
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
    }
  }

  onChangeInput(value: string) {
    console.log(value);
    this.query = value;
  }
}
export default MainStore;
