import {useScriptsQuery} from "../../queries/scriptQueries";

const ScriptList = () => {
    const {data: scripts, error} = useScriptsQuery();

    return (
        <div>
            <h3>Script List</h3>
            {error && <div>Error loading scripts.</div>}
            <ul>
                {scripts?.map((script) => (
                    <li key={script.id}>{script.name}</li>
                ))}
            </ul>
        </div>
    );
}
export default ScriptList;