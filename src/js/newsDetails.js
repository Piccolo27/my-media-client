import axios from "axios";
import { mapGetters } from "vuex";
export default {
    name: 'NewsDetails',
    data () {
        return {
            posts: {},
            postId: 0,
            tokenStatus: false,
            viewCount: 0,
        }
    },
    computed: {
        ...mapGetters(["storageToken", "storageUserData"]),
      },
    methods: {
        loadPost () {
            let post = {
                postId: this.postId
            };

            axios.post('http://localhost:8000/api/posts/details', post)
            .then((response) => {
                console.log(response.data.post);
                    if (response.data.post.image != null){
                        response.data.post.image = "http://localhost:8000/postImage/" + response.data.post.image; 
                    } else {
                        response.data.post.image = "http://localhost:8000/defaultImage/default-image.jpg"; 
                    }   

                this.posts = response.data.post;
            })
            .catch((error) => console.log(error));
        },
        back(){
            // history.back();

            this.$router.push({
                name: 'home'
            })
        },
        home(){
            this.$router.push({
                name: 'home',
            });
        },
        login(){
            this.$router.push({
                name: 'login',
            });
        },
        logout(){
            this.$store.dispatch('setToken', null);
            this.login();
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
    },
    mounted () {
        let data = {
            user_id: this.storageUserData.id,
            post_id: this.$route.params.newsId,
        }
        axios.post("http://localhost:8000/api/posts/action-logs", data)
        .then((response) => {
            this.viewCount = response.data.post.length
        });
        this.checkToken();
        this.postId = this.$route.params.newsId;
        this.loadPost();
    },
}