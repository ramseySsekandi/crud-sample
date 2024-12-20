'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm, SubmitHandler } from "react-hook-form";
import { ProductForm } from '@/types'
import { createProduct } from '@/actions/products'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export function AddProductForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductForm>();
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const onSubmit = async (data: ProductForm) => {
    //sending this data to the backend
   try {
    setLoading(true)
    data.price = +data.price
    data.stock = +data.stock
    await createProduct(data)
    // Reset form
      reset()
      toast.success('Added to Categories!')
      router.push('/categories')
   } catch (error) {
    console.log(error)
    toast.error('Something went wrong')
   } finally{
    setLoading(false)
   }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="productName">Product Name</Label>
              <Input 
                id="productName"
                type='text'
                {
                  ...register("name", {
                    required:true,
                  })
                }
                placeholder="Enter product name"
                // required
              />
              {errors.name && <span className="text-lg text-red-700">This field is required !</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="productPrice">Price</Label>
              <Input 
                id="productPrice"
                type="number"
                {
                  ...register("price", {
                    required:true,
                  })
                }
                placeholder="Enter price"
                min="100"
                // required
              />
              {errors.price && <span className="text-lg text-red-700">This field is required !</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="productStock">Stock</Label>
              <Input 
                id="productStock"
                type="number"
                {
                  ...register("stock", {
                    required:true,

                  })
                }
                placeholder="Enter stock quantity"
                min="0"
                max="10"
                // required
              />
              {errors.stock && <span className="text-lg text-red-700">This field is required !</span>}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">{loading === true ? 'Adding Product':'Add Product'}</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

