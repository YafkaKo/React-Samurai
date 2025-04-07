import { Box, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Contacts = (props) => {
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
            <Typography variant='p' >{key} : <Link color='pallete.primary'  to={contactUrl}>{contactUrl}</Link></Typography>
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
