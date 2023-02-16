import { Box, Button } from "@mui/material";
import { ExportToCsv } from "export-to-csv";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/store";

const EXPORT_TO_CSV_OPTIONS = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true, 
  showTitle: true,
  title: 'Transactions CSV',
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
  filename: 'transactions'
};

export default function TransactionActions() {
  const transactions = useSelector((state: AppState) => state.transaction.transactions);

  const handleExportToCsv = useCallback(() => {
    const csvExporter = new ExportToCsv(EXPORT_TO_CSV_OPTIONS);

    // processing transactions data for later exporting purpose
    const processedData = transactions.map(transaction => {
      const tags = transaction.tags.join(',');
      return {
        description: transaction.description,
        tags,
        type: transaction.type,
        date: transaction.date,
        amount: transaction.amount,
      }
    });

    csvExporter.generateCsv(processedData);
  }, [transactions]);

  return (
    <Box sx={{ display: "flex", justifyContent: "end" }}>
      <Button variant="contained" onClick={handleExportToCsv}>
        Export To CSV
      </Button>
    </Box>
  );
}