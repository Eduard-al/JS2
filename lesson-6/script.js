const API_URL = '/goods.json';

Vue.component('search', {
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

Vue.component('goods-item', {
    template: '<div :data-id="id" class="goods-item"><div class="img-item"></div><h3>{{ title }}</h3><p>{{ price }}</p></div>',
    props: ['title', 'price', 'id']
})


Vue.component('cart', {
    template: `<div>
    <button class="cart-button" @click="openCartHandler" type="button">Корзина</button>
    <div v-if="isVisibleCart" v-on:click="removeHandler">
      <slot></slot>
    </div>
  </div>`,
    data() {
        return {
            isVisibleCart: false
        }
    },
    methods: {
        openCartHandler() {
            this.isVisibleCart = !this.isVisibleCart;
        },

        removeHandler(e) {
            this.$emit('remove', e)
        }
    }
})

const vue = new Vue({
    el: "#app",
    data: {
        cart: [],
        goods: [],
        filtredGoods: [],
        search: '',
        isLoaded: false,
    },
    methods: {
        addToCartHandler(e) {
            const id = e.target.closest('.goods-item').dataset.id;
            const good = this.goods.find((item) => item.id == id);

            this.cart.push(good);
        },

        removeFromCartHandler(e) {

            const id = e.target.closest('.goods-item').dataset.id;
            const goodIndex = this.cart.findIndex((item) => item.id == id);

            this.cart.splice(goodIndex - 1, 1);
        },

        searchHandler(search) {
            if (search === '') {
                this.filtredGoods = this.goods;
            }
            const regexp = new RegExp(search, 'gi');
            this.filtredGoods = this.goods.filter((good) => regexp.test(good.title));
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
                        success(JSON.parse(xhr.responseText));
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
                this.isLoaded = true
            })
            .catch(err => {
                console.log(err);
            })
    }
})