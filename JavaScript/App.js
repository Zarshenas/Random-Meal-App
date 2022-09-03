const elMealBtn = document.getElementById("mealGetter"),
      elMealContainer = document.querySelector(".random-meal-container");
let randomMeal;

elMealBtn.addEventListener("click", function () {
  axios
    .get("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => {
      randomMeal = response.data.meals[0];
      matchMeal(randomMeal);
      console.log(randomMeal)
    });
});

const matchMeal = (meal) => {
  const {
    strArea,
    strCategory,
    strTags,
    strMeal,
    strMealThumb,
    strInstructions,
    strYoutube,
  } = randomMeal;
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} : ${meal[`strMeasure${i}`]}`
      );
    } else break;
  }
  const mealHtml = `
        <div id="space" style="height:40px;width:100%;opacity:0;"></div>
        <div class="section-first">            
            ${strMealThumb ? `<img id="meal-img" src="${strMealThumb}" alt="meal-photo" />`:""}
            <div class="meal-info">
              ${strCategory ? `<p><strong>Category</strong> : ${strCategory}</p>`:""}
              ${strArea ? `<p><strong>Area</strong> : ${strArea}</p>`:""}
              ${strTags ? `<p><strong>Tags</strong> : ${strTags}</p>`:""}
            </div>
        </div>
        
        <div class="section-second">
            <h1>${strMeal}</h1>
            <p>${strInstructions}</p>
        </div>

        <div class="section-third">
            <h1>Ingredients :</h1>
            <ul>
                ${ingredients.map((item) => `<li>${item}</li>`).join("")}
            </ul>
        </div>
        ${
          strYoutube ?
          `<div class="section-fourth">
                <h1>Recipe Video :</h1>
                <div>
                  <iframe width="100%" height="400" src="https://www.youtube.com/embed/${strYoutube.slice(-11)}">
                  </iframe>
                </div>
            </div>`:""
        }

    `;
  elMealContainer.innerHTML = mealHtml;
  document.getElementById("space").scrollIntoView({behavior: "smooth"});
};
