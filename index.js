import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/";

app.use('/asset', express.static('asset'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(API_URL + `Any?type=twopart`);
        const response = result.data;
        res.render("index.ejs", {setup: response.setup, delivery: response.delivery});
    } catch (error) {
        res.render("index.ejs", { error: JSON.stringify(error.response.data) });
    }
});

app.post("/filter", async(req,res) => {
    const filterSelection = req.body;
    try{
        console.log(filterSelection);
        if(filterSelection.length > 0){
            const blacklistFlags = filterSelection.join(","); 
            const result = await axios.get(`${API_URL}Any?type=twopart&blacklistFlags=${blacklistFlags}`);
            const response = result.data;
            res.render("index.ejs", {setup: response.setup, delivery: response.delivery});
        }
        else{
            res.redirect("/");
        }
        
       
    } catch (error){
        res.render("index.ejs", { error: JSON.stringify(error.response.data) });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});