import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type UsersTableProps = {
  users: { name: string; id: string; purchases: number[] }[];
};

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <div>
      <Card className="flex-1 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            User Purchases
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto max-h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-600 dark:text-gray-400">
                  Name
                </TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400">
                  Total Purchases
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  className={cn(
                    "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50",
                    // selectedUser?.id === user.id &&
                    "bg-gray-200 dark:bg-gray-700"
                  )}
                  // onClick={() => {}}
                >
                  <TableCell className="font-medium text-gray-900 dark:text-gray-50">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {user.purchases.reduce((a, b) => a + b, 0)}
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
