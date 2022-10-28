import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Button } from "@mui/material";
import { useCallback, useState } from "react";
import { CATEGORY } from "../../models/category";
import { BALANCE_ENTRY_TYPE } from "../../models/type";
import styles from './TableInput.module.scss';

interface TableInputProps {
  handleSumbit: (description: string, category: CATEGORY, type: BALANCE_ENTRY_TYPE, amount: number) => void;
}

const categories = [
  CATEGORY.ELECTRICITY,
  CATEGORY.FOOD,
  CATEGORY.INSURANCE
];

const types = [
  BALANCE_ENTRY_TYPE.INCOME,
  BALANCE_ENTRY_TYPE.COST
];

export default function TableInput({ handleSumbit }: TableInputProps) {
  const [ description, setDescription ] = useState('');
  const [ category, setCategory ] = useState(CATEGORY.ELECTRICITY);
  const [ type, setType ] = useState(BALANCE_ENTRY_TYPE.INCOME);
  const [ amount, setAmount ] = useState(0);

  const handleCategoryChange = useCallback((e: SelectChangeEvent) => {
    setCategory(e.target.value as CATEGORY);
  }, []);

  const handleTypeChange = useCallback((e: SelectChangeEvent) => {
    setType(e.target.value as BALANCE_ENTRY_TYPE);
  }, []);

  return (
    <div className={styles.container}>
        <TextField
          label="Description"
          sx={{ width: 500 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={category}
            label="Category"
            onChange={handleCategoryChange}
          >
            {
              categories && categories.map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Type</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            value={type}
            label="Type"
            onChange={handleTypeChange}
          >
            {
              types && types.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <TextField
          label="Amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
        />

        <Button variant="contained" onClick={() => handleSumbit(description, category, type, amount)}>ADD NEW ROW</Button>
      </div>
  );
}