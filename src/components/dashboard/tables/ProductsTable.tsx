import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ProductsTableProps = {
  productSales: { name: string; sold: number }[];
};

export default function ProductsTable({ productSales }: ProductsTableProps) {
  return (
    <div>
      <Card className="flex-1 dark:bg-gray-800 dark:border-gray-700 w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 min-w-[500px]">
            Product Sales
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto max-h-[400px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-600 dark:text-gray-400">
                  Product
                </TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400">
                  Sold
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productSales.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-gray-900 dark:text-gray-50">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {product.sold}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
