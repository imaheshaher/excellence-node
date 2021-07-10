require("dotenv").config();

module.exports.env = {
    port:process.env.PORT,
    mongoUrl:process.env.MONGO_URL,
    secrete:process.env.SECRETE,
    token_expire:process.env.TOKEN_EXPIRE

}