import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "HomePage",
  data() {
    return {
      postLists: {},
      categoryLists: {},
      searchKey: "",
      tokenStatus: false,
    };
  },
  computed: {
    ...mapGetters(["storageToken", "storageUserData"]),
  },
  methods: {
    getAllPosts() {
      axios
        .get("http://localhost:8000/api/allPostList")
        .then((response) => {
          for (let i = 0; i < response.data.post.length; i++) {
            if (response.data.post[i].image != null) {
              response.data.post[i].image =
                "http://localhost:8000/postImage/" +
                response.data.post[i].image;
            } else {
              response.data.post[i].image =
                "http://localhost:8000/defaultImage/default-image.jpg";
            }
          }

          this.postLists = response.data.post;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadCategory() {
      axios
        .get("http://localhost:8000/api/allCategory")
        .then((response) => {
          this.categoryLists = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    search() {
      let search = {
        key: this.searchKey,
      };
      console.log("data searching...");
      axios
        .post("http://localhost:8000/api/posts/search", search)
        .then((response) => {
          for (let i = 0; i < response.data.searchData.length; i++) {
            if (response.data.searchData[i].image != null) {
              response.data.searchData[i].image =
                "http://localhost:8000/postImage/" +
                response.data.searchData[i].image;
            } else {
              response.data.searchData[i].image =
                "http://localhost:8000/defaultImage/default-image.jpg";
            }
          }

          this.postLists = response.data.searchData;
        });
    },
    categorySearch(searchKey) {
      let search = {
        key: searchKey,
      };

      axios
        .post("http://localhost:8000/api/categories/search", search)
        .then((response) => {
          for (let i = 0; i < response.data.result.length; i++) {
            if (response.data.result[i].image != null) {
              response.data.result[i].image =
                "http://localhost:8000/postImage/" +
                response.data.result[i].image;
            } else {
              response.data.result[i].image =
                "http://localhost:8000/defaultImage/default-image.jpg";
            }
          }

          this.postLists = response.data.result;
        })
        .catch((error) => console.log(error));
    },
    newsDetails(id) {
      this.$router.push({
        name: "newsDetails",
        params: {
          newsId: id,
        },
      });
    },
    home() {
      this.$router.push({
        name: "home",
      });
    },
    login() {
      this.$router.push({
        name: "login",
      });
    },
    checkToken() {
      if (
        this.storageToken != null &&
        this.storageToken != undefined &&
        this.storageToken != ""
      ) {
        this.tokenStatus = true;
      } else {
        this.tokenStatus = false;
      }
    },
    logout(){
        this.$store.dispatch('setToken', null);
        this.login();
    }
  },
  mounted() {
    this.checkToken();
    this.getAllPosts();
    this.loadCategory();
  },
};
