// utils/mpesaCache.js
const mpesaResponseCache = new Map();

function storeMpesaResponse(projectId, callbackData) {
  const stkCallback = callbackData?.Body?.stkCallback;
  if (!stkCallback) return null;

  const resultCode = stkCallback?.ResultCode ?? -1;
  const resultDesc = stkCallback?.ResultDesc ?? "Missing ResultDesc";

  let metadata = {
    amount: null,
    mpesaReceiptNumber: null,
    balance: null,
    transactionDate: null,
    phoneNumber: null,
  };

  stkCallback?.CallbackMetadata?.Item?.forEach(item => {
    switch (item.Name) {
      case 'Amount':
        metadata.amount = item.Value;
        break;
      case 'MpesaReceiptNumber':
        metadata.mpesaReceiptNumber = item.Value;
        break;
      case 'Balance':
        metadata.balance = item.Value;
        break;
      case 'TransactionDate':
        metadata.transactionDate = item.Value;
        break;
      case 'PhoneNumber':
        metadata.phoneNumber = item.Value;
        break;
    }
  });

  const parsed = {
    status: resultCode === 0 ? "SUCCESS" : "FAILED",
    resultCode,
    resultDesc,
    merchantRequestID: stkCallback?.MerchantRequestID,
    checkoutRequestID: stkCallback?.CheckoutRequestID,
    ...metadata,
  };

  mpesaResponseCache.set(projectId, parsed);
  setTimeout(() => mpesaResponseCache.delete(projectId), 10 * 60 * 1000); // 10 mins auto-expire

  return parsed;
}

function getMpesaResponse(projectId) {
  return mpesaResponseCache.get(projectId);
}

module.exports = { mpesaResponseCache, storeMpesaResponse, getMpesaResponse };
