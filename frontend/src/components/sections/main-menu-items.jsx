import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { XIcon } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";
import { ItemIngredientsDropDown } from "./ingredients-dropdown";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import Loader from "../ui/loader";
import { useCart } from "../../context/CartContext";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MainMenuItem() {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(`/api/menu-items/${id}`, fetcher);
  const [dish, setDish] = useState(null);
  const [customIngredients, setCustomIngredients] = useState([]);
  const [customQuantity, setCustomQuantity] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    if (data) {
      setDish({
        ...data,
        selectedSize: data.sizes?.[0] || {},
        customIngredients: [],
      });
    }
  }, [data]);

  const handleRemoveIngredient = (ingredientId) => {
    setDish((prevDish) => ({
      ...prevDish,
      baseIngredients: prevDish.baseIngredients.filter((ingredient) => ingredient.id !== ingredientId),
    }));
  };

  const handleAddCustomIngredient = () => {
    if (!selectedIngredient || !customQuantity) return;
  
    const ingredient = dish.ingredients.find((ing) => ing.name === selectedIngredient);
    if (!ingredient) return;
  
    setCustomIngredients((prevCustomIngredients) => {
      const existingIngredientIndex = prevCustomIngredients.findIndex(
        (ing) => ing.name === selectedIngredient
      );
  
      if (existingIngredientIndex >= 0) {
        // Update the existing ingredient
        const updatedIngredients = prevCustomIngredients.map((ing, index) => {
          if (index === existingIngredientIndex) {
            return {
              ...ing,
              quantity: ing.quantity + customQuantity,
              price: (ing.quantity + customQuantity) * ing.price,
            };
          }
          return ing;
        });
        return updatedIngredients;
      } else {
        // Add new ingredient
        return [
          ...prevCustomIngredients,
          {
            ...ingredient,
            quantity: customQuantity,
            price: ingredient.price * customQuantity,
          },
        ];
      }
    });
  
    setCustomQuantity(Number.NaN);
    setSelectedIngredient('');
  };
  

  const handleRemoveCustomIngredient = (ingredientIndex) => {
    setCustomIngredients((prevCustomIngredients) =>
      prevCustomIngredients.filter((_, i) => i !== ingredientIndex)
    );
  };

  const handleSelectSize = (sizeId) => {
    const selectedSize = dish.sizes.find((size) => size.id === sizeId);

    setDish((prevDish) => ({
      ...prevDish,
      selectedSize,
    }));
  };

  const calculateTotalPrice = () => {
    let totalPrice = dish.selectedSize.price || 0;
    totalPrice += dish.price || 0;
    customIngredients.forEach((ingredient) => {
      totalPrice += ingredient.price;
    });
    return totalPrice;
  };

  const navigate = useNavigate();
  const handleAddToCart = () => {
    navigate('/cart');
    addToCart({ ...dish, customIngredients });
  };

  if (isLoading) return <Loader className="text-primary" />;
  if (error) return <div>Error loading menu item</div>;
  if (!dish) return null;

  return (
    <div className="mx-auto py-6 container px-6 sm:px-12 lg:px-24" >
      <div className="grid md:grid-cols-2 gap-5">
        <div className="flex justify-center">
          <img src={dish.imageUrl} alt={dish.name} className="w-full h-auto rounded-lg object-contain md:object-cover max-h-[400px] aspect-square " />
        </div>

        <div className="grid gap-8 border border-border rounded-md p-5">
          <div>
            <h1 className="text-4xl font-bold text-foreground">{dish.name}</h1>
            <p className="text-lg text-muted-foreground/60 mt-4">{dish.description}</p>
          </div>
          {dish.baseIngredients.length > 0 &&
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Ingredients</h2>
            <ul className="mt-4">
              {dish.baseIngredients.map((ingredient) => (
                <li key={ingredient.id} className="flex items-center justify-between py-2 border-b">
                  <div className="text-muted-foreground/80">{ingredient.name}</div>
                  <Button size="icon" variant="outline" onClick={() => handleRemoveIngredient(ingredient.id)}>
                    <XIcon className="h-5 w-5" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          }
          <div>
            {dish.ingredients.length > 0 && <><h2 className="text-2xl font-semibold text-foreground">Add Ingredient</h2>
            <div className="grid gap-4 mt-4">
              <div className="grid sm:grid-cols-[1fr_auto] gap-4">
                <ItemIngredientsDropDown
                  all={false}
                  id={dish.id}
                  ingredients={dish.ingredients}
                  value={selectedIngredient}
                  onChange={setSelectedIngredient}
                  className="w-full"
                />
                <Input
                  type="number"
                  placeholder="Quantity"
                  className="w-full"
                  value={customQuantity}
                  onChange={(e) => setCustomQuantity(Number(e.target.value) || null)}
                />
              </div>
              <Button size="sm" variant="outline" onClick={handleAddCustomIngredient}>
                Add Ingredient
              </Button>
            </div></>}
            {customIngredients.length > 0 && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-foreground">Addons</h3>
                <ul className="mt-4">
                  {customIngredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center justify-between py-2 border-b">
                      <div className="text-muted-foreground/80">{ingredient.name} ({ingredient.quantity || ''})</div>
                      <div className="text-muted-foreground/80">{formatCurrency(ingredient.price)}</div>
                      <Button size="icon" variant="outline" onClick={() => handleRemoveCustomIngredient(index)}>
                        <XIcon className="h-5 w-5" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {dish.sizes.length > 0 && <div>
            <h2 className="text-2xl font-semibold text-foreground">Size</h2>
            <div className="mt-4">
              <RadioGroup value={dish.selectedSize.id} onValueChange={handleSelectSize} className="grid gap-4">
                {dish.sizes.map((size) => (
                  <Label
                    key={size.id}
                    htmlFor={`size-${size.id}`}
                    className="flex items-center gap-4 border rounded-md p-4 cursor-pointer "
                  >
                    <RadioGroupItem id={`size-${size.id}`} value={size.id} />
                    <div>
                      {size.name} - {formatCurrency(size.price + dish.price)}
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </div>}
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Total Price</h2>
            <div className="text-3xl font-bold text-foreground mt-4">{formatCurrency(calculateTotalPrice())}</div>
          </div>
          <Button size="lg" className="mt-6" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
