import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Button, OutlinedInput, Checkbox, ListItemText } from "@mui/material";
import { useCallback, useState } from "react";
import styles from './TransactionInput.module.scss';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { TAG } from "../../../models/tag";
import { Type } from "@prisma/client";

interface TransactionInputProps {
  handleSumbit: (description: string, tags: string[], type: Type, date: Dayjs | null, amount: number) => void;
}

const tags = [
  TAG.FOOD,
  TAG.INSURANCE
];
const types = [
  Type.Gain,
  Type.Loss
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function isFormInValid(description: string, tags: string[], date: Dayjs | null) {
  return (description == '' || tags.length === 0 || date === null);
}

export default function TransactionInput({ handleSumbit }: TransactionInputProps) {
  const [ description, setDescription ] = useState('');
  const [ selectedTags, setSelectedTags ] = useState([] as string[]);
  const [ type, setType ] = useState('' as Type);
  const [ amount, setAmount ] = useState(0);
  const [ date, setDate ] = useState<Dayjs | null>(null);

  const handleTagsChange = useCallback((e: SelectChangeEvent<typeof selectedTags>) => {
    const {
      target: { value },
    } = e;
    setSelectedTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  }, []);

  const handleTypeChange = useCallback((e: SelectChangeEvent) => {
    setType(e.target.value as Type);
  }, []);

  const handleDateChange = useCallback((newValue: Dayjs | null) => {
    setDate(newValue);
  }, []);

  const onSubmit = useCallback(() => {
    if (isFormInValid(description, selectedTags, date)) {
      // TODO: handle form invalid situation
    } else {
      handleSumbit(description, selectedTags, type, date, amount);

      // reset form inputs
      setDescription('');
      setSelectedTags([]);
      setType('' as Type);
      setDate(null);
      setAmount(0);
    }
  }, [description, selectedTags, type, date, amount, handleSumbit]);

  return (
    <div className={styles.container}>
        <TextField
          label="Description"
          sx={{ width: 400 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="tag-multiple-checkbox">Tag</InputLabel>
          <Select
            labelId="tag-multiple-checkbox-label"
            id="tag-multiple-checkbox"
            multiple
            value={selectedTags}
            onChange={handleTagsChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {tags.map((tag: TAG) => (
              <MenuItem key={tag} value={tag}>
                <Checkbox checked={selectedTags.indexOf(tag) > -1} />
                <ListItemText primary={tag} />
              </MenuItem>
            ))}
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
        <DesktopDatePicker
          label="Date"
          inputFormat="MM/DD/YYYY"
          value={date}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <TextField
          label="Amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
        />

        <Button variant="contained" onClick={onSubmit}>ADD NEW ROW</Button>
      </div>
  );
}