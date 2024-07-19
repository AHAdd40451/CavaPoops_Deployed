import error from "../middlewares/error.js";
import authRoutes from "./auth.routes.js";
import breedRoutes from "./breed.routes.js";
import categoryRoutes from "./category.routes.js";
import generalRoutes from "./general.routes.js";
import productRoutes from "./product.routes.js";
import puppyRoutes from "./puppy.routes.js";

const routes = (app) => {
  //User
  app.use("/api", authRoutes);

  //Products
  app.use("/api", productRoutes);

  //Category
  app.use("/api", categoryRoutes);

  //General
  app.use("/api", generalRoutes);

  //Breed
  app.use("/api", breedRoutes);

  //Puppy
  app.use("/api", puppyRoutes);

  // Error
  app.use(error);
};

export default routes;
