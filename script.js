const API_KEY = "53449198-324ac466db849c58ac5cc259a";

 
const PER_PAGE = 12; 

let page = 1;

const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("loadMoreBtn");


async function fetchEditorsChoice(page = 1) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&editors_choice=true&image_type=photo&per_page=${PER_PAGE}&page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Помилка запиту до Pixabay API");
  }

  return response.json();
}


function renderImages(images) {
  const markup = images
    .map(
      img => `
        <div class="img-card">
          <img src="${img.webformatURL}" alt="${img.tags}">
        </div>
      `
    )
    .join("");

  gallery.insertAdjacentHTML("beforeend", markup);
}


async function loadMore() {
  page += 1;

  try {
    const data = await fetchEditorsChoice(page);
    renderImages(data.hits);

    if (data.hits.length < PER_PAGE) {
      loadMoreBtn.style.display = "none"; 
    }
  } catch (error) {
    console.error(error);
  }
}


async function init() {
  try {
    const data = await fetchEditorsChoice(page);
    renderImages(data.hits);
  } catch (error) {
    console.error(error);
  }
}

init();
loadMoreBtn.addEventListener("click", loadMore);
