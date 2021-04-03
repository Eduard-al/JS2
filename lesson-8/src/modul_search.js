export default Vue.component('search', {
    template: '<div><input id="search" v-model="search" ><button v-on:click="searchHandler">SEARCH</button></div>',
    data() {
        return {
            search: ''
        }
    },
    methods: {
        searchHandler() {
            this.$emit('search', this.search);
        }
    }
})
