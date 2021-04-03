const API_URL = '/goods.json';
import search from './modul_search';
import goodsItem from './modul_goodsIitem';
import cart from './modul_cart';


/* Vue.component('goods-item', {
    template: '<div :data-id="id" class="goods-item"><div class="img-item"></div><h3>{{ title }}</h3><p>{{ price }}</p></div>',
    props: ['title', 'price', 'id']
}) */


/* Vue.component('cart', {
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
}) */

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
            const id = e.target.closest('.goodsItem').dataset.id;
            const good = this.goods.find((item) => item.id == id);
            fetch('/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(good)
            })
            this.cart.push(good);
        },

        removeFromCartHandler(e) {

            const id = e.target.closest('.goodsItem').dataset.id;
            const goodIndex = this.cart.findIndex((item) => item.id == id);

            this.cart.splice(goodIndex, 1);

            fetch('/cart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })
        },

        searchHandler(search) {
            if (search === '') {
                this.filtredGoods = this.goods;
            }
            const regexp = new RegExp(search, 'gi');
            this.filtredGoods = this.goods.filter((good) => regexp.test(good.title));
        },


    },
    mounted() {
        fetch('/data')
            .then(response => response.json())
            .then(data => {
                this.goods = data;
                this.filtredGoods = data;

                this.isLoaded = true;
            })
            .catch(err => {
                console.log(err);
            })
        fetch('/cart')
            .then(response => response.json())
            .then(data => {
                this.cart = data;
            })
            .catch(err => {
                console.log(err);
            })
    }
})
