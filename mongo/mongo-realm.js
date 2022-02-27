import * as Realm from 'realm-web';

const app = new Realm.App({ id: "stopthecap-jxtox" });
const credentials = Realm.Credentials.anonymous();
let user;
try {
  user = await app.logIn(credentials);
} catch(err) {
  console.error("Failed to log into Mongo Realm", err);
}

export default user;
'7vU2p0n8wX1YO79F'