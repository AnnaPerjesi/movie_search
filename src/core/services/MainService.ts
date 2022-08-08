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
                      score
                      genres {
                        name
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

  getMoovieById = async (movieId: string) => {
    const data = await client
      .query({
        query: gql`
                  query getMovie {
                    movie(id: "${movieId}") {
                      id
                      name
                      overview
                      releaseDate
                      score
                      poster {
                        small
                      }
                      genres {
                        name
                      }
                      cast(limit: 5) {
                        id
                        person {
                          name
                        }
                        role {
                          ... on Cast {
                            character
                          }
                        }
                      }
                      crew(limit: 5) {
                        id
                        person {
                          name
                        }
                        role {
                          ... on Crew {
                            job
                            department
                          }
                        }
                      }
                    }
                  }
                `,
      })
      .then((result) => {
        return result.data.movie;
      });

    return data;
  };
}

// cast {
//   id
//   person {
//     name
//   }
// }

export default MainService;
