import algoliasearch from "algoliasearch";
const apikey = process.env.ALGOLIA_APPLICATION_ID
const adminkey =  process.env.ALGOLIA_ADMIN_API_KEY 
const client = algoliasearch(
  // "K4YWALFPTU",
  // "a3ad4f844add0e5ac1e02ff73e9da09e"
  apikey as string,
  adminkey as string
  );

export default client;