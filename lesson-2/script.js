class ApiMock {
    constructor() {
    }
    fetch() {
        return [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }
}
class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    getHtml() {
        let button = '<button class="cart-button" type="button">Добавить</button>'
        let img = '<div class="img-item"></div>'
        return `<div class="goods-item">${img}<h3>${this.title}</h3><p>${this.price}</p>${button}</div>`;
    }
}
//скидки
class Sale extends GoodsItem {
    constructor(title, price) {
        super(title, price);
    }
    getHtml() {
        return `<div class="goods-item "><div class="sale">sale</div><div class="img-item"></div><h3>${this.title}</h3><p>${this.price}</p><button class="cart-button" type="button">Добавить</button></div>`;

    }
}
class GoodsList {
    constructor() {
        this.api = new ApiMock();
        this.$goodsList = document.querySelector('.goods-list');
        this.sumTotal = document.querySelector('.sum');
        this.goods = [];

    }
    fetchGoods() {
        this.goods = this.api.fetch().map(({ title, price }) => new /* GoodsItem */Sale(title, price));

    }
    render() {
        this.$goodsList.textContent = '';
        this.goods.forEach((good) => {
            this.$goodsList.insertAdjacentHTML('beforeend', good.getHtml());
        })
    }
    // общая стоимость товаров
    sum() {

        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price
        });

        this.sumTotal.textContent = '';

        this.sumTotal.insertAdjacentHTML('beforeend', sum);

    }

}
// Класс элемента корзины
class BasketItem {
    // По сути, нам нужно отображать в корзине те же самые элементы, что и в списке
    constructor(title, price, img, link) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.link = link; // Вероятно, ссылка на страницу товара
    }
    render() {

    }
}
// Класс корзины
class Basket {
    constructor() {
        // В классе корзины массив с добавленными товарами
        this.addGoods = [];

    }
    // Добавление товара в корзину (привязываем на нажатие кнопки)
    addToBasket() { }

    // Удаление товара из корзины (привязываем на нажатие кнопки)
    deleteFromBasket() { }

    // Считаем стоимость и количество товаров в корзине
    calcBasket() { }

    // Метод, который определяет, добавлены ли в корзину какие-либо товары и при их наличии активирует кнопку "Оформить заказ"
    isOrder() { }

    // Рендер динамического содержимого корзины
    render() { }

    // Метод открывания корзины
    openBasket() { }
}

const goodsList = new GoodsList();
goodsList.fetchGoods();
goodsList.render();
goodsList.sum();
