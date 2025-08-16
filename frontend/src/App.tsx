import { useEffect, useState } from "react";
import "@radix-ui/themes/styles.css";
import "./App.css";
import { Box, Text, Card, Flex } from "@radix-ui/themes";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotalSpent() {
      const res = await fetch("/api/expenses/total-expenses");
      const data = await res.json();
      setTotalSpent(data.totalSpent);
    }

    fetchTotalSpent();
  }, []);

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
          <Text>{totalSpent}</Text>
        </Flex>
      </Card>
    </Box>
  );
}

export default App;
