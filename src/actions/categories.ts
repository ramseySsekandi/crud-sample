'use server'
import { CategoryForm } from "@/types";
import { db } from "../../prisma/db";

export const createCategories = async (data:CategoryForm) => {
    try {
      const newCategory = await db.category.create({data})
      return newCategory
    } catch (error) {
        console.log(error)
    }
} 
export const fetchCategories = async () => {
    try {
      const fetchCategories = await db.category.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      })
      // console.log(fetchCategories)
      return fetchCategories
    } catch (error) {
        console.log(error)
    }
} 