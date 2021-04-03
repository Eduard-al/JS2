export default Vue.component('goodsItem', {
    template: '<div :data-id="id" class="goods-item"><div class="img-item"></div><h3>{{ title }}</h3><p>{{ price }}</p></div>',
    props: ['title', 'price', 'id']
})