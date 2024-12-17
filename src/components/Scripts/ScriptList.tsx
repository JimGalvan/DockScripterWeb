import React from 'react';
import {useScriptsQuery} from '../../queries/scriptQueries';
import ScriptItem from './ScriptItem';

const ScriptList = () => {
    const {data: scripts, error} = useScriptsQuery();
    return (
        <div>
            <h3>Script List</h3>
            {error && <div>Error loading scripts.</div>}
            <ul style={{listStyleType: 'none', padding: 0}}>
                {scripts?.map((script) => (
                    <li key={script.id} style={{marginBottom: '10px'}}>
                        <ScriptItem script={script}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ScriptList;