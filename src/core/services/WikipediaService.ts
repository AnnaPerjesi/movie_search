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
}

export default new WikipediaService();
