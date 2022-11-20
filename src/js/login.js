import axios from "axios";
import { mapGetters } from "vuex";
export default {
    data () {
        return {
            userData: {
                email: "",
                password: "",
            },
            userStatus: false,
        };
    },
    computed: {
        ...mapGetters(['storageToken','storageUserData']), 
    },
    methods: {
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
        accountLogin(){
            axios.post("http://localhost:8000/api/user/login", this.userData)
            .then((response) => {
                if(response.data.token == null){
                    this.userStatus = true;
                }
                else{
                    this.userStatus = false;
                    this.$store.dispatch('setToken', response.data.token);
                    this.$store.dispatch('setUserData', response.data.user);
                    this.home();
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },
};