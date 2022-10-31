import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Button, OutlinedInput, Checkbox, ListItemText } from "@mui/material";
import { useCallback, useState } from "react";
import { BALANCE_ENTRY_TYPE } from "../../../models/type";
import styles from './TransactionInput.module.scss';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { TAG } from "../../../models/tag";

interface TransactionInputProps {
  handleSumbit: (description: string, tags: string[], type: BALANCE_ENTRY_TYPE, time: Dayjs | null, amount: number) => void;
}

const tags = [
  TAG.FOOD,
  TAG.INSURANCE
];

const types = [
  BALANCE_ENTRY_TYPE.GAIN,
  BALANCE_ENTRY_TYPE.LOSS
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

function isFormInValid(description: string, tags: string[], time: Dayjs | null) {
  return (description == '' || tags.length === 0 || time === null);
}

export default function TransactionInput({ handleSumbit }: TransactionInputProps) {
  const [ description, setDescription ] = useState('');
  const [ selectedTags, setSelectedTags ] = useState([] as string[]);
  const [ type, setType ] = useState(BALANCE_ENTRY_TYPE.GAIN);
  const [ amount, setAmount ] = useState(0);
  const [ time, setTime ] = useState<Dayjs | null>(null);

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
    setType(e.target.value as BALANCE_ENTRY_TYPE);
  }, []);

  const handleDateCahnge = useCallback((newValue: Dayjs | null) => {
    setTime(newValue);
  }, []);

  const onSubmit = useCallback(() => {
    if (isFormInValid(description, selectedTags, time)) {
      // TODO: handle form invalid situation
    } else {
      handleSumbit(description, selectedTags, type, time, amount);
    }
  }, [description, selectedTags, type, time, amount, handleSumbit]);

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
          value={time}
          onChange={handleDateCahnge}
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