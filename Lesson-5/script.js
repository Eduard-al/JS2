const API_URL = '/goods.json';

const vue = new Vue({
    el: "#app",
    data: {
        goods: [],
        filtredGoods: [],
        cart: [],
        search: '',
        isCartOpen: false,

    },
    methods: {
        openCartHandler() {
            this.isCartOpen = !this.isCartOpen
        },
        searchHandler() {

            if (this.search === '') {
                this.filtredGoods = this.goods;
            }
            const regexp = new RegExp(this.search, 'gi');
            this.filtredGoods = this.goods.filter((good) => regexp.test(good.title));
        },
        addToCart(e) {
            const index = e.target.dataset.index;
            this.cart.push(this.filtredGoods[index]);
            console.log(this.cart)
        },
        removeCartHandler(e) {
            const index = e.target.dataset.index;
            this.cart.splice(index, 1)
        },
        fetch(error, success) {
            let xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {

                        success(JSON.parse(xhr.responseText))

                    } else if (xhr.status > 400) {
                        error('все пропало');
                    }
                }
            }

            xhr.open('GET', API_URL, true);
            xhr.send();
        },

        fetchPromise() {

            return new Promise((resolve, reject) => {
                this.fetch(reject, resolve)

            })
        }
    },
    mounted() {

        this.fetchPromise()
            .then(data => {

                this.goods = data;
                this.filtredGoods = data;
            })
            .catch(err => {
                console.log(err);
            })
    }

})
