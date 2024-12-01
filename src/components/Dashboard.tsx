import {Button, Flex} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import ScriptList from "./Scripts/ScriptList";

const Dashboard = () => {
    const navigate = useNavigate();
    const handleCreateScript = () => {
        navigate('/create-script');
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <Flex justify="space-between" align="center">
                <div></div>
                {/* Empty div to push the button to the right */}
                <Button onClick={handleCreateScript}>Create Script</Button>
            </Flex>
            <ScriptList/>
        </div>
    );
}

export default Dashboard;