import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const webApiUrl = "https://tmdb.sandbox.zoosh.ie/dev";

const client = new ApolloClient({
  uri: webApiUrl,
  cache: new InMemoryCache(),
});

class MainService {
  serachMovie = async (params: any) => {
    const data = await client
      .query({
        query: gql`
                  query SearchMovies {
                    searchMovies(query: "${params}") {
                      id
                      name
                      overview
                      releaseDate
                      cast {
                        id
                        person {
                          name
                        }
                      }
                    }
                  }
                `,
      })
      .then((result) => {
        // console.log("then", result);
        return result.data;
      });

    return data;
  };
}

export default MainService;
