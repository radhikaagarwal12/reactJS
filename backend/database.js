const mongoose = require('mongoose');
const connection = "mongodb+srv://radhika_12:radhika@1210@cluster0.o22tt.mongodb.net/dailyMailer?retryWrites=true&w=majority";
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));

