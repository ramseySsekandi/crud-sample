'use server'
import { ProductForm } from "@/types";
import { db } from "../../prisma/db";

export const createProduct = async (data:ProductForm) => {
    // console.log(data)
    try {
        console.log(data)
        const newProduct = await db.product.create({data})
        return newProduct
    } catch (error) {
        console.log(error)
    }
}

export const fetchProducts = async () => {
    try {
      const fetchProducts = await db.product.findMany({
        orderBy: {
            createdAt: 'desc',
          },
      })
      // console.log(fetchCategories)
      return fetchProducts
    } catch (error) {
        console.log(error)
    }
} 