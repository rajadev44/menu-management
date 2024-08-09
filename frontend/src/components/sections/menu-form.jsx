import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CategoryDropDown from './category-dropdown';
import AdminLayout from './admin-layout';
import IngredientsDropDown from './ingredients-dropdown';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Loader from '@/components/ui/loader';
import { mutate } from 'swr';
import { Trash2 } from 'lucide-react';
import { editMenuItemSchema, menuItemSchema } from '@/utils/validationSchema';

const defaultValues = {
  name: '',
  description: '',
  price: null,
  category: '',
  imageUrl: null,
  ingredients: [{ name: '', quantity: null, unit: '', price: null }],
  sizes: [{ name: '', price: '' }],
  baseIngredients: [{ name: '' }],
};

export default function MenuItemForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isEditMode ? editMenuItemSchema : menuItemSchema),
    defaultValues,
  });

  const { fields: baseIngredientsFields, append: appendBaseIngredient, remove: removeBaseIngredient } = useFieldArray({
    control,
    name: 'baseIngredients',
  });

  const { fields: sizesFields, append: appendSize, remove: removeSize } = useFieldArray({
    control,
    name: 'sizes',
  });

  const { fields: ingredientsFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: 'ingredients',
  });

  useEffect(() => {
    if (isEditMode) {
      fetchMenuItemData(id).then((data) => {
        reset(data);
        setImagePreview(data.imageUrl);
      });
    } else {
      reset(defaultValues);
    }
  }, [isEditMode, id, reset]);

  const fetchMenuItemData = async (id) => {
    const response = await fetch(`/api/menu-items/${id}`);
    const data = await response.json();
    return data;
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);

    // Handle image file
    if (data.imageUrl instanceof File) {
      formData.append('image', data.imageUrl);
    }

    formData.append('ingredients', JSON.stringify(data.ingredients));
    formData.append('sizes', JSON.stringify(data.sizes));
    formData.append('baseIngredients', JSON.stringify(data.baseIngredients));

    const method = isEditMode ? 'PUT' : 'POST';
    const url = isEditMode
      ? `/api/menu-items/${id}`
      : '/api/menu-items';

    try {
      await fetch(url, {
        method,
        body: formData,
      });
      mutate('/api/menu-items');
      navigate('/dashboard/items');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue('imageUrl', file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-semibold">
          {isEditMode ? 'Edit Menu Item' : 'Create Menu Item'}
        </h1>
        <p className="mt-2">Fill in the details below to {isEditMode ? 'edit the' : 'create a new'} menu item.</p>
        <div className="grid gap-4 my-5">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              {...register('name')}
              className={`w-full ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <CategoryDropDown
                  all={false}
                  className={`w-full ${errors.category ? 'border-red-500' : ''}`}
                  onCategoryChange={field.onChange}
                  selectedCategory={field.value}
                  required={false}
                />
              )}
            />
            {errors.category && <span className="text-red-500">{errors.category.message}</span>}
          </div>

          <hr className="text-primary my-4" />

          <div>
            <Label className="font-medium">Base Ingredients</Label>
            <div className="grid gap-4">
              {baseIngredientsFields.map((item, index) => (
                <div key={item.id} className="grid grid-cols-1 gap-4">
                  <div className='flex gap-2'>
                    <Controller
                      name={`baseIngredients.${index}.name`}
                      control={control}
                      render={({ field }) => (
                        <IngredientsDropDown
                          all={false}
                          value={field.value}
                          onChange={field.onChange}
                          className={`w-full ${errors.baseIngredients?.[index]?.name ? 'border-red-500' : ''}`}
                        />
                      )}
                    />
                    <Button type="button" size='icon' variant='ghost' onClick={() => removeBaseIngredient(index)}>
                      <Trash2 className='text-destructive' />
                    </Button>
                  </div>
                  {errors.baseIngredients?.[index]?.name && (
                    <span className="text-red-500">{errors.baseIngredients[index].name.message}</span>
                  )}
                </div>
              ))}
              {(getValues().baseIngredients.length === 0 || (errors.baseIngredients && errors?.baseIngredients?.message)) && <span className="text-red-500">{errors?.baseIngredients?.message || 'Please attach at least one base ingredient'}</span>}
              <Button type="button" onClick={() => appendBaseIngredient({ name: '' })}>
                Add Base Ingredient
              </Button>
            </div>
          </div>

          <hr className="text-primary my-4" />

          <div>
            <Label className="font-medium">Size</Label>
            <div className="grid gap-4">
              {sizesFields.map((item, index) => (
                <div key={item.id} className='flex gap-2'>
                  <div className="grid grid-cols-2 gap-4 grow">
                    <div>
                      <Input
                        type="text"
                        placeholder="Enter size label"
                        {...register(`sizes.${index}.name`)}
                        className={`w-full ${errors.sizes?.[index]?.name ? 'border-red-500' : ''}`}
                      />
                      {errors.sizes?.[index]?.name && (
                        <span className="text-red-500">{errors.sizes[index].name.message}</span>
                      )}
                    </div>
                    <div>
                      <Input
                        type="number"
                        step='.01'
                        placeholder="Price"
                        {...register(`sizes.${index}.price`)}
                        className={`w-full ${errors.sizes?.[index]?.price ? 'border-red-500' : ''}`}
                      />
                      {errors.sizes?.[index]?.price && (
                        <span className="text-red-500">{errors.sizes[index].price.message}</span>
                      )}
                    </div>
                  </div>
                  <Button type="button" size='icon' variant='ghost' onClick={() => removeSize(index)}>
                    <Trash2 className='text-destructive' />
                  </Button>
                </div>
              ))}
              {/* {(getValues().sizes.length === 0 || (errors.sizes && errors?.sizes?.message)) && <span className="text-red-500">{errors?.sizes?.message || 'Please attach at least one size'}</span>} */}
              <Button type="button" onClick={() => appendSize({ name: '', price: '' })}>
                Add Size
              </Button>
            </div>
          </div>

          <hr className="text-primary my-4" />

          <div className="col-span-1">
            <Label className="font-medium">Addons Ingredients</Label>
            <div className="grid gap-4">
              {ingredientsFields.map((item, index) => (
                <div key={item.id} className='flex gap-2'>
                  <div className="grid grid-cols-4 gap-4 grow">
                    <div>
                      <Controller
                        name={`ingredients.${index}.name`}
                        control={control}
                        render={({ field }) => (
                          <IngredientsDropDown
                            all={false}
                            value={field.value}
                            onChange={field.onChange}
                            className={`w-full ${errors.ingredients?.[index]?.name ? 'border-red-500' : ''}`}
                          />
                        )}
                      />
                      {errors.ingredients?.[index]?.name && (
                        <span className="text-red-500">{errors.ingredients[index].name.message}</span>
                      )}
                    </div>

                    <div>
                      <Input
                        placeholder="Price"
                        type="number"
                        step='.01'
                        {...register(`ingredients.${index}.price`)}
                        className={`w-full ${errors.ingredients?.[index]?.price ? 'border-red-500' : ''}`}
                      />
                      {errors.ingredients?.[index]?.price && (
                        <span className="text-red-500">{errors.ingredients[index].price.message}</span>
                      )}
                    </div>

                    <div>
                      <Input
                        type="number"
                        step='.01'
                        placeholder="Quantity"
                        {...register(`ingredients.${index}.quantity`)}
                        className={`w-full ${errors.ingredients?.[index]?.quantity ? 'border-red-500' : ''}`}
                      />
                      {errors.ingredients?.[index]?.quantity && (
                        <span className="text-red-500">{errors.ingredients[index].quantity.message}</span>
                      )}
                    </div>

                    <div>
                      <Input
                        placeholder="Unit"
                        {...register(`ingredients.${index}.unit`)}
                        className={`w-full ${errors.ingredients?.[index]?.unit ? 'border-red-500' : ''}`}
                      />
                      {errors.ingredients?.[index]?.unit && (
                        <span className="text-red-500">{errors.ingredients[index].unit.message}</span>
                      )}
                    </div>
                  </div>
                  <Button type="button" size='icon' variant='ghost' onClick={() => removeIngredient(index)}>
                    <Trash2 className='text-destructive' />
                  </Button>
                </div>
              ))}
              {(getValues().ingredients.length === 0 || (errors.ingredients && errors?.ingredients?.message)) && <span className="text-red-500">{errors?.ingredients?.message || 'Please attach at least one ingredients'}</span>}
              <Button type="button" onClick={() => appendIngredient({ name: '', quantity: null, unit: '', price: null })}>
                Add Ingredient
              </Button>
            </div>
          </div>

          <hr className="text-primary my-4" />

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step='.01'
              {...register('price')}
              className={`w-full ${errors.price ? 'border-red-500' : ''}`}
            />
            {errors.price && <span className="text-red-500">{errors.price.message}</span>}
          </div>

          <div>
            <Label htmlFor="imageUrl">Image</Label>
            <Input
              id="imageUrl"
              type="file"
              accept="image/*"
              className={` ${errors.imageUrl ? 'border-red-500' : ''}`}
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt='menu item'
                className='aspect-square object-contain w-[100px] h-[100px] my-4'
              />
            )}
            {errors.imageUrl && <span className="text-red-500">{errors.imageUrl.message}</span>}
          </div>

          <div className="col-span-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              className={` ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <span className="text-red-500">{errors.description.message}</span>}
          </div>
        </div>
        <Button type="submit">
          {loading ? <Loader className='text-primary-foreground' /> : 'Save'}
        </Button>
      </form>
    </AdminLayout>
  );
}
