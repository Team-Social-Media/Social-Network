import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Conversations from './Conversations';
import Contacts from './Contacts';
import { Button, Modal } from '@mui/material';
import NewConversationModal from './NewConversationModal';
import NewContactModal from './NewContactModal';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ChatSidebar(props) {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const conversationsOpen = value === 0;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ width: '300px' }} className="d-flex flex-column">
      <h3>Username: {props.username}</h3>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Conversations" {...a11yProps(0)} />
            <Tab label="Contacts" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Conversations />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Contacts />
        </TabPanel>
        <Button variant="contained" onClick={handleOpen}>
          New {conversationsOpen ? 'Conversation' : 'Contact'}
        </Button>
        <Modal open={open}>
          <div>
            {conversationsOpen ? <NewConversationModal closeModal={handleClose}/> : <NewContactModal closeModal={handleClose}/>}
          </div>
        </Modal>
      </Box>
    </div>
  );
}

export default ChatSidebar;
