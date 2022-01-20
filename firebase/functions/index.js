/* eslint-disable max-len */
const functions = require("firebase-functions");
const firebase = require("firebase-admin");

const axios = require("axios");
const cors = require("cors");

firebase.initializeApp();

exports.notificationHandler = functions.region("europe-west1").https.onRequest((request, response) => {

});

exports.switchAPI = functions.region("europe-west1").https.onRequest((request, response) => {
  cors()(request, response, () => {
    const accountId = "0fkm3FLosPqPYOkpwxfCp9QiApIET43jYwPyARpdSD9sSiHmY2mQboc9ugPkGHF";
    const privateKey = "EH7sSjR2u8SxdHkw3DkqQBDB5KYkNBMgrWclhJnUffpcGA2LS7pju5ULkYZKDoU";

    const merchantId = request.body.merchantTransactionId;
    const split = merchantId.split(";");

    const productId = split[0];
    const quantity = Number.parseInt(split[1]);

    return firebase.firestore().collectionGroup("shop-products").where("id", "==", productId).get()
        .then((data) => {
          if (data.size == 0) {
            return response.status(404).json({
              error: "product not found",
            });
          }

          const price = quantity * data.docs[0].data().price;

          return axios.post("https://api-test.switchpayments.com/v2/charges", {
            "charge_type": request.body.chargeType,
            "amount": price,
            "currency": "EUR",
            "events_url": "https://europe-west1-yummy-b5e1a.cloudfunctions.net/notificationHandler",
          }, {
            headers: {
              "Authorization": "Basic " + Buffer.from(accountId + ":" + privateKey).toString("base64"),
            },
          });
        }).then((res) => {
          return response.status(200).json(res.data);
        }).catch((error) => {
          return response.status(400).json(error);
        });
  });
});
