export default {
   getAllMovies(pageID) {
    let page = pageID;
    const url = `https://yts.ag/api/v2/list_movies.json?page=${page}`;
    if (page === null) {
      page = 1;
    }
    return fetch(url)
      .then((response) => {
        return response.json();
      });
  }
}
