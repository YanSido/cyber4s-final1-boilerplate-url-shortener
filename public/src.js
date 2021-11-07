const homeUrl = "https://cryptic-bastion-17430.herokuapp.com";

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
      url: `${homeUrl}/api/shorturl/new`,
      headers: headers,
      data: { url: url },
    });

    if (response.data === "already has this URL shorted") {
      addValidationMessage("You already shorted this URL");
    } else {
      addNewShortUrl(response.data);
    }
  } catch (error) {
    throw error;
  }
};

const urlInfo = async (shortUrl) => {
  // Gets url information
  let response = "";
  try {
    const headers = {
      username: document.getElementById("username-input").value,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    response = await axios({
      method: "get",
      url: `${homeUrl}/api/statistic/${shortUrl}`,
      headers: headers,
    });
    addUrlInfo(response.data);
  } catch (error) {
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

function addNewShortUrl(url) {
  document.getElementById("url_input").style.borderColor = "black";
  let NewShortUrl = document.createElement("p");
  NewShortUrl.innerText = url;
  NewShortUrl.setAttribute("id", "NewShortUrl");
  NewShortUrl.style.color = "black";
  document.getElementById("url_input").parentNode.appendChild(NewShortUrl);
}

function removeNewShortUrl() {
  // Removes validation message
  if (document.getElementById("NewShortUrl")) {
    document.getElementById("NewShortUrl").remove();
    document.getElementById("url_input").style.borderColor = "black";
  }
}

function addUrlInfo(data) {
  let urlInfo = document.createElement("div");
  urlInfo.setAttribute("id", "urlInfo");
  let urlEl = document.createElement("p");
  let newUrlEl = document.createElement("p");
  let urlClickedEl = document.createElement("p");
  let dateCreatedEl = document.createElement("p");
  urlEl.innerText = `URL: ${Object.keys(data)[0]}`;
  newUrlEl.innerText = `Shorted URL: ${
    data[Object.keys(data)[0]].newUrl.split("/")[-1]
  }`;
  urlClickedEl.innerText = `Shorted URL Clicked: ${
    data[Object.keys(data)[0]].urlClicked
  }`;
  dateCreatedEl.innerText = `Date Created: ${
    data[Object.keys(data)[0]].dateCreated
  }`;
  urlInfo.appendChild(urlEl);
  urlInfo.appendChild(newUrlEl);
  urlInfo.appendChild(urlClickedEl);
  urlInfo.appendChild(dateCreatedEl);
  document.getElementById("url_input").parentNode.appendChild(urlInfo);
}

function removeUrlInfo() {
  if (document.getElementById("urlInfo")) {
    document.getElementById("urlInfo").remove();
  }
}

// Event listeners
document.getElementById("short-btn").addEventListener("click", () => {
  removeUrlInfo();
  removeNewShortUrl();
  removeValidationMessage();
  if (checkUrl(document.getElementById("url_input").value)) {
    shortUrl(document.getElementById("url_input").value);
  } else {
    addValidationMessage("Invalid URL");
  }
});

document.getElementById("view-details").addEventListener("click", () => {
  removeUrlInfo();
  removeNewShortUrl();
  removeValidationMessage();
  if (checkUrl(document.getElementById("url_input").value)) {
    addValidationMessage("Invalid URL");
  } else {
    urlInfo(document.getElementById("url_input").value);
  }
});
