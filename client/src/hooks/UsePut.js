export const UsePut = ({
  user,
  data,
  updateUser,
  url,
  object,
  input,
  update,
}) => {
  const movieId = data.id;
  const findMovie = object.findIndex((item) => item.id === movieId);
  const handlePut = () => {
    if (!user.email) {
      return;
    }
    console.log(findMovie);
    const copy = object;
    if (findMovie === -1) {
      copy.push(data);
    } else {
      copy.splice(findMovie, 1);
    }
    updateUser(update);
    fetch(`/api/${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return [handlePut, findMovie];
};
