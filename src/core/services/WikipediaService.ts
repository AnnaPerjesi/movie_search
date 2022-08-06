import { toJS } from "mobx";

class WikipediaService {
  async getMovieOverview(movieTitle: string) {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${movieTitle}&origin=*`
    );

    const data = await response.json();

    if (data) {
      const pages = data.query?.pages;
      if (pages) {
        const key = Object.keys(pages)[0];
        const overview = data.query?.pages[key].extract;

        if (overview) {
          return overview;
        }
      }
    }

    return "No wikipedia is found";
  }

  async getIMBDId(movieId: string) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/external_ids?api_key=59e0af677b78b2af96e95038dfa5bdee`
    );
    const data = await response.json();
    if (data) {
      return data.imdb_id;
    }

    return "-1";
  }
}

export default new WikipediaService();
