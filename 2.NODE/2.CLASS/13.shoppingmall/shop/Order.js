const { Electronics } = require("./Product");

class Order{
    constructor(user){
        this.user = user;
        this.products = [];
        this.totalAmount = 0;
    }

    addProduct(product, quantity){
        //상품명과 수량을 받아서 저장
        if(product.checkAvailability(quantity)){
            this.products.push({product, quantity});
            this.totalAmount += product.price * quantity;
        }
        else{
            console.log(`상품에 재고가 부족합니다. ${product.name}을 주문하실 수 없습니다.`);
        }

    }

    getOrderSummaryOLDJS(){
        const items = [];
        for(let i = 0; i < this.products.length; i++){
            const {product, quantity} = this.products[i];

            items.push({
                name: product.name,
                quantity: quantity,
                price: product.price
            })
        }
    }

    getOrderSummary(){
        //고차함수를 써서 반환하는.. 가장 Modern JS 스타일..

        return {
            //내가 원하는걸 key, value로 반환할것임
            user: this.user.name,
            totalAmount: this.totalAmount,
            items: this.products.map(({product, quantity}) => ({
                name: product.name,
                quantity: quantity,
                price: product.price
            }))
        }
    }
}

module.exports = Order;