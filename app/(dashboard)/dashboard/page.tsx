import { ProductCard, PRODUCTS } from "@/components/dashboard/product-card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-lexora-blue sm:text-3xl">Trang chủ</h1>
        <p className="mt-1 text-gray-600">Chọn sản phẩm để bắt đầu học</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.href} {...product} />
        ))}
      </div>
    </div>
  );
}
