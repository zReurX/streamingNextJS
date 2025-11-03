import { TMDB } from 'tmdb-ts';

const tmdb = new TMDB(process.env.TMDB_API_TOKEN);

export default tmdb