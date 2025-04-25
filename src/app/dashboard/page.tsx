import ProductsChart from "../../components/dashboard/charts/ProductsChart";
import UsersTable from "../../components/dashboard/tables/UsersTable";
import ProductsTable from "../../components/dashboard/tables/ProductsTable";

export default async function DashboardPage() {
  interface User {
    id: string;
    name: string;
    purchases: number[];
  }

  interface ProductSales {
    name: string;
    sold: number;
  }

  const mockUsers: User[] = [
    {
      id: "1",
      name: "John Doe",
      purchases: [10, 5, 20, 15, 25, 30, 18, 22, 28, 35, 40, 38],
    },
    {
      id: "2",
      name: "Jane Smith",
      purchases: [5, 8, 12, 10, 15, 18, 20, 25, 30, 28, 32, 35],
    },
    {
      id: "3",
      name: "Bob Johnson",
      purchases: [20, 18, 25, 30, 35, 40, 42, 45, 50, 48, 52, 55],
    },
    {
      id: "4",
      name: "Alice Brown",
      purchases: [12, 15, 18, 20, 22, 25, 28, 30, 33, 35, 38, 40],
    },
    {
      id: "5",
      name: "Michael Davis",
      purchases: [8, 10, 14, 12, 16, 20, 22, 24, 26, 28, 30, 32],
    },
    {
      id: "6",
      name: "Jennifer Wilson",
      purchases: [30, 28, 35, 40, 45, 50, 52, 55, 60, 58, 62, 65],
    },
    {
      id: "7",
      name: "David Garcia",
      purchases: [18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40],
    },
    {
      id: "8",
      name: "Linda Rodriguez",
      purchases: [25, 22, 28, 30, 33, 35, 38, 40, 42, 44, 46, 48],
    },
    {
      id: "9",
      name: "Christopher Williams",
      purchases: [15, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38],
    },
    {
      id: "10",
      name: "Angela Garcia",
      purchases: [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32],
    },
  ];

  const mockProductSales: ProductSales[] = [
    { name: "Sofa", sold: 120 },
    { name: "Table", sold: 85 },
    { name: "Chair", sold: 200 },
    { name: "Bed", sold: 95 },
    { name: "Lamp", sold: 150 },
    { name: "Desk", sold: 70 },
    { name: "Cabinet", sold: 110 },
    { name: "Shelf", sold: 180 },
    { name: "Couch", sold: 130 },
    { name: "Stool", sold: 220 },
  ];

  const generateSalesData = (
    products: ProductSales[]
  ): { name: string; sold: number }[] => {
    return products.map((product) => ({
      name: product.name,
      sold: product.sold,
    }));
  };

  const users = mockUsers;
  const productSales = mockProductSales;
  const chartData = generateSalesData(productSales);

  type TProductSales = {
    id: string;
    name: string;
    sold: number;
  }[];

  type TUserConsumption = {
    id: string;
    name: string;
    purchases: number;
  }[];

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000/api";

  const res = await fetch(`${baseUrl}/analytics`);

  const data: {
    productsAnalytics: TProductSales;
    userConsumption: TUserConsumption;
  } = await res.json();

  return (
    <div className="p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 md:mb-6 lg:mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <ProductsChart chartData={data.productsAnalytics ?? []} />
        <div className="flex flex-col lg:flex-row gap-6">
          <UsersTable users={data.userConsumption ?? []} />
          <ProductsTable productSales={data.productsAnalytics ?? []} />
        </div>
      </div>
    </div>
  );
}
