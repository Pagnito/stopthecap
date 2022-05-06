module.exports = {
  app: {
    contact: {
      number: "774-360-2363",
      email: "info@stopthecap.com",
    },
    shopify: {
      storeFrontAccessToken: "0eec386946e1b882ce774f651fbb4b2e",
      storeFrontApiUrl: "https://arkeytypeclothing.myshopify.com/api/2021-10/graphql.json",
      adminAccessToken: "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",
      adminApiUrl: "https://arkeytypeclothing.myshopify.com/admin/api/2022-01/graphql.json",

    },
    data: {
      carousel: {
        slides: [
          {
            img_url: "",
            text_one: "CAP FREE PRODUCTS",
            text_two: "Stopping The Caps",
            text_three: "One Cap At A Time",
            text_four: "FREE SHIPPING ON ALL ORDERS",
            button: "Shop Now",
            type: "one",
          },
          {
            img_url: "",
            text_one: "3 MONTHS SUBSCRIBED?",
            text_two: "GET UP TO 30% OFF",
            text_three: "ON NEW PRODUCTS",
            text_four: "FREE SHIPPING ON ALL ORDERS",
            button: "Shop Now",
            type: "two",
          },
        ],
      },
      incentives: {
        active_incentives: [
          {
            img_url: "",
            text_one: "CUSTOMER SERVICE ",
            text_two: "You can call and speak to a real person, or use chat!",
            button: "LEARN MORE",
          },
          {
            img_url: "",
            text_one: "FREE SHIPPING",
            text_two: "Almost all of the products get delivered within 7 days",
            button: "LEARN MORE",
          },
          {
            img_url: "",
            text_one: "QUALITY PRODUCTS",
            text_two: "If we wouldn't use it, we wouldn't sell it",
            button: "LEARN MORE",
          },
        ],
      },
      pdp_collapsibles: {
        description: true,
        shipping: false,
        reviews: false,
      },
      featured_collection: {
        collection: 'ADIDAS',
        number_of_rows: 2,
        number_of_columns: 4,
      },
      featured_product: {
        id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc1NzQ2OTk1MDc5NjM=",
        handle: "stop-the-cap-hoodie",
        text_one: "Awesome Time",
        text_two: "Whenever",
        text_three: "Grab It Out Of Your Pocket!",
        feature_one: "Awesome Battery Life",
        feature_two: "Compact",
        featuure_three: "Bluetooth Connectivity",
      },
      video: {
        url: "",
        text_one: "",
        text_two: "",
        text_three: "",
      },
      footer: {
        socials: true,
        sections: [
          {
            type: "contact_info",
            enabled: true,
          },
          {
            type: "main_menu",
            enabled: true,
          },
          {
            type: "policies",
            enabled: true,
          },
          {
            type: "logo",
            enabled: true,
          },
        ],
      },
    },
    colors: {
      "orange": "bg-orange-500",
      "red": "bg-red-500",
      "black": "bg-black",
      "white": "bg-white",
      "pink": "bg-pink-500",
      "yellow": "bg-yellow-500",
      "green": "bg-green-500",
      "grey": "bg-gray-500",
      "gray": "bg-gray-500",
      "blue": "bg-blue-300",
      "lightblue": "bg-blue-500"
    },
  },
};
