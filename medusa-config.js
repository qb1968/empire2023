// const dotenv = require("dotenv");

// let ENV_FILE_NAME = "";
// switch (process.env.NODE_ENV) {
//   case "production":
//     ENV_FILE_NAME = ".env.production";
//     break;
//   case "staging":
//     ENV_FILE_NAME = ".env.staging";
//     break;
//   case "test":
//     ENV_FILE_NAME = ".env.test";
//     break;
//   case "development":
//   default:
//     ENV_FILE_NAME = ".env";
//     break;
// }

// try {
//   dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
// } catch (e) {}

// // CORS when consuming Medusa from admin
// const ADMIN_CORS =
//   process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// // CORS to avoid issues when consuming Medusa from a client
// const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

// const DATABASE_TYPE = process.env.DATABASE_TYPE || DATABASE_TYPE;
// const PGPASSWORD = process.env.PGPASSWORD || PGPASSWORD
// const DATABASE_URL = process.env.DATABASE_URL || DATABASE_URL
// const REDIS_URL = process.env.REDIS_URL || REDIS_URL

// const plugins = [
//   `medusa-fulfillment-manual`,
//   `medusa-payment-manual`,
//   // To enable the admin plugin, uncomment the following lines and run `yarn add @medusajs/admin`
//   {
//     resolve: "@medusajs/admin",
//     /** @type {import('@medusajs/admin').PluginOptions} */
//     options: {
//       autoRebuild: true,
//     },
//   },
//   {
//     resolve: `medusa-file-spaces`,
//     options: {
//       spaces_url: process.env.SPACE_URL,
//       bucket: process.env.SPACE_BUCKET,
//       endpoint: process.env.SPACE_ENDPOINT,
//       access_key_id: process.env.SPACE_ACCESS_KEY_ID,
//       secret_access_key: process.env.SPACE_SECRET_ACCESS_KEY,
//     },
//   },
//   {
//     resolve: `medusa-plugin-meilisearch`,
//     options: {
//       config: {
//         host: process.env.MEILISEARCH_HOST,
//         apiKey: process.env.MEILISEARCH_API_KEY,
//       },
//       settings: {
//         products: {
//           indexSettings: {
//             searchableAttributes: ["title", "description", "variant_sku"],
//             displayedAttributes: [
//               "title",
//               "description",
//               "variant_sku",
//               "thumbnail",
//               "handle",
//             ],
//           },
//           primaryKey: "id",
//           transform: (product) => ({
//             id: product.id,
//             // other attributes...
//           }),
//         },
//       },
//     },
//   },
// ];

// const modules = {
//   eventBus: {
//     resolve: "@medusajs/event-bus-redis",
//     options: {
//       redisUrl: REDIS_URL
//     }
//   },
//   cacheService: {
//     resolve: "@medusajs/cache-redis",
//     options: {
//       redisUrl: REDIS_URL
//     }
//   },
// }

// /** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
// const projectConfig = {
//   jwtSecret: process.env.JWT_SECRET,
//   cookieSecret: process.env.COOKIE_SECRET,
//   database_database: "./medusa-db.sql",
//   database_type: DATABASE_TYPE,
//   store_cors: STORE_CORS,
//   admin_cors: ADMIN_CORS,
//   // Uncomment the following lines to enable REDIS
//   redis_url: REDIS_URL
// }

// if (DATABASE_URL && DATABASE_TYPE === "postgres") {
//   projectConfig.database_url = DATABASE_URL;
//   delete projectConfig["database_database"];
// }


// /** @type {import('@medusajs/medusa').ConfigModule} */
// module.exports = {
//   projectConfig,
//   plugins,
//   modules,
//   database_extra:
//     process.env.NODE_ENV !== "development"
//       ? { ssl: { rejectUnauthorized: false } }
//       : {},
// };


// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

// Database URL (here we use a local database called medusa-development)
const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-store";

// Medusa uses Redis, so this needs configuration as well
const REDIS_URL = process.env.REDIS_URL_TLS || process.env.REDIS_URL || "redis://localhost:6379";

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

// This is the place to include plugins. See API documentation for a thorough guide on plugins.
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  // Uncomment to add Stripe support.
  // You can create a Stripe account via: https://stripe.com
  // {
  //   resolve: `medusa-payment-stripe`,
  //   options: {
  //     api_key: STRIPE_API_KEY,
  //     webhook_secret: STRIPE_WEBHOOK_SECRET,
  //   },
  // },
   {
    resolve: `medusa-file-spaces`,
    options: {
      spaces_url: process.env.SPACE_URL,
      bucket: process.env.SPACE_BUCKET,
      endpoint: process.env.SPACE_ENDPOINT,
      access_key_id: process.env.SPACE_ACCESS_KEY_ID,
      secret_access_key: process.env.SPACE_SECRET_ACCESS_KEY,
    },
  },
];

module.exports = {
  projectConfig: {
    redis_url: REDIS_URL,
    // For more production-like environment install PostgresQL
    database_url: DATABASE_URL,
    database_type: "postgres",
    // database_database: "./medusa-db.sql",
    // database_type: "sqlite",
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
    database_extra:
      process.env.NODE_ENV !== "development"
        ? { ssl: { rejectUnauthorized: false } }
        : {},
  },
  plugins,
};
