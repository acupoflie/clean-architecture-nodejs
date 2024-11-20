import express from "express";
import { Container } from "inversify";
import { IProductRepository } from "../interfaces/IProductRepository";
import { INTERFACE_TYPE } from "../utils";
import { ProductRepository } from "../repositories/productRepository";
import { IProductInteractor } from "../interfaces/IProductInteractor";
import { IMailer } from "../interfaces/IMailer";
import { Mailer } from "../external-libraries/mailer";
import { IMessageBroker } from "../interfaces/IMessageBroker";
import { MessageBroker } from "../external-libraries/messageBroker";
import { ProductInteractor } from "../interactors/ProductInteractor";
import { ProductController } from "../controllers/ProductController";
// const repository = new ProductRepository();
// const mailer = new Mailer();
// const broker = new MessageBroker();
// const interactor = new ProductInteractor(repository, mailer, broker);
// const controller = new ProductController(interactor);

const container = new Container();

container
  .bind<IProductRepository>(INTERFACE_TYPE.ProductRepository)
  .to(ProductRepository);
container
  .bind<IProductInteractor>(INTERFACE_TYPE.ProductInteractor)
  .to(ProductInteractor);
container.bind<IMailer>(INTERFACE_TYPE.Mailer).to(Mailer);
container.bind<IMessageBroker>(INTERFACE_TYPE.MessageBroker).to(MessageBroker);

container.bind(INTERFACE_TYPE.ProductController).to(ProductController);

const router = express.Router();

const controller = container.get<ProductController>(
  INTERFACE_TYPE.ProductController
);

router.post("/products", controller.onCreateProduct.bind(controller));

router.get("/products", controller.onGetProduct.bind(controller));

router.patch("/products/:id", controller.onUpdateProduct.bind(controller));

export default router;
