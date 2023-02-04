<template>
  <div class="body-container">
    <div class="meal-finder">
      <el-container>
        <el-header height>
          <h1>Meal Finder</h1>
          <div class="searchMeal">
            <el-input
              class="mealInput"
              placeholder="Search for meals or keywords"
              v-model="value"
            >
              <el-button
                @click.prevent="searchBtn"
                slot="append"
                icon="el-icon-search"
              ></el-button>
            </el-input>
            <el-button
              @click="randomBtn"
              class="mealFood"
              icon="el-icon-dish"
            ></el-button>
          </div>
        </el-header>
        <el-main>
          <div v-show="basicFood">
            <div class="result-heading" v-if="searchValue">
              <h2 v-if="latestMeals.length > 0">
                Search results for '{{ searchValue }}':
              </h2>
              <p v-else>There are no search results. Try again!</p>
            </div>
            <div class="meals">
              <el-menu class="el-menu">
                <el-menu-item
                  class="el-menu-item"
                  style="padding-left: 0"
                  v-for="(meal, index) in meals"
                  :key="index"
                  @click="selectMeal(meal)"
                >
                  <el-image
                    :src="meal.strMealThumb"
                    :alt="meal.strMeal"
                    class="el-image__inner"
                    fit="fit"
                  ></el-image>
                  <div class="meal-info">
                    <h3>{{ meal.strMeal }}</h3>
                  </div>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
          <div class="single-meal" v-if="singleInfo">
            <h1>{{ meal.strMeal }}</h1>
            <el-image
              :src="meal.strMealThumb"
              :alt="meal.strMeal"
              class="el-image-info"
              fit="fit"
            ></el-image>
            <div class="single-meal-info">
              <p>{{ meal.strCategory }}</p>
              <p>{{ meal.strArea }}</p>
            </div>
            <div class="main-info">
              <p>{{ meal.strInstructions }}</p>
              <h2>Ingredients</h2>
              <el-menu>
                <el-menu-item
                  style="padding-left: 5px"
                  v-for="(ingredient, index) in ingredients"
                  :key="index"
                  >{{ ingredient }}
                </el-menu-item>
              </el-menu>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  name: "MealFinder",
  data() {
    return {
      meal: {},
      ingredient: "",
      value: "",
      searchValue: "",
      singleInfo: false,
      meals: [],
      latestMeals: [],
      ingredients: [],
      basicFood: true,
    };
  },
  methods: {
    selectMeal(meal) {
      this.meal = meal;
      this.singleInfo = true;
      this.ingredients = [];
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          this.ingredients.push(
            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
          );
        } else {
          break;
        }
      }
    },
    searchBtn() {
      if (this.value === "") {
        alert("Please enter a search term");
      }
      if (this.value.trim()) {
        this.searchValue = "";
        this.basicFood = true;
        this.singleInfo = false;
        fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.value}`
        )
          .then((res) => res.json())
          .then((data) => {
            this.searchValue = this.value;
            this.value = "";
            console.log(data);
            if (data.meals !== null) {
              this.meals = data.meals;
              this.latestMeals = data.meals;
            } else {
              this.latestMeals = [];
            }
          });
      }
    },
    randomBtn() {
      this.basicFood = false;
      fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then((res) => res.json())
        .then((data) => {
          const meal = data.meals[0];
          this.selectMeal(meal);
        });
    },
  },
};
</script>
<style scoped>
.body-container {
  background: #2d2013;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.meal-finder {
  color: #fff;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin: 0;
  min-height: 100vh;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.searchMeal {
  display: flex;
  justify-content: center;
}
h1 {
  text-align: center;
}
::v-deep .el-input__inner {
  width: 300px;
  padding: 8px 10px;
}
::v-deep .el-input-group__append {
  padding: 8px 10px;
  margin: 0;
}
::v-deep .el-icon-search {
  font-size: 14px;
  font-weight: 900;
  color: #000;
}
::v-deep .el-icon-dish {
  font-size: 14px;
  font-weight: 900;
  color: #000;
}
.el-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.mealFood {
  padding: 8px 10px;
  background: rgb(239, 239, 239);
  margin-left: 10px;
}
.el-menu {
  border: 0;
  padding: 0;
  background-color: inherit;
}
.meals .el-menu {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  margin-top: 20px;
}
.el-menu::before {
  display: none;
}
.meals .el-menu-item {
  width: 200px;
  height: 200px;
  padding: 0;
  position: relative;
  line-height: 30px;
  white-space: inherit;
}
.el-image__inner {
  width: 100%;
  height: 100%;
  border: 4px #fff solid;
}
.meal-info {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease-in;
  opacity: 0;
}
.meal-info:hover {
  opacity: 1;
  z-index: 1;
  color: #fff;
}
.el-image-info {
  width: 300px;
  margin: 15px;
  border: 4px #fff solid;
  border-radius: 2px;
}
.single-meal-info {
  margin: 20px;
  padding: 10px;
  border: 2px #e09850 dashed;
  border-radius: 5px;
}
.main-info .el-menu {
  padding-left: 0;
  list-style-type: none;
}
.main-info .el-menu-item {
  border: 1px solid #ededed;
  border-radius: 5px;
  background-color: #fff;
  display: inline-flex;
  color: #2d2013;
  height: 27px;
  font-size: 12px;
  font-weight: bold;
  padding: 5px;
  margin: 0 5px 5px 0;
  align-items: center;
  justify-content: center;
}
</style>