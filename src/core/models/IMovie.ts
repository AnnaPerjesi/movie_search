export default interface IMovie {
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

export interface IGenre {
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
