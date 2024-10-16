import { useTheme } from "../../context/themeContext";
export default function AboutUs() {
  const { theme } = useTheme();
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About EcoShop</h1>
      <div
        className={`${
          theme === "dark" ? "bg-zinc" : "bg-white"
        } shadow rounded-lg p-6`}
      >
        <p className="mb-4">
          EcoShop is your one-stop destination for eco-friendly and sustainable
          products. We believe in making a positive impact on the environment by
          offering a curated selection of high-quality, environmentally
          conscious items.
        </p>
        <p className="mb-4">
          Our mission is to make sustainable living accessible and enjoyable for
          everyone. We carefully select each product in our inventory to ensure
          it meets our strict standards for environmental responsibility and
          quality.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Our Values</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Sustainability: We prioritize products that are made from renewable
            or recycled materials.
          </li>
          <li>
            Quality: We believe that sustainable products should also be durable
            and long-lasting.
          </li>
          <li>
            Transparency: We provide clear information about the environmental
            impact of our products.
          </li>
          <li>
            Community: We support and collaborate with eco-conscious brands and
            artisans.
          </li>
        </ul>
        <p>
          Join us in our journey towards a more sustainable future. Every
          purchase you make at EcoShop is a step towards reducing your
          environmental footprint and supporting responsible consumption.
        </p>
      </div>
    </div>
  );
}
