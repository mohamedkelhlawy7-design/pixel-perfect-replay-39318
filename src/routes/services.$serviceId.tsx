import { createFileRoute, notFound } from "@tanstack/react-router";
import { getProvider, getService } from "@/lib/marketplace/catalog";
import { formatPrice } from "@/lib/marketplace/currency";
import { Rating } from "@/components/marketplace/Rating";
import { DemoBanner } from "@/components/marketplace/DemoNotice";

export const Route = createFileRoute("/services/$serviceId")({
  loader: ({ params }) => {
    const service = getService(params.serviceId);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.service.title} | رِفاد` : "خدمة | رِفاد" },
      { name: "description", content: loaderData?.service.summary ?? "تفاصيل الخدمة على رِفاد." },
      { property: "og:title", content: loaderData?.service.title ?? "خدمة | رِفاد" },
      {
        property: "og:description",
        content: loaderData?.service.summary ?? "تفاصيل الخدمة على رِفاد.",
      },
    ],
  }),
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const provider = getProvider(service.providerId);
  return (
    <main className="container-page max-w-3xl py-10">
      <DemoBanner />
      <h1 className="mt-6 font-display text-3xl font-bold leading-snug">{service.title}</h1>
      <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
        <Rating value={service.rating} count={service.reviewsCount} />
        {provider && <span>{provider.name}</span>}
        <span>التسليم خلال {service.deliveryDays} أيام</span>
      </div>
      <p className="mt-6 leading-loose">{service.description}</p>
      <p className="mt-6 font-display text-2xl font-bold">
        يبدأ من {formatPrice(service.price, service.currency)}
      </p>
    </main>
  );
}
