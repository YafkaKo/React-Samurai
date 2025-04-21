import { Box, List, ListItem, Typography } from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ContactType } from "../../../types/types";

interface PropsType {
  contacts: ContactType|undefined
}

const Contacts: FC<PropsType> = (props) => {
  const { contacts } = props;
  return (
    <Box>
      <Typography variant="h4"> Contacts</Typography>
      <List>
        {contacts ?
      Object.keys(contacts).map((key) => {
        const contactUrl = contacts[key];
        if (!contactUrl) {
          return ''; // Если контакт не существует, ничего не выводим
        }
        return (
          <ListItem key={key}>
            <Typography component='p' >{key} : <Link color='pallete.primary'  to={contactUrl}>{contactUrl}</Link></Typography>
          </ListItem>
        );
      })
      :
         <Typography>Contacts not found</Typography>
    }

      </List>
    </Box>
  );
};

export default Contacts;
