function checkUrl(url) {
  // Checks if url is valid
  let pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(url);
}

const shortUrl = async (url) => {
  // Sends url to server and returns shorted url
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

    if (response.data === "already has this URL shorted") {
      addValidationMessage("You already shorted this URL");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

function addValidationMessage(message) {
  // Adds validation message
  document.getElementById("url_input").style.borderColor = "red";
  let validationMessage = document.createElement("p");
  validationMessage.innerText = message;
  validationMessage.setAttribute("id", "validationMessage");
  validationMessage.style.color = "red";
  document
    .getElementById("url_input")
    .parentNode.appendChild(validationMessage);
}

function removeValidationMessage() {
  // Removes validation message
  if (document.getElementById("validationMessage")) {
    document.getElementById("validationMessage").remove();
    document.getElementById("url_input").style.borderColor = "black";
  }
}

// Event listeners
document.getElementById("short-btn").addEventListener("click", () => {
  removeValidationMessage();
  if (checkUrl(document.getElementById("url_input").value)) {
    shortUrl(document.getElementById("url_input").value);
  } else {
    addValidationMessage("Invalid URL");
  }
});
