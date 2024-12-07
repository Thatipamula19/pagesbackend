import { Express, Request, Response } from "express";
import { title } from "process";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options:swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title : "API Documentation",
            version : "1.0.0"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security :[
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["./src/controllers/Website/*.ts", "./src/models/Website/*.ts", "./src/routes/Website/*.ts"],
}

const swaggerSpec = swaggerJSDoc(options);
const swaggerDocs = (app: Express, port: number) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("/api-docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    })

    console.log(`Docs available at http://localhost:${port}/api-docs`);
}

export default swaggerDocs