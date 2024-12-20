'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, } from 'react'
import { CategoryForm } from "@/types"
import { useForm } from "react-hook-form";
import { createCategories } from "@/actions/categories"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"


export function AddCategoryForm() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryForm>();
  const router = useRouter()

  const onSubmit = async (data:CategoryForm) => {
   try {
     // send this data to the Server Action
     setLoading(true)
     await createCategories(data)
     // Reset form
     reset()
     toast.success('Added to Categories!')
     router.push('/categories')
   } catch (error) {
    console.log(error)
    toast.error('Something went wrong!')
   } finally{
    setLoading(false)
   }
  }

  return (
    <>
  
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add New Category</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="categoryName">Category Name</Label>
              <Input 
                id="categoryName"
                {...register('name', {required:true})}
                placeholder="Enter category name"
                // required
              />
              {errors.name && <span className="text-lg text-red-700">This field is required !</span>}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">{loading === true ? 'Adding Category':'Add Category'}</Button>
        </CardFooter>
      </form>
    </Card>
    </>
  )
}

