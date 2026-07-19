import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/lib/constants/products";

const ACCENT_CLASSES = {
  teal: "border-l-lexora-teal",
  orange: "border-l-lexora-orange",
  blue: "border-l-lexora-blue",
};

export function ProductCard({ title, description, href, badge, accent = "teal" }: Product) {
  return (
    <Link href={href} className="block transition-transform hover:scale-[1.02]">
      <Card className={`h-full border-l-4 ${ACCENT_CLASSES[accent]}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-lg">{title}</CardTitle>
            {badge && (
              <span className="rounded-full bg-lexora-teal/10 px-2 py-0.5 text-xs font-medium text-lexora-teal">
                {badge}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export { PRODUCTS } from "@/lib/constants/products";
