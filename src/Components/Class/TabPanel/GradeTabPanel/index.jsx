import { Container } from "@mui/material";
import TabPanel from "..";
import AssignmentStruct from "./AssignmentStruct";

export default function GradeTabPanel({ value, index }) {

    return (
        <>
            <TabPanel value={value} index={index}>
                <Container maxWidth="md">
                    <AssignmentStruct/>
                </Container>
            </TabPanel>
        </>
    );
}