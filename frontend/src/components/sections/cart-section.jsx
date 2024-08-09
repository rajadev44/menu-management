import { useCart } from "../../context/CartContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";
import { Trash2 } from "lucide-react";
import { Textarea } from "../ui/textarea";

export default function   Cart() {
  const { cart, removeFromCart } = useCart();
  console.log(cart);

  const calculateTotalPrice = (item) => {
    let totalPrice = item.selectedSize.price || 0;
    totalPrice += item.price || 0;
    item.customIngredients.forEach((ingredient) => {
      totalPrice += ingredient.price;
    });
    return totalPrice;
  };

  const calculateItemPrice = (item) => {
    return calculateTotalPrice(item)
    // const selectedSizePrice = item.selectedSize.price;
    // const customIngredientsPrice = item.customIngredients.reduce((total, ing) => total + ing.price, 0);
    // return selectedSizePrice + customIngredientsPrice;
  };




  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + calculateTotalPrice(item);
    }, 0);
  };

  return (
    <div className="py-8 container px-6 sm:px-12 lg:px-24">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center text-muted-foreground">Your cart is empty.</div>
      ) : (
        <div className="grid gap-6">
          {cart.map((item, index) => (
            <Card key={index} className="shadow-lg rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row gap-4 p-4">
                <img
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.name}
                  className="rounded-lg object-cover w-full md:w-24 md:h-24"
                />
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2 text-sm">
                      {item.selectedSize.name && <div>
                        <span className="font-medium">Size:</span> {item.selectedSize.name}
                      </div>}
                      <div>
                        <span className="font-medium">Ingredients:</span> {item.baseIngredients.map((ing) => ing.name).join(", ")}
                      </div>
                      { item.customIngredients.length > 0  && <div>
                        <span className="font-medium">Addons Ingredients:</span> {item.customIngredients.map((ing, i) => (
                          <span key={i}>
                            {ing.name} x{ing.quantity} - {formatCurrency(ing.price)}
                            {i < item.customIngredients.length - 1 && ", "}
                          </span>
                        ))}
                      </div>}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-lg font-bold">{formatCurrency(calculateItemPrice(item))}</div>
                    <Button variant="destructive" size="icon" onClick={() => removeFromCart(index)}>
                      <Trash2/>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="mt-8 p-6 rounded-lg shadow-sm">
          <div className="flex flex-col justify-between gap-2">
            <div className="font-medium text-lg">Order Notes</div>
            <Textarea className="w-full h-32 mb-4" placeholder='Add notes for your order'/>
          </div>
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-8 bg-background p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div className="font-medium text-lg">Total</div>
            <div className="text-2xl font-bold">{formatCurrency(calculateTotal())}</div>
          </div>
          <Button size="lg" className="w-full mt-4">
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
}
