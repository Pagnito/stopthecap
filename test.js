const adminAccessToken = "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";
const adminApiHost = "arkeytypeclothing.myshopify.com";
const adminApiPath = "/admin/api/2022-01/graphql.json";
const https = require("https");
console.log('wtf')
let email = "pagnito@gmail.com";
let ordersQuery = `{
      orders(first: 10, query: "email:${email}") {
        edges {
          node {
            id
            email
            lineItems(first: 30) {
              edges {
                node {
                  name
                }
              }
            }
          } 
        }
      }
    }`;
function adminShopifyData(query, cb) {
  const host = adminApiHost;
  const path = adminApiPath;
  const data = JSON.stringify({ query });

  const options = {
    host: host,
    path: path,
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": adminAccessToken,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  };

  let req = https.request(options, function (res) {
    let response = "";
    res.on("data", function (chunk) {
      response += chunk;
    });
    res.on("end", function () {
      cb(null, response);
    });
    res.on("error", function (err) {
      console.log("err", err);
    });
  });
  req.on("error", function (err) {
    console.log("err", err);
  });
  req.write(data);
  req.end();
}

adminShopifyData(ordersQuery, (err, res) => {
  let data = JSON.parse(res);
  console.log("yrs", data.data.orders.edges);
});


// exports = async function (review) {
//   var collection = context.services.get("mongodb-atlas").db("stopthecap").collection("reviews");
//   const adminAccessToken = "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";
//   const adminApiHost = "arkeytypeclothing.myshopify.com";
//   const adminApiPath = "/admin/api/2022-01/graphql.json";
//   const https = require('https');

//   let {body, rating, author, email, title, product_id, created_at, product_handle} = review;
  
//   let ordersQuery = `{
//       orders(first: 10, query: "email:${email}") {
//         edges {
//           node {
//             id
//             email
//             lineItems(first: 30) {
//               edges {
//                 node {
//                   name
//                 }
//               }
//             }
//           } 
//         }
//       }
//     }`
//     function adminShopifyData(query, cb){
//       const host = adminApiHost;
//       const path = adminApiPath;
//       const data = JSON.stringify({ query })
      
//       const options = {
//         host: host,
//         path: path,
//         method: "POST",
//         headers: {
//           "X-Shopify-Access-Token": adminAccessToken,
//           "Accept": "application/json",
//           "Content-Type": "application/json",
//         }
//       };
    
//       let req = https.request(options, function(res) {
//         let response = '';
//         res.on('data', function (chunk) {
//           response += chunk;
//         });
//         res.on('end', function () {
//           cb(null, response);
//         })
//         res.on('error', function(err) {
//           console.log('err', err)
//         })
//       });
//       req.on('error', function(err) {
//         console.log('err', err)
//       })
//       req.write(data);
//       req.end();
//     }

//   adminShopifyData(ordersQuery, (err, res) => {
//   let data = JSON.parse(res);
//   console.log("yrs", data.data.orders.edges);
//   });
    
    
    
    

//   let yo = false;
//   if(yo) {
    
//   let exists = await collection.findOne({ email: email, product_handle: product_handle });
//   if (exists) {
//     let response = await collection.findOneAndUpdate({ email: email, product_id: product_id }, { $set: { body: body, rating: rating, title: title } }, {returnNewDocument: true});
//     if (response._id) {
//       return {
//         review: response,
//         status: 200
//       };
//     } else {
//       return {
//         status: 500,
//         message: "Could not update your review, try again.",
//       };
//     }
//   } else {
//     let response = await collection.insertOne(review);
//     if (response.insertedId) {
//       return {
//         status: 200,
//         review_id: response.insertedId
//       };
//     } else {
//       return {
//         status: 500,
//         message: "Could not save your review, try again.",
//       };
//     }
//   }
//   }

// };
