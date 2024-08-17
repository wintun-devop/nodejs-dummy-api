import { prisma } from "../utils/prismaSingletone";


export namespace ProductRepo{
    // create
    export const create = async (product:any) =>{
      return await prisma.product.create({
      data: {
          ...product,
      },
      });
    }
    // update
    export const update= async (id: string, product: any)=> {
    // console.log(id, product);
    return await prisma.product.update({
        where: {
        id,
        },
        data: {
        ...product,
        },
    });
    }
    // delete
    export const remove = async (id: string) =>{
    return await prisma.product.delete({
    where: {
        id: id,
    },
    });
    }
    // get a single row by unique id
    export const selectById = async (id: string) =>{
      return await prisma.product.findFirst({
        where: {
          id: id,
        },
      });
    }
    // get a single row by email
    export const selectByModel = async (model: string) =>{
      return await prisma.product.findFirst({
        where: {
            model: model,
        },
      });
    }
    // find all
    export const findMany =async () => {
      return await prisma.product.findMany({
      });
    }
  }