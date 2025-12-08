const Common = require('./Common');


class Item extends Common {
    product_type = null;
    type = ['커피', '과일', '케이크'];
    coffee = [{ name: "에스프레소", price: 4000 }, { name: "아메리카노", price: 5000 }, { name: "카페라테", price: 5500 }, { name: "카푸치노", price: 5700 }, { name: "콜드브루", price: 5900 }, { name: "블렌드 커피", price: 5800 }];
    fruits = [{ name: "사과", price: 3000 }, { name: "바나나", price: 2500 }, { name: "포도", price: 4500 }, { name: "딸기", price: 7000 }, { name: "오렌지", price: 6600 }, { name: "복숭아", price: 10000 }];
    cake = [{ name: "치즈케이크", price: 2500 }, { name: "초코케이크", price: 3000 }, { name: "생크림케이크", price: 3300 }, { name: "딸기케이크", price: 3500 }, { name: "레드벨벳케이크", price: 5000 }, { name: "모카케이크", price: 5500 }];

    generateProuctName() {
        const type = this.generateType();
        let index = null;

        if (type == '커피') {
            index = Math.floor(Math.random() * this.coffee.length);
            return this.coffee[index];
        }
        else if (type == '과일') {
            index = Math.floor(Math.random() * this.fruits.length);
            return this.fruits[index];
        }
        else if (type == '케이크') {
            index = Math.floor(Math.random() * this.cake.length);
            return this.cake[index];
        }
        else {

            return 0;
        }
    }

    generateType() {
        let index = Math.floor(Math.random() * this.type.length);
        this.setType(this.type[index]);
        return this.type[index];
    }

    setType(type) {
        this.product_type = type;
    }

    getType() { return this.product_type; }
}

module.exports = Item;