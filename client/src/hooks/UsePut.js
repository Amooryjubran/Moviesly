export const UsePut = ({
  user,
  data,
  updateUser,
  url,
  object,
  input,
  update,
  isUpdated,
  setIsUpdated,
}) => {
  const movieId = data.id;
  const findMovie = object.findIndex((item) => item.id === movieId);
  const handlePut = () => {
    if (!user.email) {
      return;
    }
    setIsUpdated(!isUpdated);
    const copy = object;
    if (findMovie === -1) {
      copy.push(data);
    } else {
      copy.splice(findMovie, 1);
    }
    updateUser(update);
    fetch(`${process.env.REACT_APP_SERVER_API}/api/${url}`, {
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
  return [handlePut];
};
