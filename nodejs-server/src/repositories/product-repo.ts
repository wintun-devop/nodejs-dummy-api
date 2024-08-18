import { prisma } from "../utils/prismaSingletone";
import type {Product} from '@prisma/client';

export namespace ProductRepo{
    // create
    export const create = async (product:Product) =>{
      return await prisma.product.create({
      data: {
          ...product,
      },
      });
    }
    // update
    export const update= async (id: string, product: Product)=> {
    // console.log(id, product);
    return await prisma.product.update({
        where: {
        id,
        },
        data: {
        ...product,
        },
      });
    };
    // delete
    export const remove = async (id: string) =>{
    return await prisma.product.delete({
    where: {
        id: id,
      },
     });
    };
    // get a single row by unique id
    export const selectById = async (id: string) =>{
      return await prisma.product.findFirst({
        where: {
          id: id,
        },
      });
    };
    // get a single row by email
    export const selectByModel = async (model: string) =>{
      return await prisma.product.findFirst({
        where: {
            model: model,
        },
      });
    };
    // find all
    export const findMany =async () => {
      return await prisma.product.findMany({
      });
    };
    // delete many and insert many with transaction
    export const deleteInsertProduct = async (data:any[]) => {
      return prisma.$transaction([
        prisma.product.deleteMany({}),
        prisma.product.createMany({data}),
      ])
    };

    // upsert with transaction
    export const  upsertProduct = async (data: any[]) => {
      return prisma.$transaction(async (prismaTransaction) => {
        const promises = data.map((item) =>
          prismaTransaction.product.upsert({
            where: { model: item.model },
            update: item,
            create: item
          }));
        return Promise.all(promises);
      },
      { timeout: 150000 }
    )};
  }
