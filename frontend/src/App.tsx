import "@radix-ui/themes/styles.css";
import "./App.css";
import { Box, Text, Card, Flex } from "@radix-ui/themes";
import { api } from "./lib/api";
import { useQuery } from "@tanstack/react-query";

async function fetchTotalSpent() {
  const res = await api.expenses["total-expenses"].$get();

  if (!res.ok) {
    throw new Error("Failed to fetch total spent");
  }

  const data = await res.json();
  return data;
}

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: fetchTotalSpent,
  });

  if (error) {
    return <Text color="red">Error: {error.message}</Text>;
  }

  return (
    <Box className="w-[350px] m-auto">
      <Card>
        <Flex gap="3" align="center">
          <Box>
            <Text as="div" size="4" weight="bold">
              Total Spent
            </Text>
            <Text as="div" size="2" color="gray">
              The total amount you've spent
            </Text>
          </Box>
          <Text>{isPending ? "..." : data.totalSpent}</Text>
        </Flex>
      </Card>
    </Box>
  );
}

export default App;
