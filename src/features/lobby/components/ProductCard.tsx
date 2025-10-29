import { Star } from "lucide-react";
import Image from "next/image";

export type Product = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
};

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex w-full items-center gap-x-5">
      <div className="flex h-[150px] w-[150px] items-center justify-center">
        <Image
          src={product.image}
          alt={`image ${product.title}`}
          width={150}
          height={150}
          className="h-full w-full object-contain"
        />
      </div>
      <div>
        <p className="text-primary">{product.title}</p>
        <p className="text-primary">{product.price}</p>
        <p className="text-primary flex items-center gap-x-2">
          <Star />
          {product.rating.rate}
        </p>
      </div>
    </div>
  );
};
