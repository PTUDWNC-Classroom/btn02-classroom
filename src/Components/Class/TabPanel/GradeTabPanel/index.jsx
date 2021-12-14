import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import TabPanel from "..";
import AssignmentStruct from "./AssignmentStruct";

function AssignmentTabPanel(props) {
    const { children, valueAssignment, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={valueAssignment !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {valueAssignment === index && (
                <Box sx={{ p: 2 }}>
                    <>{children}</>
                </Box>
            )}
        </div>
    );
}

AssignmentTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    valueAssignment: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

export default function GradeTabPanel({ value, index }) {
    const [valueAssignment, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <TabPanel value={value} index={index}>
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                            value={valueAssignment}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                        >
                            <Tab label="Grade Structure" {...a11yProps(0)} />
                            <Tab label="Manage Board" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <AssignmentTabPanel valueAssignment={valueAssignment} index={0}>
                       <Container maxWidth="md">
                            <AssignmentStruct />
                        </Container>
                    </AssignmentTabPanel>
                    <AssignmentTabPanel valueAssignment={valueAssignment} index={1}>
                        Hello
                    </AssignmentTabPanel>
                </Box>
            </TabPanel>
        </>
    );
}