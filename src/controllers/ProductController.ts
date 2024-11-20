import { NextFunction, Request, Response } from "express";
import { IProductInteractor } from "../interfaces/IProductInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils";

@injectable()
export class ProductController {
  private interactor: IProductInteractor;

  constructor(
    @inject(INTERFACE_TYPE.ProductInteractor) interactor: IProductInteractor
  ) {
    this.interactor = interactor;
  }

  async onCreateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      // validate logic

      const data = await this.interactor.createProduct(body);
      //   await NotifyToPromotionService(product.rows[0]);

      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  async onUpdateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const stock = req.body.stock;

      const data = await this.interactor.updateStock(id, stock);

      // await SendSendGridEmail(product.rows[0]);

      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  async onGetProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(`${req.query.limit}`) || 10;
      const offset = parseInt(`${req.query.offset}`) || 0;
      const data = await this.interactor.getProduct(limit, offset);

      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}
