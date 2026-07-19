import { ProductCard, PRODUCTS } from "@/components/dashboard/product-card";
import { SpeakingDashboardWidget } from "@/components/speaking/speaking-dashboard-widget";
import { getAuthUserId } from "@/lib/api/auth";
import { getProgress } from "@/lib/modules/speaking";

export default async function DashboardPage() {
  const userId = await getAuthUserId();
  let speakingProgress = null;
  if (userId) {
    try {
      speakingProgress = await getProgress(userId);
    } catch {
      speakingProgress = null;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-lexora-blue sm:text-3xl">Trang chủ</h1>
        <p className="mt-1 text-gray-600">Chọn sản phẩm để bắt đầu học</p>
      </div>

      {speakingProgress && (
        <SpeakingDashboardWidget
          sessionCount={speakingProgress.sessionCount}
          totalMinutes={speakingProgress.totalPracticeMinutes}
          averageConfidence={speakingProgress.averageConfidence}
        />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.href} {...product} />
        ))}
      </div>
    </div>
  );
}
