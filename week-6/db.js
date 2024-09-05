import mongoose from 'mongoose'; 

export const connectDB = () => {
    mongoose.connect("mongodb+srv://prikshitrai27:zif40do92uSVEUZ5@cluster0.hrqfkl3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        useNewUrlParser: true
    }).then(() => {
        console.log("connection done");
    }).catch((err) => {
        console.log("error", err);
    });
};
