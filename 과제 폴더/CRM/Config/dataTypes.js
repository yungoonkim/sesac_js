
module.exports = {
    user: {
        class: "User",
        listName: "userIdList",
        generator: (instance, uuid, lists) => ({
            id: uuid,
            name: instance.genFirstName() + instance.genLastName(),
            age: instance.genAge(),
            gender: instance.genGender(),
            birthdate: instance.genBirthdate(),
        })
    },

    store: {
        class: "Store",
        listName: "storeIdList",
        generator: (instance, uuid) => ({
            id: uuid,
            branch: instance.genBrandName() + " " + instance.genBranch(),
            brand: instance.genBrandName(),
            address: instance.genAddress(),
        })
    },

    item: {
        class: "Item",
        listName: "itemIdList",
        generator: (instance, uuid) => {
            const p = instance.generateProuctName();
            return {
                id: uuid,
                name: p.name,
                type: instance.getType(),
                price: p.price,
            }
        }
    },

    order: {
        class: "Order",
        listName: "orderIdList",
        generator: (instance, uuid, lists) => ({
            id: uuid,
            orderAt: instance.getOrderAt(),
            userId: lists.userIdList.random().id,
            storeId: lists.storeIdList.random().id,
        })
    },

    orderitem: {
        class: "Orderitem",
        listName: "orderItemIdList",
        generator: (instance, uuid, lists) => ({
            id: uuid,
            orderId: lists.orderIdList.random().id,
            itemId: lists.itemIdList.random().id,
        })
    }
};
