const shortUrl = async (url) => {
  // sends url to server and returns shorted url
  let response = "";
  try {
    const headers = {
      username: document.getElementById("username-input").value,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    response = await axios({
      method: "post",
      url: `http://localhost:3000/api/shorturl/new`,
      headers: headers,
      data: { url: url },
    });
    console.log(response);
  } catch (error) {
    alert(error);
    throw error;
  }
};

// Event listeners
document.getElementById("short-btn").addEventListener("click", () => {
  shortUrl(document.getElementById("url_input").value);
});
