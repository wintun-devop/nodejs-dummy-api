import app from "./config/server";

const port = process.env.PORT;

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error:any) {
    console.error(`Error occured: ${error.message}`);
}