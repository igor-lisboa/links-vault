export default {
    methods: {
        forceLogout(pageName) {
            this.$store.dispatch("logout").then(() => {
                this.$swal.fire(pageName, "Seu acesso expirou", "warning");
                this.$router.push({ name: "login" });
            });
        },
    }
}