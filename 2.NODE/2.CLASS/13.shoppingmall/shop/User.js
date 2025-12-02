class User{
    constructor(name, email, address){
        this.name = name;
        this.email = email;
        this.address = address;
        this.orderHistory = [];
    }

    addOrder(order){
        this.orderHistory.push(order);
    }
    //나중에 주문내역을 가져오는 함수도 필요..

    getOrderHistory(){
       return this.orderHistory.map(order => order.getOrderSummary());
    }
}

module.exports = User;