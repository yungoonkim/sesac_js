const clientKey = "";
const customerKey = "customer-123";
const tossPayments = TossPayments(clientKey); //토스 결제 앱
const payment = tossPayments.tossPayments.payment({ customerKey }); //우리 사용자용 결제 초기화

let selectedProduct = null;
let selectedPaymentMethod = null;

function selectedProduct(event, name, price) {
  selectedProduct = { name, price };
}

function selectPaymentMethod() {}

function requestPayment() {}
